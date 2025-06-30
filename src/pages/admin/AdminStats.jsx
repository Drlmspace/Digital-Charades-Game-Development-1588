import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiBarChart3, FiUsers, FiClock, FiTrendingUp, FiTarget, FiAward, FiVolume2 } = FiIcons;

function AdminStats() {
  const navigate = useNavigate();
  const { state } = useGame();

  const stats = [
    {
      title: 'Total Games',
      value: state.gameStats.totalGames,
      icon: FiBarChart3,
      color: 'from-blue-500 to-cyan-500',
      description: 'Games completed'
    },
    {
      title: 'Custom Cards',
      value: state.customCards.length,
      icon: FiTarget,
      color: 'from-green-500 to-teal-500',
      description: 'Cards created'
    },
    {
      title: 'Custom Categories',
      value: Object.keys(state.customCategories).length,
      icon: FiUsers,
      color: 'from-purple-500 to-pink-500',
      description: 'Categories created'
    },
    {
      title: 'Total Custom Cards',
      value: Object.values(state.customCategories).reduce((sum, cat) => sum + (cat.cards?.length || 0), 0),
      icon: FiAward,
      color: 'from-orange-500 to-red-500',
      description: 'In custom categories'
    }
  ];

  const categoryStats = Object.entries(state.customCategories).map(([name, category]) => ({
    name,
    cardCount: category.cards?.length || 0,
    icon: category.icon,
    color: category.color
  }));

  const gameSettings = [
    {
      label: 'Default Time Limit',
      value: `${state.gameSettings.timeLimit} seconds`,
      icon: FiClock
    },
    {
      label: 'Default Rounds',
      value: `${state.gameSettings.rounds} rounds`,
      icon: FiTrendingUp
    },
    {
      label: 'Sound Effects',
      value: state.gameSettings.soundEnabled ? 'Enabled' : 'Disabled',
      icon: FiVolume2
    },
    {
      label: 'Max Teams',
      value: `${state.adminSettings.maxTeams} teams`,
      icon: FiUsers
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Game Statistics</h1>
            <p className="text-white/70">Analytics and usage statistics for your game</p>
          </div>
          
          <motion.button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Dashboard</span>
          </motion.button>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`bg-gradient-to-r ${stat.color} rounded-3xl p-6 text-white`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <SafeIcon icon={stat.icon} className="text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
              <p className="text-white/80 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Custom Categories Breakdown */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Custom Categories</h2>
            
            {categoryStats.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-white/70">No custom categories created yet</p>
                <p className="text-white/50 text-sm">Create categories to see detailed statistics</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryStats.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-2xl"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${category.color} text-white text-lg`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        <p className="text-white/70 text-sm">{category.cardCount} cards</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{category.cardCount}</div>
                      <div className="text-white/60 text-xs">cards</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Game Configuration */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Current Configuration</h2>
            
            <div className="space-y-4">
              {gameSettings.map((setting, index) => (
                <motion.div
                  key={setting.label}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-2xl"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={setting.icon} className="text-white/70 text-xl" />
                    <span className="text-white font-medium">{setting.label}</span>
                  </div>
                  <span className="text-white/90 font-semibold">{setting.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Game Title Preview */}
        <motion.div
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Current Game Branding</h2>
          
          <div className={`p-8 rounded-3xl bg-gradient-to-br ${state.adminSettings.primaryColor} text-white text-center`}>
            <div className="text-4xl mb-4">{state.adminSettings.gameIcon}</div>
            <h1 className="text-3xl font-bold mb-2">{state.adminSettings.gameTitle}</h1>
            <p className="text-lg mb-4 opacity-90">{state.adminSettings.gameSubtitle}</p>
            <div className="text-sm opacity-80">
              {state.adminSettings.gameDescription.substring(0, 100)}...
            </div>
          </div>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-6 border border-indigo-500/30"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">💡 Usage Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-white/80">
            <div>
              <h4 className="font-semibold mb-2">🎯 Create Engaging Content</h4>
              <p className="text-sm">Add custom categories that match your audience. Mix different difficulty levels to keep the game exciting for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎨 Customize Appearance</h4>
              <p className="text-sm">Personalize the game title, colors, and branding to match your event or organization's theme.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔊 Sound Design</h4>
              <p className="text-sm">Use sound effects to enhance the gaming experience. Test different sounds to find what works best for your group.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Monitor Usage</h4>
              <p className="text-sm">Check these statistics regularly to understand how your custom content is being used and which categories are most popular.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminStats;