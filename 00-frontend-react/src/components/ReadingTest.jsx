import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReadingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [passage, setPassage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReading();
  }, [id]);

  const fetchReading = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/reading/${id}`);
      const { passage, questions } = response.data.data;
      setPassage(passage);
      setQuestions(questions);
      setAnswers({});
      setResult(null);
    } catch (error) {
      console.error('Error fetching reading:', error);
      alert('Không thể tải bài đọc. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async () => {
    // Kiểm tra đã trả lời hết chưa
    if (Object.keys(answers).length !== questions.length) {
      alert('Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!');
      return;
    }

    // Kiểm tra token
    const token = localStorage.getItem('access_token'); // Fix: đổi từ 'token' thành 'access_token'
    if (!token) {
      alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để nộp bài.');
      navigate('/login');
      return;
    }

    // Confirm trước khi submit
    if (!window.confirm('Bạn có chắc muốn nộp bài? Bạn sẽ không thể sửa đổi sau khi nộp.')) {
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
          questionId: parseInt(questionId),
          selectedOptionId: parseInt(selectedOptionId)
        }))
      };

      const response = await axios.post(
        `/api/reading/${id}/submit`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setResult(response.data.data);
    } catch (error) {
      console.error('Error submitting reading:', error);
      
      // Xử lý lỗi cụ thể
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        localStorage.removeItem('access_token'); // Fix: đổi từ 'token' thành 'access_token'
        navigate('/login');
      } else if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Đang tải bài đọc...</div>
      </div>
    );
  }

  if (!passage) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Không tìm thấy bài đọc!</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/features/reading')}
        className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Quay lại danh sách
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{passage.title}</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="bg-blue-100 px-3 py-1 rounded">
            {passage.difficulty}
          </span>
          <span className="bg-green-100 px-3 py-1 rounded">
            {passage.topic}
          </span>
        </div>
      </div>

      {/* Passage */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Reading Passage</h2>
        <div className="prose max-w-none">
          {passage.passage.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-justify leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Questions</h2>
        
        {questions.map((question, qIdx) => (
          <div key={question.id} className="mb-8 last:mb-0">
            <h3 className="font-semibold mb-4">
              {qIdx + 1}. {question.question_text}
            </h3>
            
            <div className="space-y-3 ml-4">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id;
                const isCorrect = result?.details.find(d => d.questionId === question.id)?.correctOptionId === option.id;
                const isWrong = result && isSelected && !isCorrect;
                
                return (
                  <label
                    key={option.id}
                    className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      result
                        ? isCorrect
                          ? 'bg-green-50 border-green-500'
                          : isWrong
                          ? 'bg-red-50 border-red-500'
                          : 'border-gray-200'
                        : isSelected
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => handleOptionChange(question.id, option.id)}
                      disabled={!!result}
                      className="mt-1 mr-3"
                    />
                    <span className="flex-1">
                      {option.option_text}
                      {result && isCorrect && (
                        <span className="ml-2 text-green-600 font-semibold">✓ Đáp án đúng</span>
                      )}
                      {result && isWrong && (
                        <span className="ml-2 text-red-600 font-semibold">✗</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button or Result */}
      {!result ? (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(answers).length !== questions.length}
            className={`px-8 py-3 rounded-lg text-white font-semibold text-lg transition-all ${
              submitting || Object.keys(answers).length !== questions.length
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {submitting ? 'Đang nộp bài...' : 'Nộp bài'}
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Kết quả của bạn</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold">{result.score}</div>
              <div className="text-sm opacity-90">Câu đúng</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{result.totalQuestions}</div>
              <div className="text-sm opacity-90">Tổng số câu</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{result.percentage}%</div>
              <div className="text-sm opacity-90">Điểm</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={fetchReading}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Làm lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingTest;
