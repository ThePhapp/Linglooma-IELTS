const express = require('express');
const router = express.Router();
const lessonResultController = require('../controllers/lessonResultController');

// POST: Thêm kết quả học bài
router.post('/', lessonResultController.insertLessonResultController);

// POST: Lấy kết quả học sinh cho 1 bài học
router.get('/', lessonResultController.getLessonResultController);

// GET: Lấy 7 kết quả gần nhất của học sinh
router.get('/recent/:studentId', lessonResultController.getRecentlyLessonResultController);

module.exports = router;
