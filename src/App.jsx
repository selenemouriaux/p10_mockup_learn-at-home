import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Calendar from './components/Calendar';
import Tasks from './components/Tasks';
import Navigation from './components/Navigation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('student'); // 'student' or 'tutor'

  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated ? (
          <div className="flex h-screen overflow-hidden">
            {/* Navigation sidebar */}
            <Navigation userType={userType} onLogout={handleLogout} />
            
            {/* Main content */}
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard userType={userType} />} />
                <Route path="/chat" element={<Chat userType={userType} />} />
                <Route path="/calendar" element={<Calendar userType={userType} />} />
                <Route path="/tasks" element={<Tasks userType={userType} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
