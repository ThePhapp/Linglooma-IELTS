import React, { useState, useEffect } from 'react';
import axios from "@/utils/axios.customize";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const ViewResultsPage = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showChart, setShowChart] = useState(false);

  const filteredResults = results.filter(item =>
    (`Bài ${item.lessonId} - ${item.lessonName}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/incorrectphonemes/resultView'); // đổi thành endpoint thật
        console.log('API response data:', response.data);
        setResults(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      }
    };

    fetchResults();
  }, []);

  // Chuyển đổi dữ liệu cho biểu đồ
  const chartData = results.map(item => ({
    name: `Bài ${item.lessonId}`,
    score: item.averageScore || 0,
    date: item.latestFinishedTime,
  }));

  // Tính điểm trung bình theo averageScore
  const averageScore =
    Array.isArray(results) && results.length > 0
      ? (
        results.reduce((sum, item) => sum + (item.averageScore || 0), 0) /
        results.length
      ).toFixed(1)
      : '0';

  const averageScoreRounded = Math.round(parseFloat(averageScore));


  // Hàm format ngày tháng từ ISO string sang định dạng dễ đọc
  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-2">IELTS 4-Skill Training</h1>
      <p className="text-sm text-gray-600 mb-6">
        Practice your pronunciation by recording yourself reading the passage
      </p>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Result</h1>
        <div className="flex items-center space-x-2">
          <img
            src="/images/img_animenamngau001fotor20250511114918_1.png"
            alt=""
            height={40}
            width={40}
          />
          <span className="text-sm font-medium text-gray-700">Detina</span>
        </div>
      </div>

      {/* Serch lesson , topic  */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm bài kiểm tra..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded px-4 py-2 text-sm"
        />
      </div>

      {/* Show Chart */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowChart(!showChart)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {showChart ? 'Đóng biểu đồ' : 'Xem biểu đồ'}
        </button>
      </div>


      {/* Biểu đồ điểm */}
      {showChart && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Xu hướng điểm trung bình theo bài kiểm tra</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 9]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#4ade80" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="overflow-x-auto bg-pink-50 border border-gray-300 rounded-lg p-4">
        <table className="table-auto w-full text-left text-sm border border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="border px-3 py-2">STT</th>
              <th className="border px-3 py-2">Speaking Test</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2 flex justify-center">Overall Average Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((item, index) => (
              <tr key={item.lessonId}>
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">Bài {item.lessonId} - {item.lessonName}</td>
                <td className="border px-3 py-2">{formatDate(item.latestFinishedTime)}</td>
                <td className="border px-3 py-2 flex items-center justify-center space-x-1">
                  <Link to={`/admin/features/feedback/${item.lessonId}`} className="flex items-center space-x-1 cursor-pointer text-blue-600">
                    <span>{item.averageScore?.toFixed(2) ?? '-'}</span>
                    {item.averageScore >= 7 ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" title="Điểm cao" />
                    ) : item.averageScore >= 5 ? (
                      <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" title="Điểm trung bình" />
                    ) : (
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" title="Điểm thấp" />
                    )}
                  </Link>
                </td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="border px-3 py-2" colSpan="3">
                Total Average Score
              </td>
              <td className="border px-3 py-2 flex justify-center items-center space-x-2">
                <span>{averageScore}</span>
                {averageScore >= 7 ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" title="Điểm cao" />
                ) : averageScore >= 5 ? (
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" title="Điểm trung bình" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" title="Điểm thấp" />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewResultsPage;
