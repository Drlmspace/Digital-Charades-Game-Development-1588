import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiSave, FiPalette, FiType, FiImage, FiSettings } = FiIcons;

function AdminCustomization() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [settings, setSettings] = useState(state.adminSettings);

  const gameIcons = ['🎭', '🎪', '🎨', '🎵', '🏆', '🎯', '🎲', '🎮', '🎊', '🎉', '🚀', '⭐', '💎', '🔥', '⚡'];
  
  const backgroundColors = [
    { name: 'Purple Sunset', value: 'from-purple-400 via-pink-500 to-red-500' },
    { name: 'Ocean Breeze', value: 'from-blue-400 via-cyan-500 to-teal-500' },
    { name: 'Forest Dawn', value: 'from-green-400 via-emerald-500 to-teal-500' },
    { name: 'Golden Hour', value: 'from-yellow-400 via-orange-500 to-red-500' },
    { name: 'Midnight Sky', value: 'from-indigo-400 via-purple-500 to-pink-500' },
    { name: 'Cherry Blossom', value: 'from-pink-400 via-rose-500 to-red-500' },
    { name: 'Arctic Aurora', value: 'from-cyan-400 via-blue-500 to-purple-500' },
    { name: 'Tropical Sunset', value: 'from-orange-400 via-pink-500 to-purple-500' }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    dispatch({ type: 'UPDATE_ADMIN_SETTINGS', payload: settings });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Game Customization</h1>
            <p className="text-white/70">Customize your game's appearance and branding</p>
          </div>
          
          <motion.button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back</span>
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Settings Form */}
          <div className="space-y-6">
            {/* Game Title */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiType} className="text-2xl text-white" />
                <h3 className="text-xl font-bold text-white">Game Title & Text</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Game Title</label>
                  <input
                    type="text"
                    value={settings.gameTitle}
                    onChange={(e) => updateSetting('gameTitle', e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter game title"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={settings.gameSubtitle}
                    onChange={(e) => updateSetting('gameSubtitle', e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter subtitle"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Description</label>
                  <textarea
                    value={settings.gameDescription}
                    onChange={(e) => updateSetting('gameDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="Enter game description"
                  />
                </div>
              </div>
            </motion.div>

            {/* Game Icon */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiImage} className="text-2xl text-white" />
                <h3 className="text-xl font-bold text-white">Game Icon</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                {gameIcons.map(icon => (
                  <motion.button
                    key={icon}
                    onClick={() => updateSetting('gameIcon', icon)}
                    className={`p-3 rounded-xl text-3xl transition-all ${
                      settings.gameIcon === icon
                        ? 'bg-blue-500 scale-110'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                    whileHover={{ scale: settings.gameIcon === icon ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Background Color */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiPalette} className="text-2xl text-white" />
                <h3 className="text-xl font-bold text-white">Background Theme</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {backgroundColors.map(color => (
                  <motion.button
                    key={color.name}
                    onClick={() => updateSetting('primaryColor', color.value)}
                    className={`relative p-4 rounded-xl bg-gradient-to-r ${color.value} text-white font-medium transition-all ${
                      settings.primaryColor === color.value
                        ? 'ring-4 ring-white scale-105'
                        : 'hover:scale-102'
                    }`}
                    whileHover={{ scale: settings.primaryColor === color.value ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {color.name}
                    {settings.primaryColor === color.value && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Advanced Settings */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiSettings} className="text-2xl text-white" />
                <h3 className="text-xl font-bold text-white">Advanced Options</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium">Enable Animations</span>
                    <p className="text-white/60 text-sm">Smooth transitions and effects</p>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('enableAnimations', !settings.enableAnimations)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.enableAnimations ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.enableAnimations ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium">Show Player Stats</span>
                    <p className="text-white/60 text-sm">Display game statistics</p>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('showPlayerStats', !settings.showPlayerStats)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.showPlayerStats ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.showPlayerStats ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </motion.button>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Maximum Teams</label>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => updateSetting('maxTeams', Math.max(2, settings.maxTeams - 1))}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold text-white">{settings.maxTeams}</div>
                      <div className="text-white/70 text-sm">teams</div>
                    </div>
                    <motion.button
                      onClick={() => updateSetting('maxTeams', Math.min(12, settings.maxTeams + 1))}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Live Preview</h3>
              
              {/* Preview Card */}
              <div className={`p-8 rounded-3xl bg-gradient-to-br ${settings.primaryColor} text-white text-center`}>
                <div className="text-6xl mb-4">{settings.gameIcon}</div>
                <h1 className="text-3xl font-bold mb-2">{settings.gameTitle}</h1>
                <p className="text-lg mb-4 opacity-90">{settings.gameSubtitle}</p>
                <p className="text-sm opacity-80 leading-relaxed">{settings.gameDescription}</p>
                
                <div className="mt-6 space-y-2">
                  <div className="bg-white/20 rounded-xl p-3">
                    <span className="text-sm">Sample Game Card Preview</span>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={saveSettings}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SafeIcon icon={FiSave} className="text-xl" />
                <span>Save Customization</span>
              </motion.button>
              
              <p className="text-white/60 text-sm text-center">
                Changes will be applied immediately to your game
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomization;