import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import AdminRoute from './components/AdminRoute';

// Main Game Pages
import Home from './pages/Home';
import TeamSetup from './pages/TeamSetup';
import CategorySelection from './pages/CategorySelection';
import GamePlay from './pages/GamePlay';
import GameResults from './pages/GameResults';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCustomization from './pages/admin/AdminCustomization';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCards from './pages/admin/AdminCards';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSounds from './pages/admin/AdminSounds';

import './index.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          <Routes>
            {/* Main Game Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/team-setup" element={<TeamSetup />} />
            <Route path="/categories" element={<CategorySelection />} />
            <Route path="/game" element={<GamePlay />} />
            <Route path="/results" element={<GameResults />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/customization" element={
              <AdminRoute>
                <AdminCustomization />
              </AdminRoute>
            } />
            <Route path="/admin/categories" element={
              <AdminRoute>
                <AdminCategories />
              </AdminRoute>
            } />
            <Route path="/admin/cards" element={
              <AdminRoute>
                <AdminCards />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            } />
            <Route path="/admin/sounds" element={
              <AdminRoute>
                <AdminSounds />
              </AdminRoute>
            } />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;