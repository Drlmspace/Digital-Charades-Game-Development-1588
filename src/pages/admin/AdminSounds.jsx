import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiSave, FiVolume2, FiVolumeX, FiPlay, FiUpload } = FiIcons;

function AdminSounds() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [soundSettings, setSoundSettings] = useState(state.adminSettings.soundEffects);
  const [masterVolume, setMasterVolume] = useState(0.7);

  const soundCategories = [
    {
      id: 'correctGuess',
      name: 'Correct Guess',
      description: 'Plays when a team guesses correctly',
      currentSound: soundSettings.correctGuess,
      presets: [
        { name: 'Success Bell', url: '/sounds/success-bell.mp3' },
        { name: 'Celebration', url: '/sounds/celebration.mp3' },
        { name: 'Ding', url: '/sounds/ding.mp3' }
      ]
    },
    {
      id: 'timeUp',
      name: 'Time Up',
      description: 'Plays when the timer runs out',
      currentSound: soundSettings.timeUp,
      presets: [
        { name: 'Buzzer', url: '/sounds/buzzer.mp3' },
        { name: 'Bell Ring', url: '/sounds/bell-ring.mp3' },
        { name: 'Alert', url: '/sounds/alert.mp3' }
      ]
    },
    {
      id: 'gameStart',
      name: 'Game Start',
      description: 'Plays when starting a new turn',
      currentSound: soundSettings.gameStart,
      presets: [
        { name: 'Whistle', url: '/sounds/whistle.mp3' },
        { name: 'Start Horn', url: '/sounds/start-horn.mp3' },
        { name: 'Chime', url: '/sounds/chime.mp3' }
      ]
    },
    {
      id: 'buttonClick',
      name: 'Button Click',
      description: 'Plays on button interactions',
      currentSound: soundSettings.buttonClick,
      presets: [
        { name: 'Click', url: '/sounds/click.mp3' },
        { name: 'Pop', url: '/sounds/pop.mp3' },
        { name: 'Tap', url: '/sounds/tap.mp3' }
      ]
    }
  ];

  const updateSoundEffect = (category, soundUrl) => {
    setSoundSettings(prev => ({
      ...prev,
      [category]: soundUrl
    }));
  };

  const playSound = (soundUrl) => {
    if (soundUrl && soundUrl !== 'none') {
      const audio = new Audio(soundUrl);
      audio.volume = masterVolume;
      audio.play().catch(error => {
        console.log('Could not play sound:', error);
      });
    }
  };

  const saveSettings = () => {
    dispatch({ 
      type: 'UPDATE_ADMIN_SETTINGS', 
      payload: { 
        ...state.adminSettings,
        soundEffects: soundSettings 
      } 
    });
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
            <h1 className="text-4xl font-bold text-white mb-2">Sound Effects</h1>
            <p className="text-white/70">Manage game audio and sound effects</p>
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
          {/* Master Volume */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiVolume2} className="text-2xl text-white" />
              <h2 className="text-2xl font-bold text-white">Master Volume</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiVolumeX} className="text-white/70" />
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <SafeIcon icon={FiVolume2} className="text-white/70" />
              <span className="text-white font-medium min-w-[3rem]">
                {Math.round(masterVolume * 100)}%
              </span>
            </div>
          </motion.div>

          {/* Sound Categories */}
          {soundCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </div>
                
                {category.currentSound && category.currentSound !== 'none' && (
                  <motion.button
                    onClick={() => playSound(category.currentSound)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-xl transition-colors border border-blue-500/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiPlay} />
                    <span>Test</span>
                  </motion.button>
                )}
              </div>

              {/* Current Selection */}
              <div className="mb-4 p-3 bg-white/10 rounded-xl">
                <span className="text-white/80 text-sm">Current: </span>
                <span className="text-white font-medium">
                  {category.currentSound === 'none' ? 'No Sound' : 
                   category.presets.find(p => p.url === category.currentSound)?.name || 'Custom Sound'}
                </span>
              </div>

              {/* Preset Options */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <motion.button
                  onClick={() => updateSoundEffect(category.id, 'none')}
                  className={`p-3 rounded-xl font-medium transition-all ${
                    category.currentSound === 'none'
                      ? 'bg-gray-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  No Sound
                </motion.button>
                
                {category.presets.map(preset => (
                  <motion.button
                    key={preset.url}
                    onClick={() => updateSoundEffect(category.id, preset.url)}
                    className={`p-3 rounded-xl font-medium transition-all ${
                      category.currentSound === preset.url
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {preset.name}
                  </motion.button>
                ))}
              </div>

              {/* Custom Upload */}
              <div className="border-t border-white/20 pt-4">
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-xl transition-colors border border-purple-500/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiUpload} />
                  <span>Upload Custom Sound</span>
                </motion.button>
                <p className="text-white/50 text-xs mt-2">
                  Supported formats: MP3, WAV, OGG (max 2MB)
                </p>
              </div>
            </motion.div>
          ))}

          {/* Sound Test Panel */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Test All Sounds</h3>
            <p className="text-white/70 mb-4">Preview how your sounds will work during gameplay</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {soundCategories.map(category => (
                <motion.button
                  key={category.id}
                  onClick={() => playSound(category.currentSound)}
                  disabled={!category.currentSound || category.currentSound === 'none'}
                  className={`p-3 rounded-xl font-medium transition-all ${
                    !category.currentSound || category.currentSound === 'none'
                      ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-500/50'
                  }`}
                  whileHover={category.currentSound && category.currentSound !== 'none' ? { scale: 1.02 } : {}}
                  whileTap={category.currentSound && category.currentSound !== 'none' ? { scale: 0.98 } : {}}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            className="flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={saveSettings}
              className="flex items-center space-x-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiSave} />
              <span>Save Sound Settings</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminSounds;