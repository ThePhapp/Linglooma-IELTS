import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionItem from "./QuestionItem";
import axios from "@/utils/axios.customize";
import QuestionScoreChart from "./QuestionScoreChart";

const PronunciationFeedback = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);

  // Tính điểm trung bình bài
  const calculateAverageScore = (questions) => {
    const validScores = questions
      .map(q => q?.averageScores?.ieltsBand)
      .filter(score => typeof score === 'number' && score > 0);
    if (validScores.length === 0) return 0;
    const total = validScores.reduce((sum, score) => sum + score, 0);
    return total / validScores.length;
  };

  useEffect(() => {
    if (!lessonId) return;

    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/incorrectphonemes/feedback-summary?lessonResultId=` + lessonId);
        setQuestions(Array.isArray(res) ? res : []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err?.error || err.message || "Unknown error");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="text-center p-5 text-lg text-gray-600">Đang tải dữ liệu...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-lg text-red-600">Lỗi tải dữ liệu: {error}</div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-5 text-lg text-gray-600">Chưa có dữ liệu phản hồi cho bài học này.</div>
    );
  }

  // Tính điểm trung bình
  const averageScore = calculateAverageScore(questions);

  return (
    <section className="mx-auto w-full max-w-none min-w-[779px] max-md:p-2.5 max-md:max-w-[991px] max-md:min-w-[auto] max-sm:max-w-screen-sm">
      <header className="flex justify-between items-center px-1.5 py-3 text-lg font-bold border-b border-solid border-b-black max-sm:flex-wrap max-sm:gap-2.5 mr-24">
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">Question</div>
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">False Words</div>
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center mr-48">Score</div>
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">Feedback</div>
        <button
          className="px-5 py-2.5 font-bold bg-sky-400 rounded-[41px] max-sm:w-full max-sm:text-center"
          onClick={() => navigate(`/admin/features/practice/${lessonId}`)}
        >
          Back
        </button>
      </header>
      <div className="p-5">
        {questions.map(({ questionId, topIncorrectPhonemes, averageScores, feedback }) => (
          <QuestionItem
            key={questionId}
            number={questionId}
            falseWords={topIncorrectPhonemes.map(({ phoneme }) => phoneme).join("; ")}
            level={getLevelFromScore(averageScores.ieltsBand)}
            score={averageScores.ieltsBand ? roundToHalf(averageScores.ieltsBand).toFixed(1) : "0.0"}
            feedback={feedback || "Chưa có phản hồi"}
          />
        ))}

        {/* Tổng kết điểm trung bình */}
        <div className="mt-10 border-t pt-6 border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Tổng kết</h2>
          <div className="flex items-center gap-5 max-md:flex-col">

            {/* Icon feedback cảm xúc */}
            <div className="text-4xl">
              {averageScore >= 7.5 ? "🎉" : averageScore >= 5 ? "😊" : "😟"}
            </div>

            {/* Thanh điểm trung bình */}
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-5 w-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${(averageScore / 9) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Điểm trung bình: <strong>{roundToHalf(averageScore).toFixed(1)}</strong> -{" "}
                <span title="Xếp loại được tính dựa trên thang điểm IELTS">{getLevelFromScore(averageScore)}</span>
              </div>
            </div>

            {/* Gợi ý cải thiện */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded w-full max-w-md shadow">
              <p className="text-sm text-yellow-800 font-medium mb-2">🎯 Gợi ý cải thiện:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {averageScore < 5 && (
                  <>
                    <li>Luyện phát âm các âm cơ bản như /θ/, /ð/, /ʃ/.</li>
                    <li>Nghe và bắt chước câu nói từ người bản ngữ (shadowing).</li>
                  </>
                )}
                {averageScore >= 5 && averageScore < 7 && (
                  <>
                    <li>Chú ý nhấn trọng âm và ngữ điệu câu.</li>
                    <li>Thu âm lại và so sánh với bản mẫu.</li>
                  </>
                )}
                {averageScore >= 7 && (
                  <>
                    <li>Tiếp tục luyện với tốc độ nói tự nhiên hơn.</li>
                    <li>Thử luyện tập với các bài phỏng vấn IELTS thực tế.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="mt-6">
          <button
            className="mb-4 px-4 py-2 bg-sky-500 text-white rounded font-semibold hover:bg-sky-600 transition"
            onClick={() => setShowChart(prev => !prev)}
          >
            {showChart ? "Ẩn biểu đồ" : "Xem biểu đồ"}
          </button>

          {showChart && <QuestionScoreChart questions={questions} />}
        </div>
      </div>
    </section>
  );
};

function getLevelFromScore(score) {
  if (!score || score <= 0) return "Pending";
  if (score >= 8) return "Proficient";
  if (score >= 6.5) return "Upper Intermediate";
  if (score >= 5) return "Intermediate";
  if (score >= 3) return "Elementary";
  return "Beginner";
}

function roundToHalf(num) {
  return Math.round(num * 2) / 2;
}
export default PronunciationFeedback;
