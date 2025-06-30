import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiSave, FiClock, FiTarget, FiVolume2, FiVolumeX, FiUsers } = FiIcons;

function AdminSettings() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [settings, setSettings] = useState(state.gameSettings);
  const [adminSettings, setAdminSettings] = useState(state.adminSettings);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateAdminSetting = (key, value) => {
    setAdminSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    dispatch({ type: 'UPDATE_ADMIN_SETTINGS', payload: adminSettings });
    navigate('/admin/dashboard');
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      timeLimit: 60,
      difficulty: 'mixed',
      rounds: 5,
      soundEnabled: true
    };
    
    const defaultAdminSettings = {
      ...adminSettings,
      allowTeamEditing: true,
      maxTeams: 8,
      maxPlayersPerTeam: 10,
      showPlayerStats: true,
      enableAnimations: true
    };
    
    setSettings(defaultSettings);
    setAdminSettings(defaultAdminSettings);
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
            <h1 className="text-4xl font-bold text-white mb-2">Game Settings</h1>
            <p className="text-white/70">Configure game rules and behavior</p>
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

        <div className="space-y-6">
          {/* Game Rules */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Game Rules</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Time Limit */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <SafeIcon icon={FiClock} className="text-2xl text-white" />
                  <h3 className="text-xl font-bold text-white">Time Limit</h3>
                </div>
                <p className="text-white/70 mb-4">How long should each turn last?</p>
                <div className="grid grid-cols-2 gap-3">
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
                <div className="grid grid-cols-2 gap-3">
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
            </div>

            {/* Rounds */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Rounds per Team</h3>
              <p className="text-white/70 mb-4">How many rounds should each team play?</p>
              <div className="flex items-center space-x-4 max-w-md">
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
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Sound Effects</h3>
              <p className="text-white/70 mb-4">Enable audio cues and sound effects</p>
              <motion.button
                onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                className={`flex items-center justify-center space-x-3 w-full max-w-md p-4 rounded-xl font-medium transition-all ${
                  settings.soundEnabled
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SafeIcon icon={settings.soundEnabled ? FiVolume2 : FiVolumeX} className="text-xl" />
                <span>{settings.soundEnabled ? 'Sound On' : 'Sound Off'}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Team Management */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiUsers} className="text-2xl text-white" />
              <h2 className="text-2xl font-bold text-white">Team Management</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Max Teams */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Maximum Teams</h3>
                <p className="text-white/70 mb-4">How many teams can participate?</p>
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => updateAdminSetting('maxTeams', Math.max(2, adminSettings.maxTeams - 1))}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-bold text-white">{adminSettings.maxTeams}</div>
                    <div className="text-white/70 text-sm">teams</div>
                  </div>
                  <motion.button
                    onClick={() => updateAdminSetting('maxTeams', Math.min(12, adminSettings.maxTeams + 1))}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Max Players per Team */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Players per Team</h3>
                <p className="text-white/70 mb-4">Maximum players allowed per team</p>
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => updateAdminSetting('maxPlayersPerTeam', Math.max(1, adminSettings.maxPlayersPerTeam - 1))}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-bold text-white">{adminSettings.maxPlayersPerTeam}</div>
                    <div className="text-white/70 text-sm">players</div>
                  </div>
                  <motion.button
                    onClick={() => updateAdminSetting('maxPlayersPerTeam', Math.min(20, adminSettings.maxPlayersPerTeam + 1))}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Allow Team Editing</span>
                  <p className="text-white/60 text-sm">Players can modify team names and members</p>
                </div>
                <motion.button
                  onClick={() => updateAdminSetting('allowTeamEditing', !adminSettings.allowTeamEditing)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    adminSettings.allowTeamEditing ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    adminSettings.allowTeamEditing ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Show Player Statistics</span>
                  <p className="text-white/60 text-sm">Display game statistics and analytics</p>
                </div>
                <motion.button
                  onClick={() => updateAdminSetting('showPlayerStats', !adminSettings.showPlayerStats)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    adminSettings.showPlayerStats ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    adminSettings.showPlayerStats ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Enable Animations</span>
                  <p className="text-white/60 text-sm">Smooth transitions and visual effects</p>
                </div>
                <motion.button
                  onClick={() => updateAdminSetting('enableAnimations', !adminSettings.enableAnimations)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    adminSettings.enableAnimations ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    adminSettings.enableAnimations ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={resetToDefaults}
              className="flex-1 px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 rounded-xl font-medium transition-colors border border-orange-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset to Defaults
            </motion.button>
            
            <motion.button
              onClick={saveSettings}
              className="flex items-center justify-center space-x-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiSave} />
              <span>Save Settings</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;