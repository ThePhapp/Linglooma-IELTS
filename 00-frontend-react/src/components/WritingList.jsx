import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios.customize';

const WritingList = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTaskType, setFilterTaskType] = useState('all'); // 'all', 'Task 1', 'Task 2'
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/writing');
      
      if (response.data.success) {
        setPrompts(response.data.data);
      } else {
        setError('Failed to load writing prompts');
      }
    } catch (err) {
      console.error('Error fetching writing prompts:', err);
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleStartWriting = (promptId) => {
    navigate(`/admin/features/writing/${promptId}`);
  };

  const handleViewHistory = () => {
    navigate('/admin/features/writing/history');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskTypeIcon = (taskType) => {
    return taskType === 'Task 1' ? '📊' : '📝';
  };

  const filteredPrompts = filterTaskType === 'all' 
    ? prompts 
    : prompts.filter(p => p.task_type === filterTaskType);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading writing prompts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">IELTS Writing Practice</h1>
        <p className="text-gray-600">Select a writing task to practice. Your essay will be evaluated by AI with detailed feedback.</p>
      </div>

      {/* Filter and History Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterTaskType('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filterTaskType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilterTaskType('Task 1')}
            className={`px-4 py-2 rounded-lg transition ${
              filterTaskType === 'Task 1'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📊 Task 1
          </button>
          <button
            onClick={() => setFilterTaskType('Task 2')}
            className={`px-4 py-2 rounded-lg transition ${
              filterTaskType === 'Task 2'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📝 Task 2
          </button>
        </div>

        <button
          onClick={handleViewHistory}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          📚 View My Submissions
        </button>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              {/* Task Type Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{getTaskTypeIcon(prompt.task_type)}</span>
                <span className="text-sm font-semibold text-blue-600">{prompt.task_type}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {prompt.title}
              </h3>

              {/* Prompt Preview */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {prompt.prompt_text}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(prompt.difficulty)}`}>
                  {prompt.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {prompt.topic}
                </span>
              </div>

              {/* Requirements */}
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>📝 Min {prompt.word_limit} words</span>
                <span>⏱️ {prompt.time_limit} minutes</span>
              </div>

              {/* Start Button */}
              <button
                onClick={() => handleStartWriting(prompt.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Start Writing
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No writing prompts available for this filter.
        </div>
      )}
    </div>
  );
};

export default WritingList;
