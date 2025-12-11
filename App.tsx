import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Details from './pages/Details';
import PostOpportunity from './pages/PostOpportunity';
import Inbox from './pages/Inbox';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/explore" element={<Layout><Explore /></Layout>} />
            <Route path="/opportunity/:id" element={<Layout><Details /></Layout>} />

            <Route path="/post" element={
              <ProtectedRoute>
                <Layout><PostOpportunity /></Layout>
              </ProtectedRoute>
            } />

            <Route path="/inbox" element={
              <ProtectedRoute>
                <Layout><Inbox /></Layout>
              </ProtectedRoute>
            } />

            <Route path="/saved" element={<Navigate to="/explore" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
