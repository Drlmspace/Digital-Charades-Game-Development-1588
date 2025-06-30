import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiSave, FiClock, FiTarget, FiVolume2, FiVolumeX } = FiIcons;

function Settings() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [settings, setSettings] = useState(state.gameSettings);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    navigate('/');
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      timeLimit: 60,
      difficulty: 'mixed',
      rounds: 5,
      soundEnabled: true
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Game Settings</h1>
          <p className="text-white/80 text-lg">Customize your charades experience</p>
        </motion.div>

        {/* Settings Form */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Time Limit */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiClock} className="text-2xl text-white" />
              <h3 className="text-xl font-bold text-white">Time Limit</h3>
            </div>
            <p className="text-white/70 mb-4">How long should each turn last?</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[30, 60, 90, 120].map(time => (
                <motion.button
                  key={time}
                  onClick={() => updateSetting('timeLimit', time)}
                  className={`p-4 rounded-xl font-medium transition-all ${
                    settings.timeLimit === time
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {time}s
                </motion.button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiTarget} className="text-2xl text-white" />
              <h3 className="text-xl font-bold text-white">Difficulty Level</h3>
            </div>
            <p className="text-white/70 mb-4">Choose the challenge level for cards</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'easy', label: 'Easy', color: 'bg-green-500' },
                { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
                { value: 'hard', label: 'Hard', color: 'bg-red-500' },
                { value: 'mixed', label: 'Mixed', color: 'bg-purple-500' }
              ].map(diff => (
                <motion.button
                  key={diff.value}
                  onClick={() => updateSetting('difficulty', diff.value)}
                  className={`p-4 rounded-xl font-medium transition-all ${
                    settings.difficulty === diff.value
                      ? `${diff.color} text-white shadow-lg`
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {diff.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Rounds */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Rounds per Team</h3>
            <p className="text-white/70 mb-4">How many rounds should each team play?</p>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => updateSetting('rounds', Math.max(1, settings.rounds - 1))}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              
              <div className="flex-1 text-center">
                <div className="text-3xl font-bold text-white">{settings.rounds}</div>
                <div className="text-white/70 text-sm">rounds</div>
              </div>
              
              <motion.button
                onClick={() => updateSetting('rounds', Math.min(10, settings.rounds + 1))}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Sound */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Sound Effects</h3>
            <p className="text-white/70 mb-4">Enable audio cues and sound effects</p>
            
            <motion.button
              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              className={`flex items-center justify-center space-x-3 w-full p-4 rounded-xl font-medium transition-all ${
                settings.soundEnabled
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon 
                icon={settings.soundEnabled ? FiVolume2 : FiVolumeX} 
                className="text-xl" 
              />
              <span>{settings.soundEnabled ? 'Sound On' : 'Sound Off'}</span>
            </motion.button>
          </div>

          {/* Game Statistics */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Game Statistics</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{state.gameStats.totalGames}</div>
                <div className="text-white/70 text-sm">Games Played</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{state.customCards.length}</div>
                <div className="text-white/70 text-sm">Custom Cards</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back</span>
          </motion.button>

          <motion.button
            onClick={resetToDefaults}
            className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset to Defaults
          </motion.button>

          <motion.button
            onClick={saveSettings}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiSave} />
            <span>Save Settings</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;