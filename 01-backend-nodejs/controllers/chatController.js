const { askGemini, clearConversation, getConversationLength } = require("../services/chatService.js");

async function chatController(req, res) {
  const { message } = req.body;
  
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: "Message is required and must be a string" });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message too long (max 2000 characters)" });
  }

  try {
    // Sử dụng userId hoặc sessionId để lưu conversation riêng cho mỗi user
    const sessionId = req.user?.id || req.ip || 'anonymous';
    
    console.log('💬 Chat request from session:', sessionId);
    console.log('📝 Message:', message.substring(0, 100));

    const reply = await askGemini(message, sessionId);
    
    const conversationLength = getConversationLength(sessionId);

    res.json({ 
      reply,
      metadata: {
        conversationLength,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Chat controller error:', error);
    res.status(500).json({ 
      error: "Internal server error",
      message: "Unable to process your request at this time"
    });
  }
}

// Endpoint mới để xóa conversation
async function clearChatController(req, res) {
  try {
    const sessionId = req.user?.id || req.ip || 'anonymous';
    clearConversation(sessionId);
    
    res.json({ 
      success: true,
      message: "Conversation cleared successfully"
    });
  } catch (error) {
    console.error('❌ Clear chat error:', error);
    res.status(500).json({ error: "Failed to clear conversation" });
  }
}

module.exports = {
  chatController,
  clearChatController
};
