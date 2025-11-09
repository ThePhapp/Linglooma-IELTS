import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReadingList = () => {
  const [passages, setPassages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPassages();
  }, []);

  const fetchPassages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/reading');
      setPassages(response.data.data);
    } catch (error) {
      console.error('Error fetching passages:', error);
      alert('Không thể tải danh sách bài đọc!');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      case 'academic':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Đang tải danh sách bài đọc...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">IELTS Reading Practice</h1>
        <p className="text-gray-600">
          Luyện tập kỹ năng đọc hiểu với các bài đọc đa dạng chủ đề
        </p>
      </div>

      {passages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Chưa có bài đọc nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passages.map((passage) => (
            <div
              key={passage.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/admin/features/reading/${passage.id}`)}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-200">
                {passage.image ? (
                  <img
                    src={passage.image}
                    alt={passage.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Reading';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">📖</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 h-14">
                  {passage.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                      passage.difficulty
                    )}`}
                  >
                    {passage.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {passage.topic}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  {new Date(passage.created_at).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/features/reading/${passage.id}`);
                  }}
                >
                  Bắt đầu làm bài
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingList;
