const client = require('../db');

// Lấy tất cả bài đọc
const getAllPassages = async () => {
    const result = await client.query(
        `SELECT id, title, difficulty, topic, image, created_at 
         FROM reading_passage 
         ORDER BY created_at DESC`
    );
    return result;
};

// Lấy một bài đọc kèm theo câu hỏi (KHÔNG bao gồm đáp án đúng)
const getPassageById = async (passageId) => {
    // Lấy thông tin bài đọc
    const passageResult = await client.query(
        'SELECT * FROM reading_passage WHERE id = $1',
        [passageId]
    );
    
    if (passageResult.rows.length === 0) {
        return null;
    }

    // Lấy câu hỏi của bài đọc
    const questionsResult = await client.query(
        `SELECT id, question_text, question_type, question_order 
         FROM reading_question 
         WHERE passageId = $1 
         ORDER BY question_order`,
        [passageId]
    );

    // Lấy các lựa chọn cho từng câu hỏi (KHÔNG trả về is_correct)
    const questions = await Promise.all(
        questionsResult.rows.map(async (question) => {
            const optionsResult = await client.query(
                `SELECT id, option_text, option_order 
                 FROM reading_option 
                 WHERE questionId = $1 
                 ORDER BY option_order`,
                [question.id]
            );
            
            return {
                ...question,
                options: optionsResult.rows
            };
        })
    );

    return {
        passage: passageResult.rows[0],
        questions
    };
};

// Chấm bài và lưu kết quả
const submitReading = async (studentId, passageId, answers) => {
    // answers = [{questionId: 1, selectedOptionId: 2}, ...]
    
    // Lấy tất cả câu hỏi và đáp án đúng
    const questionsResult = await client.query(
        `SELECT rq.id as question_id, ro.id as correct_option_id
         FROM reading_question rq
         INNER JOIN reading_option ro ON rq.id = ro.questionId
         WHERE rq.passageId = $1 AND ro.is_correct = TRUE
         ORDER BY rq.question_order`,
        [passageId]
    );

    const correctAnswers = new Map(
        questionsResult.rows.map(row => [row.question_id, row.correct_option_id])
    );

    let correctCount = 0;
    const answerDetails = [];

    // Chấm từng câu
    for (const answer of answers) {
        const correctOptionId = correctAnswers.get(answer.questionId);
        const isCorrect = correctOptionId === answer.selectedOptionId;
        
        if (isCorrect) {
            correctCount++;
        }

        answerDetails.push({
            questionId: answer.questionId,
            selectedOptionId: answer.selectedOptionId,
            correctOptionId: correctOptionId,
            isCorrect: isCorrect
        });
    }

    const totalQuestions = correctAnswers.size;
    const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    // Lưu kết quả tổng thể
    const resultInsert = await client.query(
        `INSERT INTO reading_result (studentId, passageId, score, total_questions, percentage)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [studentId, passageId, correctCount, totalQuestions, percentage]
    );

    const resultId = resultInsert.rows[0].id;

    // Lưu chi tiết từng câu trả lời
    for (const detail of answerDetails) {
        await client.query(
            `INSERT INTO reading_answer_detail (resultId, questionId, selectedOptionId, is_correct)
             VALUES ($1, $2, $3, $4)`,
            [resultId, detail.questionId, detail.selectedOptionId, detail.isCorrect]
        );
    }

    return {
        resultId,
        score: correctCount,
        totalQuestions,
        percentage: Math.round(percentage * 100) / 100,
        details: answerDetails
    };
};

// Lấy lịch sử làm bài của học viên
const getStudentResults = async (studentId, passageId = null) => {
    let query = `
        SELECT rr.*, rp.title, rp.topic, rp.difficulty
        FROM reading_result rr
        INNER JOIN reading_passage rp ON rr.passageId = rp.id
        WHERE rr.studentId = $1
    `;
    const params = [studentId];

    if (passageId) {
        query += ' AND rr.passageId = $2';
        params.push(passageId);
    }

    query += ' ORDER BY rr.completed_at DESC';

    const result = await client.query(query, params);
    return result;
};

// Lấy chi tiết kết quả một lần làm bài
const getResultDetail = async (resultId, studentId) => {
    // Kiểm tra quyền truy cập
    const resultCheck = await client.query(
        'SELECT * FROM reading_result WHERE id = $1 AND studentId = $2',
        [resultId, studentId]
    );

    if (resultCheck.rows.length === 0) {
        return null;
    }

    // Lấy chi tiết câu trả lời
    const detailsResult = await client.query(
        `SELECT 
            rad.*, 
            rq.question_text,
            rq.question_type,
            ro_selected.option_text as selected_option_text,
            ro_correct.option_text as correct_option_text
         FROM reading_answer_detail rad
         INNER JOIN reading_question rq ON rad.questionId = rq.id
         LEFT JOIN reading_option ro_selected ON rad.selectedOptionId = ro_selected.id
         INNER JOIN reading_option ro_correct ON rad.questionId = ro_correct.questionId AND ro_correct.is_correct = TRUE
         WHERE rad.resultId = $1
         ORDER BY rq.question_order`,
        [resultId]
    );

    return {
        result: resultCheck.rows[0],
        details: detailsResult.rows
    };
};

module.exports = {
    getAllPassages,
    getPassageById,
    submitReading,
    getStudentResults,
    getResultDetail
};
