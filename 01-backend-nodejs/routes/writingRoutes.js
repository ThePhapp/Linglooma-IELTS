const express = require('express');
const router = express.Router();
const writingController = require('../controllers/writingController');

/**
 * Routes for Writing feature
 * GET routes are public, POST routes require authentication (handled by jwtauth middleware)
 */

// GET /api/writing - Lấy danh sách tất cả đề Writing
router.get('/', writingController.getAllPrompts);

// GET /api/writing/submissions/history - Lịch sử làm bài (requires auth)
router.get('/submissions/history', writingController.getStudentSubmissions);

// GET /api/writing/submissions/:submissionId - Chi tiết kết quả (requires auth)
router.get('/submissions/:submissionId', writingController.getSubmissionDetail);

// GET /api/writing/:id - Lấy chi tiết một đề Writing
router.get('/:id', writingController.getPromptById);

// POST /api/writing/:id/submit - Nộp bài Writing (requires auth)
router.post('/:id/submit', writingController.submitWriting);

module.exports = router;
