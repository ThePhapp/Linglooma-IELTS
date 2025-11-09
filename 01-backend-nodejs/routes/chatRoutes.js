const express = require("express");
const { chatController, clearChatController } = require("../controllers/chatController.js");

const router = express.Router();

// POST /api/chat - Send message
router.post("/chat", chatController);

// DELETE /api/chat - Clear conversation history
router.delete("/chat", clearChatController);

module.exports = router;
