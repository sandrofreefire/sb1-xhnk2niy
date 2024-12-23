import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Onboarding from './pages/auth/Onboarding';
import Discover from './pages/app/Discover';
import Matches from './pages/app/Matches';
import Messages from './pages/app/Messages';
import Profile from './pages/app/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* App routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Discover />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
}

export default App;