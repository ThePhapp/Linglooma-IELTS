const client = require('../db');

const lastestScore = 7;

async function insertLessonResult({ studentId, lessonId, finishedTime, averageScore, feedback }) {
  const query = `
    INSERT INTO lessonResult (studentId, lessonId, finishedTime, averageScore, feedback)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [studentId, lessonId, finishedTime, averageScore, feedback];

  const res = await client.query(query, values);
  return res.rows[0];
}


const getLessonResult = async (studentId, lessonId) => {
    await client.query(
        'SELECT * FROM lessonResult WHERE studentId=$1 AND lessonId=$2',
        [studentId, lessonId]
    );
}

const getRecentlyLessonResult = async (studentId) => {
    client.query(
        `
        SELECT * 
        FROM lessonresult
        WHERE studentId=$1
        ORDER BY finishedTime DESC
        LIMIT $2;
        `,
        [studentId, lastestScore]
    );
}

async function getSpeakingHistory(studentId) {
  try {
    console.log('🗄️ Database query for studentId:', studentId);
    const query = `
      SELECT 
        lr.id,
        lr.lessonid as lesson_id,
        lr.finishedtime as completed_at,
        lr.averagescore as ielts_band,
        lr.feedback,
        l.name as lesson_title,
        (SELECT COUNT(*) FROM question WHERE lessonid = lr.lessonid) as question_count
      FROM lessonresult lr
      LEFT JOIN lesson l ON lr.lessonid = l.id
      WHERE lr.studentid = $1
      ORDER BY lr.finishedtime DESC
    `;
    
    const res = await client.query(query, [studentId]);
    console.log('✅ Database returned', res.rows.length, 'rows');
    return res.rows;
  } catch (error) {
    console.error('❌ Database error in getSpeakingHistory:', error.message);
    throw error;
  }
}

module.exports = {
    insertLessonResult,
    getLessonResult,
    getRecentlyLessonResult,
    getSpeakingHistory
};
