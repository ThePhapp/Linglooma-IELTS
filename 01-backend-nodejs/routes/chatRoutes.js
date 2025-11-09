import express from "express";
import { chatController, clearChatController } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat - Send message
router.post("/chat", chatController);

// DELETE /api/chat - Clear conversation history
router.delete("/chat", clearChatController);

export default router;
