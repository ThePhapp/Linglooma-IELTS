const fetch = require("node-fetch"); // Nếu dùng Node <18, còn Node 18+ thì không cần
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getGeminiFeedback({ ieltsResult, assessment, transcriptText, miscueWords }) {
  const prompt = `
Bạn là một giáo viên bản ngữ, chuyên đánh giá và hướng dẫn cải thiện phát âm tiếng Anh cho người học. Dưới đây là kết quả chấm điểm phát âm của một học viên:

- Điểm ước lượng tương đương IELTS: ${ieltsResult.band} (${ieltsResult.totalScore})
- Độ chính xác (Accuracy): ${assessment.AccuracyScore}
- Độ trôi chảy (Fluency): ${assessment.FluencyScore}
- Độ đầy đủ nội dung (Completeness): ${assessment.CompletenessScore}
- Tổng điểm phát âm (PronScore): ${assessment.PronScore}
- Nội dung mà máy nghe được: "${transcriptText}"
- Những từ học viên phát âm chưa đúng: ${miscueWords.join(", ")}

Dựa trên các thông tin trên, bạn hãy đưa ra **nhận xét chi tiết bằng tiếng Việt**, bao gồm:
1. Nhận xét tổng quan về trình độ phát âm của học viên
2. Góp ý cụ thể các điểm học viên cần cải thiện (âm, từ, nhóm âm,...)
3. Gợi ý các bài tập luyện tập phù hợp
4. Lời khuyên về cách học phát âm hiệu quả hơn

Lưu ý: hãy viết như đang phản hồi trực tiếp cho người học, bằng lời văn thân thiện, động viên, dễ hiểu và có ví dụ cụ thể nếu cần. Không sử dụng từ chuyên môn quá phức tạp.

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
