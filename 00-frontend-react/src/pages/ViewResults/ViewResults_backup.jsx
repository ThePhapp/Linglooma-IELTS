import React, { useState, useEffect } from 'react';
import axios from "@/utils/axios.customize";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Award, Target, Calendar, Clock, Book, 
  BarChart3, Activity, Brain, MessageSquare, Headphones,
  BookOpen, PenTool, Zap, ChevronRight, Users, Trophy,
  Flame, Star, TrendingDown
} from 'lucide-react';

// Sample data for enhanced analytics
const SAMPLE_ANALYTICS_DATA = {
  skillsRadar: [
    { skill: 'Listening', score: 7.5, fullMark: 9 },
    { skill: 'Speaking', score: 6.5, fullMark: 9 },
    { skill: 'Reading', score: 8.0, fullMark: 9 },
    { skill: 'Writing', score: 6.0, fullMark: 9 }
  ],
  weeklyActivity: [
    { day: 'Mon', hours: 2.5, sessions: 3 },
    { day: 'Tue', hours: 1.8, sessions: 2 },
    { day: 'Wed', hours: 3.2, sessions: 4 },
    { day: 'Thu', hours: 0.5, sessions: 1 },
    { day: 'Fri', hours: 2.0, sessions: 3 },
    { day: 'Sat', hours: 4.5, sessions: 5 },
    { day: 'Sun', hours: 3.8, sessions: 4 }
  ],
  vocabularyGrowth: [
    { month: 'Jan', words: 150 },
    { month: 'Feb', words: 280 },
    { month: 'Mar', words: 420 },
    { month: 'Apr', words: 590 },
    { month: 'May', words: 750 },
    { month: 'Jun', words: 920 }
  ],
  weaknessAnalysis: [
    { category: 'Grammar', score: 65, color: '#ef4444' },
    { category: 'Vocabulary', score: 80, color: '#f59e0b' },
    { category: 'Fluency', score: 70, color: '#10b981' },
    { category: 'Pronunciation', score: 75, color: '#3b82f6' },
    { category: 'Coherence', score: 68, color: '#8b5cf6' }
  ],
  timeDistribution: [
    { skill: 'Listening', value: 25, color: '#ec4899' },
    { skill: 'Speaking', value: 30, color: '#8b5cf6' },
    { skill: 'Reading', value: 28, color: '#06b6d4' },
    { skill: 'Writing', value: 17, color: '#10b981' }
  ],
  progressTimeline: [
    { date: 'Week 1', listening: 5.5, speaking: 5.0, reading: 6.0, writing: 5.0 },
    { date: 'Week 2', listening: 6.0, speaking: 5.5, reading: 6.5, writing: 5.5 },
    { date: 'Week 3', listening: 6.5, speaking: 6.0, reading: 7.0, writing: 5.5 },
    { date: 'Week 4', listening: 7.0, speaking: 6.0, reading: 7.5, writing: 6.0 },
    { date: 'Week 5', listening: 7.5, speaking: 6.5, reading: 8.0, writing: 6.0 }
  ]
};

