import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

// Sample data nếu API không có dữ liệu
const SAMPLE_PASSAGES = [
  {
    id: 'sample-1',
    title: 'The Impact of Climate Change on Marine Life',
    difficulty: 'Medium',
    topic: 'Environment',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    created_at: new Date().toISOString(),
    description: 'Explore how rising ocean temperatures affect marine ecosystems and biodiversity.',
    reading_time: '15 min',
    questions_count: 10
  },
  {
    id: 'sample-2',
    title: 'Artificial Intelligence in Modern Healthcare',
    difficulty: 'Hard',
    topic: 'Technology',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    created_at: new Date().toISOString(),
    description: 'Discover how AI is revolutionizing medical diagnosis and patient care.',
    reading_time: '20 min',
    questions_count: 13
  },
  {
    id: 'sample-3',
    title: 'The History of Ancient Egyptian Civilization',
    difficulty: 'Academic',
    topic: 'History',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400',
    created_at: new Date().toISOString(),
    description: 'Journey through the fascinating world of pharaohs, pyramids, and hieroglyphics.',
    reading_time: '25 min',
    questions_count: 15
  },
  {
    id: 'sample-4',
    title: 'Urban Gardening and Sustainable Living',
    difficulty: 'Easy',
    topic: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
    created_at: new Date().toISOString(),
    description: 'Learn practical tips for growing your own food in urban environments.',
    reading_time: '12 min',
    questions_count: 8
  },
  {
    id: 'sample-5',
    title: 'The Evolution of Social Media Platforms',
    difficulty: 'Medium',
    topic: 'Technology',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    created_at: new Date().toISOString(),
    description: 'Understand the transformation of digital communication over the past decades.',
    reading_time: '18 min',
    questions_count: 12
  },
  {
    id: 'sample-6',
    title: 'Renewable Energy: The Future of Power',
    difficulty: 'Hard',
    topic: 'Science',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
    created_at: new Date().toISOString(),
    description: 'Explore solar, wind, and hydro power solutions for sustainable energy.',
    reading_time: '22 min',
    questions_count: 14
  },
  {
    id: 'sample-7',
    title: 'Traditional Festivals Around the World',
    difficulty: 'Easy',
    topic: 'Culture',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    created_at: new Date().toISOString(),
    description: 'Celebrate diversity through colorful festivals from different cultures.',
    reading_time: '14 min',
    questions_count: 9
  },
  {
    id: 'sample-8',
    title: 'The Psychology of Decision Making',
    difficulty: 'Academic',
    topic: 'Psychology',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400',
    created_at: new Date().toISOString(),
    description: 'Examine the cognitive processes behind how humans make choices.',
    reading_time: '20 min',
    questions_count: 13
  },
  {
    id: 'sample-9',
    title: 'Space Exploration: Mars Missions',
    difficulty: 'Medium',
    topic: 'Science',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400',
    created_at: new Date().toISOString(),
    description: 'Follow humanity\'s quest to explore and potentially colonize the Red Planet.',
    reading_time: '17 min',
    questions_count: 11
  },
  {
    id: 'sample-10',
    title: 'Modern Architecture and Design Principles',
    difficulty: 'Medium',
    topic: 'Architecture',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400',
    created_at: new Date().toISOString(),
    description: 'Understand contemporary architectural trends and sustainable building practices.',
    reading_time: '16 min',
    questions_count: 10
  },
  {
    id: 'sample-11',
    title: 'The Importance of Sleep for Health',
    difficulty: 'Easy',
    topic: 'Health',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
    created_at: new Date().toISOString(),
    description: 'Discover how quality sleep impacts physical and mental well-being.',
    reading_time: '13 min',
    questions_count: 8
  },
  {
    id: 'sample-12',
    title: 'Global Economic Trends in the 21st Century',
    difficulty: 'Hard',
    topic: 'Economics',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    created_at: new Date().toISOString(),
    description: 'Analyze emerging markets, trade policies, and economic globalization.',
    reading_time: '23 min',
    questions_count: 15
  }
];

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
      // Nếu API trả về dữ liệu, dùng dữ liệu từ API
      if (response.data.data && response.data.data.length > 0) {
        setPassages(response.data.data);
      } else {
        // Nếu không có dữ liệu từ API, dùng sample data
        setPassages(SAMPLE_PASSAGES);
      }
    } catch (error) {
      console.error('Error fetching passages:', error);
      // Nếu API lỗi, vẫn hiển thị sample data
      setPassages(SAMPLE_PASSAGES);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'hard':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'academic':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  const getTopicIcon = (topic) => {
    const icons = {
      'Environment': '🌍',
      'Technology': '💻',
      'History': '📜',
      'Lifestyle': '🌱',
      'Science': '🔬',
      'Culture': '🎭',
      'Psychology': '🧠',
      'Architecture': '🏛️',
      'Health': '❤️',
      'Economics': '💰'
    };
    return icons[topic] || '📖';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Đang tải danh sách bài đọc...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                IELTS Reading Practice
              </h1>
              <p className="text-white/90 text-lg">
                Luyện tập kỹ năng đọc hiểu với {passages.length} bài đọc đa dạng chủ đề
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                <Award className="h-4 w-4" />
                <span>Total Passages</span>
              </div>
              <div className="text-2xl font-bold text-white">{passages.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                <TrendingUp className="h-4 w-4" />
                <span>Topics</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {new Set(passages.map(p => p.topic)).size}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                <Clock className="h-4 w-4" />
                <span>Avg. Time</span>
              </div>
              <div className="text-2xl font-bold text-white">15 min</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                <BookOpen className="h-4 w-4" />
                <span>Questions</span>
              </div>
              <div className="text-2xl font-bold text-white">10-15</div>
            </div>
          </div>
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
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300"
              onClick={() => navigate(`/admin/features/reading/${passage.id}`)}
            >
              {/* Gradient Top Bar */}
              <div className={`h-2 ${getDifficultyColor(passage.difficulty)}`}></div>

              {/* Image */}
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 relative">
                {passage.image ? (
                  <img
                    src={passage.image}
                    alt={passage.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Reading';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">{getTopicIcon(passage.topic)}</span>
                  </div>
                )}
                {/* Difficulty Badge on Image */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getDifficultyColor(passage.difficulty)}`}>
                    {passage.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 h-14 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {passage.title}
                </h3>

                {/* Description */}
                {passage.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {passage.description}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  {passage.reading_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{passage.reading_time}</span>
                    </div>
                  )}
                  {passage.questions_count && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{passage.questions_count} questions</span>
                    </div>
                  )}
                </div>

                {/* Topic Badge */}
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200">
                    {getTopicIcon(passage.topic)} {passage.topic}
                  </span>
                </div>

                {/* Button */}
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/features/reading/${passage.id}`);
                  }}
                >
                  Bắt đầu làm bài →
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default ReadingList;
