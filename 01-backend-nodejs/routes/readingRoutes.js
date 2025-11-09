const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');

// Lấy danh sách tất cả bài đọc
router.get('/', readingController.getAllPassages);

// Lấy lịch sử làm bài của học viên hiện tại (phải đặt trước /:id)
router.get('/results/history', readingController.getStudentResults);

// Lấy chi tiết một kết quả cụ thể
router.get('/results/:resultId', readingController.getResultDetail);

// Lấy một bài đọc cụ thể kèm câu hỏi (không có đáp án)
router.get('/:id', readingController.getPassageById);

// Nộp bài và chấm điểm trực tiếp
router.post('/:id/submit', readingController.submitReading);

module.exports = router;
