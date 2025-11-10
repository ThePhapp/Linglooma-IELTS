const client = require('../db');

// Lấy tất cả bài đọc
const getAllPassages = async () => {
    const result = await client.query(
        `SELECT id, title, difficulty, topic, image_url as image, created_at 
         FROM reading_passages 
         WHERE is_active = true
         ORDER BY created_at DESC`
    );
    return result;
};

// Lấy một bài đọc kèm theo câu hỏi (KHÔNG bao gồm đáp án đúng)
const getPassageById = async (passageId) => {
    // Lấy thông tin bài đọc
    const passageResult = await client.query(
        'SELECT id, title, passage_text, topic, difficulty, reading_time, image_url, author, source FROM reading_passages WHERE id = $1',
        [passageId]
    );
    
    if (passageResult.rows.length === 0) {
        return null;
    }

    // Lấy câu hỏi của bài đọc (không trả về correct_answer)
    const questionsResult = await client.query(
        `SELECT id, question_text, question_type, options, order_number, points 
         FROM reading_questions 
         WHERE passage_id = $1 
         ORDER BY order_number`,
        [passageId]
    );

    return {
        passage: passageResult.rows[0],
        questions: questionsResult.rows
    };
};

// Chấm bài và lưu kết quả
const submitReading = async (studentId, passageId, answers) => {
    // answers = [{questionId: 1, userAnswer: "C"}, ...]
    
    // Lấy tất cả câu hỏi và đáp án đúng
    const questionsResult = await client.query(
        `SELECT id, correct_answer, points
         FROM reading_questions
         WHERE passage_id = $1
         ORDER BY order_number`,
        [passageId]
    );

    const correctAnswers = new Map(
        questionsResult.rows.map(row => [row.id, { answer: row.correct_answer, points: row.points }])
    );

    let totalScore = 0;
    let maxScore = 0;
    const answerDetails = [];

    // Chấm từng câu
    for (const answer of answers) {
        const correct = correctAnswers.get(answer.questionId);
        if (!correct) continue;
        
        const isCorrect = correct.answer.toLowerCase().trim() === answer.userAnswer.toLowerCase().trim();
        maxScore += correct.points;
        
        if (isCorrect) {
            totalScore += correct.points;
        }

        // Lưu câu trả lời vào database
        await client.query(
            `INSERT INTO reading_answers (user_id, passage_id, question_id, user_answer, is_correct, time_spent)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [studentId, passageId, answer.questionId, answer.userAnswer, isCorrect, answer.timeSpent || 0]
        );

        answerDetails.push({
            questionId: answer.questionId,
            userAnswer: answer.userAnswer,
            correctAnswer: correct.answer,
            isCorrect: isCorrect,
            points: isCorrect ? correct.points : 0
        });
    }

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    return {
        score: totalScore,
        maxScore,
        totalQuestions: correctAnswers.size,
        percentage: Math.round(percentage * 100) / 100,
        details: answerDetails
    };
};

// Lấy lịch sử làm bài của học viên
const getStudentResults = async (studentId, passageId = null) => {
    let query = `
        SELECT 
            ra.passage_id,
            rp.title,
            rp.topic,
            rp.difficulty,
            COUNT(ra.id) as total_answered,
            SUM(CASE WHEN ra.is_correct THEN 1 ELSE 0 END) as correct_count,
            MAX(ra.submitted_at) as last_attempt
        FROM reading_answers ra
        INNER JOIN reading_passages rp ON ra.passage_id = rp.id
        WHERE ra.user_id = $1
    `;
    const params = [studentId];

    if (passageId) {
        query += ' AND ra.passage_id = $2';
        params.push(passageId);
    }

    query += ' GROUP BY ra.passage_id, rp.title, rp.topic, rp.difficulty ORDER BY last_attempt DESC';

    const result = await client.query(query, params);
    return result;
};

// Lấy chi tiết kết quả một lần làm bài
const getResultDetail = async (resultId, studentId) => {
    // resultId ở đây là passage_id
    const passageId = resultId;
    
    // Lấy tất cả câu trả lời của user cho passage này
    const answersResult = await client.query(
        `SELECT 
            ra.*,
            rq.question_text,
            rq.question_type,
            rq.correct_answer,
            rq.explanation,
            rq.points
         FROM reading_answers ra
         INNER JOIN reading_questions rq ON ra.question_id = rq.id
         WHERE ra.user_id = $1 AND ra.passage_id = $2
         ORDER BY ra.submitted_at DESC, rq.order_number`,
        [studentId, passageId]
    );

    if (answersResult.rows.length === 0) {
        return null;
    }

    // Tính tổng điểm
    let totalScore = 0;
    let maxScore = 0;
    answersResult.rows.forEach(row => {
        maxScore += row.points;
        if (row.is_correct) {
            totalScore += row.points;
        }
    });

    return {
        result: {
            passage_id: passageId,
            user_id: studentId,
            total_score: totalScore,
            max_score: maxScore,
            percentage: maxScore > 0 ? (totalScore / maxScore) * 100 : 0
        },
        details: answersResult.rows
    };
};

module.exports = {
    getAllPassages,
    getPassageById,
    submitReading,
    getStudentResults,
    getResultDetail
};
