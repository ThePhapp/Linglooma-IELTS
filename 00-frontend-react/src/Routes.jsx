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
