const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');
const jwtauth = require('../middleware/jwtauth');

// Public routes - Không cần login
// Lấy danh sách tất cả bài đọc
router.get('/', readingController.getAllPassages);

// Lấy một bài đọc cụ thể kèm câu hỏi (không có đáp án)
router.get('/:id', readingController.getPassageById);

// Protected routes - Cần login
// Lấy lịch sử làm bài của học viên hiện tại
router.get('/results/history', jwtauth, readingController.getStudentResults);

// Lấy chi tiết một kết quả cụ thể
router.get('/results/:resultId', jwtauth, readingController.getResultDetail);

// Nộp bài và chấm điểm trực tiếp
router.post('/:id/submit', jwtauth, readingController.submitReading);

module.exports = router;
