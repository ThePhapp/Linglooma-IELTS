const pool = require('../db');
const { evaluateWritingWithGemini } = require('../services/geminiWritingService');

/**
 * Lấy danh sách tất cả đề Writing
 */
async function getAllPrompts() {
  const query = `
    SELECT id, title, task_type, prompt_text, difficulty, topic, word_limit, time_limit
    FROM writing_prompt
    ORDER BY task_type, difficulty, id
  `;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Lấy chi tiết một đề Writing
 */
async function getPromptById(promptId) {
  const query = `
    SELECT id, title, task_type, prompt_text, difficulty, topic, word_limit, time_limit
    FROM writing_prompt
    WHERE id = $1
  `;
  const result = await pool.query(query, [promptId]);
  return result.rows[0];
}

/**
 * Nộp bài Writing và chấm điểm bằng AI
 */
async function submitWriting({ promptId, studentId, essayText }) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Lấy thông tin đề bài
    const promptQuery = `
      SELECT task_type, prompt_text, word_limit
      FROM writing_prompt
      WHERE id = $1
    `;
    const promptResult = await client.query(promptQuery, [promptId]);
    const prompt = promptResult.rows[0];
    
    if (!prompt) {
      throw new Error('Prompt not found');
    }
    
    // Đếm số từ trong bài viết
    const wordCount = essayText.trim().split(/\s+/).length;
    
    // Lưu bài viết vào database
    const submissionQuery = `
      INSERT INTO writing_submission (promptid, studentid, essay_text, word_count)
      VALUES ($1, $2, $3, $4)
      RETURNING id, submitted_at
    `;
    const submissionResult = await client.query(submissionQuery, [
      promptId,
      studentId,
      essayText,
      wordCount
    ]);
    const submission = submissionResult.rows[0];
    
    console.log('Calling AI to evaluate essay...');
    const evaluation = await evaluateWritingWithGemini({
      taskType: prompt.task_type,
      promptText: prompt.prompt_text,
      essayText,
      wordCount
    });
    
    // Lưu kết quả chấm bài
    const resultQuery = `
      INSERT INTO writing_result (
        submissionid,
        task_achievement,
        coherence_cohesion,
        lexical_resource,
        grammar_accuracy,
        overall_band,
        overall_feedback,
        strengths,
        weaknesses,
        grammar_errors,
        vocabulary_suggestions,
        structure_feedback,
        improvement_tips
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `;
    const resultValues = [
      submission.id,
      evaluation.scores.task_achievement,
      evaluation.scores.coherence_cohesion,
      evaluation.scores.lexical_resource,
      evaluation.scores.grammar_accuracy,
      evaluation.scores.overall_band,
      evaluation.overall_feedback,
      evaluation.strengths,
      evaluation.weaknesses,
      JSON.stringify(evaluation.grammar_errors),
      JSON.stringify(evaluation.vocabulary_suggestions),
      evaluation.structure_feedback,
      evaluation.improvement_tips
    ];
    const resultData = await client.query(resultQuery, resultValues);
    
    await client.query('COMMIT');
    
    // Trả về kết quả đầy đủ
    return {
      submissionId: submission.id,
      submittedAt: submission.submitted_at,
      wordCount,
      resultId: resultData.rows[0].id,
      scores: evaluation.scores,
      feedback: {
        overall_feedback: evaluation.overall_feedback,
        strengths: evaluation.strengths,
        weaknesses: evaluation.weaknesses,
        grammar_errors: evaluation.grammar_errors,
        vocabulary_suggestions: evaluation.vocabulary_suggestions,
        structure_feedback: evaluation.structure_feedback,
        improvement_tips: evaluation.improvement_tips
      }
    };
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Lấy lịch sử làm bài của học sinh
 */
async function getStudentSubmissions(studentId) {
  const query = `
    SELECT 
      s.id as submission_id,
      s.submitted_at,
      s.word_count,
      p.title,
      p.task_type,
      p.difficulty,
      p.topic,
      r.overall_band
    FROM writing_submission s
    JOIN writing_prompt p ON s.promptid = p.id
    LEFT JOIN writing_result r ON r.submissionid = s.id
    WHERE s.studentid = $1
    ORDER BY s.submitted_at DESC
  `;
  const result = await pool.query(query, [studentId]);
  return result.rows;
}

/**
 * Lấy chi tiết kết quả một bài làm
 */
async function getSubmissionDetail(submissionId, studentId) {
  const query = `
    SELECT 
      s.id as submission_id,
      s.essay_text,
      s.word_count,
      s.submitted_at,
      p.title,
      p.task_type,
      p.prompt_text,
      p.difficulty,
      p.topic,
      p.word_limit,
      r.task_achievement,
      r.coherence_cohesion,
      r.lexical_resource,
      r.grammar_accuracy,
      r.overall_band,
      r.overall_feedback,
      r.strengths,
      r.weaknesses,
      r.grammar_errors,
      r.vocabulary_suggestions,
      r.structure_feedback,
      r.improvement_tips,
      r.evaluated_at
    FROM writing_submission s
    JOIN writing_prompt p ON s.promptid = p.id
    LEFT JOIN writing_result r ON r.submissionid = s.id
    WHERE s.id = $1 AND s.studentid = $2
  `;
  const result = await pool.query(query, [submissionId, studentId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const row = result.rows[0];
  
  // Parse JSON fields safely
  let grammarErrors = [];
  let vocabSuggestions = [];
  
  try {
    if (row.grammar_errors) {
      grammarErrors = typeof row.grammar_errors === 'string' 
        ? JSON.parse(row.grammar_errors) 
        : row.grammar_errors;
    }
  } catch (err) {
    console.error('Error parsing grammar_errors:', err);
    grammarErrors = [];
  }
  
  try {
    if (row.vocabulary_suggestions) {
      vocabSuggestions = typeof row.vocabulary_suggestions === 'string' 
        ? JSON.parse(row.vocabulary_suggestions) 
        : row.vocabulary_suggestions;
    }
  } catch (err) {
    console.error('Error parsing vocabulary_suggestions:', err);
    vocabSuggestions = [];
  }
  
  return {
    ...row,
    grammar_errors: grammarErrors,
    vocabulary_suggestions: vocabSuggestions
  };
}

module.exports = {
  getAllPrompts,
  getPromptById,
  submitWriting,
  getStudentSubmissions,
  getSubmissionDetail
};
