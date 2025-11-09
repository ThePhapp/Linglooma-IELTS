import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import PageLogin from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin/Admin';

import LessonSpeaking from './pages/Features/LessonSpeaking';
import SettingsPage from './pages/Settings';
import ViewResultsPage from './pages/ViewResults/ViewResults';
import Skill4 from './pages/Features/Skill4';
import IeltsSpeakingPractice from './pages/Features/Practice';
import PageRegister from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import PronunciationFeedback from './pages/Features/Feedback';
import VoiceChat from "./pages/AiChat/VoiceChat";
import ReadingList from './components/ReadingList';
import ReadingTest from './components/ReadingTest';
import WritingList from './components/WritingList';
import WritingEditor from './components/WritingEditor';
import WritingHistory from './components/WritingHistory';
import WritingDetail from './components/WritingDetail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Skill4 />} />
          <Route path="features/lesson" element={<LessonSpeaking />} />
          <Route path="features/reading" element={<ReadingList />} />
          <Route path="features/reading/:id" element={<ReadingTest />} />
          <Route path="features/writing" element={<WritingList />} />
          <Route path="features/writing/history" element={<WritingHistory />} />
          <Route path="features/writing/submissions/:submissionId" element={<WritingDetail />} />
          <Route path="features/writing/:id" element={<WritingEditor />} />
          <Route path="ai-chat" element={<VoiceChat />} />
          <Route path="view-results" element={<ViewResultsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="features/practice/:lessonId" element={<IeltsSpeakingPractice />} />
          <Route path="features/feedback/:lessonId" element={<PronunciationFeedback />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        rtl={false}
      />

    </Router>

  );
};

export default AppRoutes;
