import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiFolder, FiPlus, FiPalette, FiLogOut, FiHome, FiUsers, FiBarChart3, FiVolume2 } = FiIcons;

function AdminDashboard() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const handleLogout = () => {
    dispatch({ type: 'ADMIN_LOGOUT' });
    navigate('/');
  };

  const adminMenuItems = [
    {
      title: 'Game Customization',
      description: 'Customize game title, colors, and branding',
      icon: FiPalette,
      link: '/admin/customization',
      color: 'from-purple-500 to-pink-500',
      stats: 'Theme & Branding'
    },
    {
      title: 'Custom Categories',
      description: 'Manage custom game categories',
      icon: FiFolder,
      link: '/admin/categories',
      color: 'from-blue-500 to-cyan-500',
      stats: `${Object.keys(state.customCategories).length} categories`
    },
    {
      title: 'Custom Cards',
      description: 'Manage individual custom cards',
      icon: FiPlus,
      link: '/admin/cards',
      color: 'from-green-500 to-teal-500',
      stats: `${state.customCards.length} cards`
    },
    {
      title: 'Game Settings',
      description: 'Configure game rules and behavior',
      icon: FiSettings,
      link: '/admin/settings',
      color: 'from-orange-500 to-red-500',
      stats: 'Rules & Options'
    },
    {
      title: 'Sound Effects',
      description: 'Manage game audio and sound effects',
      icon: FiVolume2,
      link: '/admin/sounds',
      color: 'from-indigo-500 to-purple-500',
      stats: 'Audio Settings'
    },
    {
      title: 'Game Statistics',
      description: 'View game analytics and usage stats',
      icon: FiBarChart3,
      link: '/admin/stats',
      color: 'from-pink-500 to-rose-500',
      stats: `${state.gameStats.totalGames} games played`
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Manage your charades game settings and content</p>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiHome} />
              <span>View Game</span>
            </motion.button>
            
            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-xl transition-colors border border-red-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiLogOut} />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Current Game Info */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Current Game Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">{state.adminSettings.gameIcon}</div>
              <h3 className="text-lg font-semibold text-white">{state.adminSettings.gameTitle}</h3>
              <p className="text-white/70 text-sm">{state.adminSettings.gameSubtitle}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>Categories:</span>
                <span>{Object.keys(state.customCategories).length + 9} total</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Custom Cards:</span>
                <span>{state.customCards.length}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Sound Effects:</span>
                <span>{state.gameSettings.soundEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>Time Limit:</span>
                <span>{state.gameSettings.timeLimit}s</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Rounds:</span>
                <span>{state.gameSettings.rounds}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Max Teams:</span>
                <span>{state.adminSettings.maxTeams}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminMenuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={item.link}>
                <motion.div
                  className={`relative p-6 rounded-3xl bg-gradient-to-r ${item.color} text-white shadow-2xl cursor-pointer overflow-hidden`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 rounded-2xl p-3">
                        <SafeIcon icon={item.icon} className="text-2xl" />
                      </div>
                      <span className="text-white/80 text-sm font-medium">{item.stats}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                  
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => navigate('/admin/customization')}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition-colors border border-purple-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Theme
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/admin/categories')}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-colors border border-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Category
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/admin/cards')}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-200 rounded-lg transition-colors border border-green-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Cards
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 rounded-lg transition-colors border border-orange-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Test Game
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;