const SmartAnalytics = () => {
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/incorrectphonemes/resultView');
        setResults(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Calculate stats
  const averageScore = results.length > 0
    ? (results.reduce((sum, item) => sum + (item.averageScore || 0), 0) / results.length).toFixed(1)
    : '7.0';

  const totalStudyHours = SAMPLE_ANALYTICS_DATA.weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
  const totalVocabulary = SAMPLE_ANALYTICS_DATA.vocabularyGrowth[SAMPLE_ANALYTICS_DATA.vocabularyGrowth.length - 1].words;

  // Overview Tab Content
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Overall Band</p>
          <p className="text-4xl font-bold text-purple-600">{averageScore}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-semibold">+0.5 this week</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl">⏰</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Study Hours</p>
          <p className="text-4xl font-bold text-blue-600">{totalStudyHours.toFixed(1)}h</p>
          <div className="mt-3 text-sm text-gray-500">This week</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Vocabulary</p>
          <p className="text-4xl font-bold text-green-600">{totalVocabulary}</p>
          <div className="mt-3 text-sm text-gray-500">Words learned</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Study Streak</p>
          <p className="text-4xl font-bold text-orange-600">12</p>
          <div className="mt-3 text-sm text-gray-500">Days in a row</div>
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Score Progress Timeline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={SAMPLE_ANALYTICS_DATA.progressTimeline}>
              <defs>
                <linearGradient id="gradientScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis domain={[0, 9]} stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="speaking" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fill="url(#gradientScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Time Spent on Each Skill
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={SAMPLE_ANALYTICS_DATA.timeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({skill, value}) => `${skill}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {SAMPLE_ANALYTICS_DATA.timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vocabulary Growth */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Book className="h-5 w-5 text-green-600" />
          Vocabulary Growth Tracker
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={SAMPLE_ANALYTICS_DATA.vocabularyGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="words" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Skills Tab Content
  const SkillsTab = () => (
    <div className="space-y-6">
      {/* 4 Skills Radar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-purple-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Target className="h-7 w-7 text-purple-600" />
          4 Skills Comparison (Radar Chart)
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <RadarChart data={SAMPLE_ANALYTICS_DATA.skillsRadar}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="skill" style={{ fontSize: '14px', fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={90} domain={[0, 9]} />
            <Radar 
              name="Your Score" 
              dataKey="score" 
              stroke="#8b5cf6" 
              fill="#8b5cf6" 
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Listening', score: 7.5, icon: Headphones, color: 'from-pink-500 to-rose-500', bg: 'border-pink-200' },
          { name: 'Speaking', score: 6.5, icon: MessageSquare, color: 'from-purple-500 to-violet-500', bg: 'border-purple-200' },
          { name: 'Reading', score: 8.0, icon: BookOpen, color: 'from-blue-500 to-cyan-500', bg: 'border-blue-200' },
          { name: 'Writing', score: 6.0, icon: PenTool, color: 'from-green-500 to-emerald-500', bg: 'border-green-200' }
        ].map((skill) => (
          <div key={skill.name} className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 ${skill.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center`}>
                  <skill.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">{skill.name}</h4>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-800">{skill.score}</p>
                <p className="text-sm text-gray-500">/9.0</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${(skill.score / 9) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {skill.score >= 7 ? '🌟 Excellent progress!' : skill.score >= 6 ? '👍 Good work, keep practicing!' : '📚 Focus on improvement'}
            </p>
          </div>
        ))}
      </div>

      {/* Weakness Analysis */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-red-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-red-600" />
          Weakness Analyzer (Areas to Improve)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SAMPLE_ANALYTICS_DATA.weaknessAnalysis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="category" stroke="#6b7280" />
            <YAxis domain={[0, 100]} stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="score" radius={[10, 10, 0, 0]}>
              {SAMPLE_ANALYTICS_DATA.weaknessAnalysis.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {SAMPLE_ANALYTICS_DATA.weaknessAnalysis.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-700">{item.category}: {item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Progress Tab Content
  const ProgressTab = () => (
    <div className="space-y-6">
      {/* Multi-line Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          4 Skills Progress Over Time
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={SAMPLE_ANALYTICS_DATA.progressTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis domain={[0, 9]} stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="listening" stroke="#ec4899" strokeWidth={3} name="Listening" />
            <Line type="monotone" dataKey="speaking" stroke="#8b5cf6" strokeWidth={3} name="Speaking" />
            <Line type="monotone" dataKey="reading" stroke="#06b6d4" strokeWidth={3} name="Reading" />
            <Line type="monotone" dataKey="writing" stroke="#10b981" strokeWidth={3} name="Writing" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-green-200">
          <Award className="h-12 w-12 text-green-600 mb-4" />
          <p className="text-gray-600 text-sm mb-1">Tests Completed</p>
          <p className="text-4xl font-bold text-green-600">{results.length}</p>
          <p className="text-sm text-gray-500 mt-2">Keep up the good work!</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-200">
          <Star className="h-12 w-12 text-blue-600 mb-4" />
          <p className="text-gray-600 text-sm mb-1">Best Performance</p>
          <p className="text-4xl font-bold text-blue-600">8.0</p>
          <p className="text-sm text-gray-500 mt-2">Reading - Week 5</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-orange-200">
          <Zap className="h-12 w-12 text-orange-600 mb-4" />
          <p className="text-gray-600 text-sm mb-1">Improvement Rate</p>
          <p className="text-4xl font-bold text-orange-600">+25%</p>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>
      </div>
    </div>
  );

  // Activity Tab Content
  const ActivityTab = () => (
    <div className="space-y-6">
      {/* Weekly Activity Heatmap */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Weekly Study Activity (Heatmap)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SAMPLE_ANALYTICS_DATA.weeklyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="hours" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_ANALYTICS_DATA.weeklyActivity.map((day) => (
          <div key={day.day} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-800">{day.day}</p>
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{day.hours}h</p>
            <p className="text-sm text-gray-500 mt-1">{day.sessions} sessions</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${(day.hours / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Smart Analytics Dashboard
                </h1>
                <p className="text-white/90 text-lg">
                  Track your IELTS progress with detailed insights
                </p>
              </div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <p className="text-white/80 text-sm mb-1">Overall Band Score</p>
              <p className="text-5xl font-bold text-white">{averageScore}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'skills', label: '4 Skills', icon: Target },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'activity', label: 'Activity', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'skills' && <SkillsTab />}
            {activeTab === 'progress' && <ProgressTab />}
            {activeTab === 'activity' && <ActivityTab />}
          </>
        )}
      </div>
    </div>
  );
};

export default SmartAnalytics;
