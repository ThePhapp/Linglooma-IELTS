// Lưu trữ conversation history cho mỗi session (trong production nên dùng Redis/Database)
const conversationHistory = new Map();

// System prompt - Định nghĩa tính cách AI
const SYSTEM_PROMPT = `You are an expert IELTS teacher and English language coach. Your role is to:
- Help students improve their English speaking, writing, reading, and listening skills
- Provide clear, constructive feedback on grammar, vocabulary, and pronunciation
- Explain IELTS exam strategies and tips
- Be encouraging, patient, and supportive
- Use simple language when explaining complex concepts
- Give examples when appropriate
- Keep responses concise but informative (max 150 words unless asked for more)

Always be friendly, professional, and focus on helping students achieve their IELTS goals.`;

async function askGemini(userMessage, sessionId = 'default') {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return "API key is not configured. Please check server settings.";
    }

    if (!conversationHistory.has(sessionId)) {
      conversationHistory.set(sessionId, [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: "model",
          parts: [{ text: "Hello! I'm your IELTS AI assistant. I'm here to help you improve your English and prepare for the IELTS exam. How can I assist you today? 😊" }]
        }
      ]);
    }

    const history = conversationHistory.get(sessionId);

    history.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    console.log('🤖 Calling Gemini API...');
    console.log('📝 User message:', userMessage.substring(0, 50));
    console.log('💬 Conversation length:', history.length);

    const model = 'gemini-2.0-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    console.log('🔗 Model:', model);

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: history,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log('📡 Response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error('❌ Gemini API error response:', errorData);
      
      if (res.status === 400) {
        console.error('❌ Bad Request - Check API key or request format');
      } else if (res.status === 403) {
        console.error('❌ Forbidden - API key may be invalid or restricted');
      } else if (res.status === 429) {
        console.error('❌ Rate limit exceeded - Too many requests');
      } else if (res.status === 500) {
        console.error('❌ Gemini server error');
      }
      
      throw new Error(`Gemini API error: ${res.status} - ${errorData.error?.message || errorText}`);
    }

    const data = await res.json();
    console.log('📦 Response data:', JSON.stringify(data).substring(0, 200));
    
    // Kiểm tra xem có response không
    if (!data.candidates || data.candidates.length === 0) {
      console.error('❌ No candidates in response:', data);
      
      // Kiểm tra safety ratings
      if (data.promptFeedback?.blockReason) {
        console.error('❌ Content blocked by safety filter:', data.promptFeedback.blockReason);
        return "⚠️ Your message was blocked by safety filters. Please rephrase your question.";
      }
      
      return "⚠️ I couldn't generate a response. Please try rephrasing your question.";
    }

    const reply = data.candidates[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      console.error('❌ No text in response:', data.candidates[0]);
      return "⚠️ I couldn't generate a response. Please try again.";
    }

    // Lưu response vào history
    history.push({
      role: "model",
      parts: [{ text: reply }]
    });

    // Giới hạn history length (giữ 20 messages gần nhất)
    if (history.length > 20) {
      // Giữ system prompt và 18 messages gần nhất
      conversationHistory.set(sessionId, [
        history[0], // System prompt
        history[1], // Initial greeting
        ...history.slice(-18)
      ]);
    }

    console.log('✅ Gemini response received:', reply.substring(0, 100) + '...');
    return reply;

  } catch (err) {
    console.error("❌ Gemini API error:", err);
    console.error("❌ Error details:", err.message);
    console.error("❌ Stack trace:", err.stack);
    
    // Trả về error message chi tiết hơn
    if (err.message?.includes('403')) {
      return "⚠️ API key error. The Gemini API key may be invalid or restricted. Please contact support.";
    } else if (err.message?.includes('429')) {
      return "⚠️ Too many requests. Please wait a moment and try again.";
    } else if (err.message?.includes('API key')) {
      return "⚠️ API configuration error. Please contact support.";
    }
    
    return "⚠️ I'm having trouble connecting right now. Please try again in a moment. If the problem persists, contact support.";
  }
}

// Xóa conversation history
function clearConversation(sessionId = 'default') {
  conversationHistory.delete(sessionId);
  console.log('🗑️ Cleared conversation for session:', sessionId);
  return true;
}

// Lấy số lượng messages trong conversation
function getConversationLength(sessionId = 'default') {
  return conversationHistory.get(sessionId)?.length || 0;
}

module.exports = {
  askGemini,
  clearConversation,
  getConversationLength
};
