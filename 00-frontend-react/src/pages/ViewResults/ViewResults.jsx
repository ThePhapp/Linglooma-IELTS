import React, { useState, useEffect } from 'react';
import axios from "@/utils/axios.customize";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';

const ViewResultsPage = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredResults = results.filter(item =>
    (`Lesson ${item.lessonId} - ${item.lessonName}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/incorrectphonemes/resultView');
        console.log('API response data:', response.data);
        setResults(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Convert data for chart
  const chartData = results.map(item => ({
    name: `Lesson ${item.lessonId}`,
    score: item.averageScore || 0,
    date: item.latestFinishedTime,
  }));

  // Calculate average score
  const averageScore =
    Array.isArray(results) && results.length > 0
      ? (
        results.reduce((sum, item) => sum + (item.averageScore || 0), 0) /
        results.length
      ).toFixed(1)
      : '0';

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getScoreColor = (score) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 7) return 'bg-green-100 text-green-800';
    if (score >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getProgressColor = (score) => {
    if (score >= 7) return 'from-green-500 to-emerald-600';
    if (score >= 5) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl">📊</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Performance Dashboard
            </h1>
            <p className="text-gray-600">Track your IELTS speaking progress and achievements</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{results.length}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className={`text-3xl font-bold mt-1 ${getScoreColor(parseFloat(averageScore))}`}>
                {averageScore}
              </p>
            </div>
            <div className={`w-14 h-14 bg-gradient-to-br ${getProgressColor(parseFloat(averageScore))} rounded-xl flex items-center justify-center`}>
              <span className="text-white text-2xl">⭐</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getProgressColor(parseFloat(averageScore))} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(parseFloat(averageScore) / 9) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {results.length > 0 ? Math.max(...results.map(r => r.averageScore || 0)).toFixed(1) : '0.0'}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Chart Toggle */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-purple-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
            </div>
          </div>
          <button
            onClick={() => setShowChart(!showChart)}
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 transform active:scale-95 ${
              showChart
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }`}
          >
            {showChart ? '📊 Hide Chart' : '📈 Show Chart'}
          </button>
        </div>
      </div>

      {/* Chart Section */}
      {showChart && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-6 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Score Trend Analysis
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                domain={[0, 9]} 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)"
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-purple-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Speaking Test</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Score</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                      <p>Loading results...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredResults.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-6xl">📭</span>
                      <p className="text-lg font-medium">No results found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {filteredResults.map((item, index) => (
                    <tr 
                      key={item.lessonId} 
                      className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <span className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">{item.lessonId}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{item.lessonName}</p>
                            <p className="text-sm text-gray-500">Lesson {item.lessonId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        📅 {formatDate(item.latestFinishedTime)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`text-2xl font-bold ${getScoreColor(item.averageScore)}`}>
                            {item.averageScore?.toFixed(1) ?? '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreBadge(item.averageScore)}`}>
                            {item.averageScore >= 7 ? '🌟 Excellent' : item.averageScore >= 5 ? '👍 Good' : '📚 Practice More'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Link 
                            to={`/admin/features/feedback/${item.lessonId}`}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform active:scale-95 flex items-center gap-2"
                          >
                            <span>View Details</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Summary Row */}
                  <tr className="bg-gradient-to-r from-purple-100 to-pink-100 font-bold">
                    <td colSpan="3" className="px-6 py-4 text-gray-800 text-lg">
                      Overall Average Score
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`text-3xl font-bold ${getScoreColor(parseFloat(averageScore))}`}>
                          {averageScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getScoreBadge(parseFloat(averageScore))}`}>
                          {parseFloat(averageScore) >= 7 ? '🎉 Outstanding' : parseFloat(averageScore) >= 5 ? '✨ Progressing' : '💪 Keep Going'}
                        </span>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="mt-6 text-center text-sm text-gray-500">
        💡 Tip: Practice regularly to improve your speaking scores!
      </div>
    </div>
  );
};

export default ViewResultsPage;
