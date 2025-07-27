const fetch = require("node-fetch"); // Nếu dùng Node <18, còn Node 18+ thì không cần
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getGeminiFeedback({ ieltsResult, assessment, transcriptText, miscueWords }) {
  const prompt = `
Dưới đây là kết quả đánh giá phát âm tiếng Anh của một người học:
- Điểm tổng IELTS (ước tính): ${ieltsResult.band} (${ieltsResult.totalScore})
- Độ chính xác (Accuracy): ${assessment.AccuracyScore}
- Độ trôi chảy (Fluency): ${assessment.FluencyScore}
- Độ đầy đủ (Completeness): ${assessment.CompletenessScore}
- Điểm phát âm tổng quan (PronScore): ${assessment.PronScore}
- Transcript máy nghe được: "${transcriptText}"
- Các từ phát âm sai so với câu mẫu: ${miscueWords.join(", ")}

Hãy đóng vai một giáo viên bản ngữ và đưa ra nhận xét, góp ý chi tiết để cải thiện phát âm. Gợi ý các âm hoặc từ người học cần luyện thêm. Viết bằng tiếng Việt.
  `;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    return null;
  }
}

module.exports = {
  getGeminiFeedback,
};
