import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WritingEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [prompt, setPrompt] = useState(null);
  const [essayText, setEssayText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    fetchPrompt();
  }, [id]);

  useEffect(() => {
    if (timerStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, timerStarted]);

  const fetchPrompt = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/writing/${id}`);
      
      if (response.data.success) {
        setPrompt(response.data.data);
        setTimeRemaining(response.data.data.time_limit * 60); // Convert to seconds
      } else {
        setError('Failed to load writing prompt');
      }
    } catch (err) {
      console.error('Error fetching prompt:', err);
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    setEssayText(e.target.value);
  };

  const getWordCount = () => {
    return essayText.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    const wordCount = getWordCount();
    
    if (wordCount < prompt.word_limit) {
      if (!window.confirm(`Your essay has only ${wordCount} words (minimum: ${prompt.word_limit}). Submit anyway?`)) {
        return;
      }
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login to submit your essay');
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(
        `/api/writing/${id}/submit`,
        { essayText },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setResult(response.data.data);
        setTimerStarted(false);
      } else {
        alert('Failed to submit essay');
      }
    } catch (err) {
      console.error('Error submitting essay:', err);
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Failed to submit essay: ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setEssayText('');
    setResult(null);
    setTimeRemaining(prompt.time_limit * 60);
    setTimerStarted(false);
  };

  const getBandColor = (band) => {
    if (band >= 7) return 'text-green-600';
    if (band >= 6) return 'text-yellow-600';
    if (band >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading prompt...</div>
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

  if (!prompt) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Prompt not found</div>
      </div>
    );
  }

  // Show result page after submission
  if (result) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Essay Evaluation Results</h1>
          <p className="text-gray-600 mb-6">{prompt.title}</p>

          {/* Overall Band Score */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-lg mb-2">Overall Band Score</p>
              <p className="text-6xl font-bold">{result.scores.overall_band}</p>
              <p className="mt-2 text-blue-100">Words: {result.wordCount}</p>
            </div>
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Task Achievement</p>
              <p className={`text-3xl font-bold ${getBandColor(result.scores.task_achievement)}`}>
                {result.scores.task_achievement}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Coherence & Cohesion</p>
              <p className={`text-3xl font-bold ${getBandColor(result.scores.coherence_cohesion)}`}>
                {result.scores.coherence_cohesion}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Lexical Resource</p>
              <p className={`text-3xl font-bold ${getBandColor(result.scores.lexical_resource)}`}>
                {result.scores.lexical_resource}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Grammar Accuracy</p>
              <p className={`text-3xl font-bold ${getBandColor(result.scores.grammar_accuracy)}`}>
                {result.scores.grammar_accuracy}
              </p>
            </div>
          </div>

          {/* Overall Feedback */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Overall Feedback</h3>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{result.feedback.overall_feedback}</p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">✅ Strengths</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{result.feedback.strengths}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-red-700">⚠️ Areas to Improve</h3>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{result.feedback.weaknesses}</p>
              </div>
            </div>
          </div>

          {/* Grammar Errors */}
          {result.feedback.grammar_errors && result.feedback.grammar_errors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">📝 Grammar Errors & Corrections</h3>
              <div className="space-y-3">
                {result.feedback.grammar_errors.map((error, index) => (
                  <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-red-600 font-medium mb-1">❌ {error.error}</p>
                    <p className="text-green-600 font-medium mb-2">✅ {error.correction}</p>
                    <p className="text-gray-600 text-sm">{error.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Suggestions */}
          {result.feedback.vocabulary_suggestions && result.feedback.vocabulary_suggestions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">💡 Vocabulary Enhancements</h3>
              <div className="space-y-3">
                {result.feedback.vocabulary_suggestions.map((vocab, index) => (
                  <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                    <p className="font-medium mb-1">
                      <span className="text-gray-600">Instead of:</span> <span className="text-red-600">{vocab.word}</span>
                      <span className="mx-2">→</span>
                      <span className="text-gray-600">Use:</span> <span className="text-green-600">{vocab.suggestion}</span>
                    </p>
                    <p className="text-gray-600 text-sm italic">Example: {vocab.context}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structure Feedback */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">🏗️ Structure & Organization</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-line">
              {result.feedback.structure_feedback}
            </p>
          </div>

          {/* Improvement Tips */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">💪 Tips for Improvement</h3>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg whitespace-pre-line">
              {result.feedback.improvement_tips}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              🔄 Write Again
            </button>
            <button
              onClick={() => navigate('/admin/features/writing')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Back to Prompts
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Editor page
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-bold mb-1">{prompt.title}</h1>
              <p className="text-blue-100">{prompt.task_type} - {prompt.difficulty}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${timeRemaining < 300 ? 'text-red-300' : ''}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-blue-100">Time Remaining</div>
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-800 mb-2">📋 Task:</h3>
          <p className="text-gray-700 whitespace-pre-line">{prompt.prompt_text}</p>
          <div className="mt-4 flex gap-4 text-sm text-gray-600">
            <span>📝 Minimum {prompt.word_limit} words</span>
            <span>⏱️ {prompt.time_limit} minutes</span>
            <span>📚 Topic: {prompt.topic}</span>
          </div>
        </div>

        {/* Editor */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">✍️ Your Essay:</h3>
            <div className="flex gap-4 text-sm">
              <span className={getWordCount() < prompt.word_limit ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                {getWordCount()} / {prompt.word_limit} words
              </span>
            </div>
          </div>
          
          <textarea
            value={essayText}
            onChange={handleTextChange}
            className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none font-mono"
            placeholder="Start typing your essay here..."
            disabled={submitting}
          />

          {/* Warning if word count is low */}
          {essayText.length > 0 && getWordCount() < prompt.word_limit && (
            <p className="mt-2 text-sm text-red-600">
              ⚠️ Your essay is below the minimum word count. You need at least {prompt.word_limit - getWordCount()} more words.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 flex gap-4">
          <button
            onClick={() => navigate('/admin/features/writing')}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
            disabled={submitting}
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={submitting || essayText.trim().length === 0}
          >
            {submitting ? '⏳ Evaluating with AI...' : '✅ Submit for Evaluation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingEditor;
