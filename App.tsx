
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Details from './pages/Details';
import PostOpportunity from './pages/PostOpportunity';
import Inbox from './pages/Inbox';
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/post" element={<PostOpportunity />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/opportunity/:id" element={<Details />} />
            {/* Fallback routes */}
            <Route path="/saved" element={<Navigate to="/explore" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
