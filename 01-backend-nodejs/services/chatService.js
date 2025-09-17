export async function askGemini(userMessage) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    // Lấy text trả về từ Gemini
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Không nhận được phản hồi từ Gemini.";

    return reply;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "⚠️ Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
  }
}
