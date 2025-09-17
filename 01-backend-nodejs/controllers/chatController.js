import { askGemini } from "../services/chatService.js";

export async function chatController(req, res) {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = await askGemini(message);
  res.json({ reply });
}
