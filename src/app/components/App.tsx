import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import React from 'react';


import '@/styles/tailwind.css';
import '@/styles/index.css';
import '@/styles/theme.css';


import { Toaster } from "./ui/sonner";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CommunityPage from './pages/CommunityPage';
import FamilyContactsPage from './pages/FamilyContactsPage';
import SafetyTipsPage from './pages/SafetyTipsPage';
import LocationPage from './pages/LocationPage';
import RingConnectivityPage from './pages/RingConnectivityPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import UsualRoutesPage from './pages/UsualRoutesPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <div className="bg-background min-h-screen w-full"> 
      {/* This wrapper ensures the Figma background color covers the whole screen */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/community"
            element={isAuthenticated ? <CommunityPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/family"
            element={isAuthenticated ? <FamilyContactsPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/safety-tips"
            element={isAuthenticated ? <SafetyTipsPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/location"
            element={isAuthenticated ? <LocationPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/ring"
            element={isAuthenticated ? <RingConnectivityPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={isAuthenticated ? <NotificationsPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/routes"
            element={isAuthenticated ? <UsualRoutesPage onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}