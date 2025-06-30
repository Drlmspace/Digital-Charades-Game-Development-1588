import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrophy, FiHome, FiRotateCcw, FiShare2 } = FiIcons;

function GameResults() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  const maxScore = Math.max(...state.teams.map(team => team.score));

  const playAgain = () => {
    dispatch({ type: 'RESET_GAME' });
    navigate('/team-setup');
  };

  const shareResults = () => {
    const resultsText = `🎭 Digital Charades Results!\n\n${sortedTeams.map((team, index) => 
      `${index + 1}. ${team.name}: ${team.score} points${index === 0 ? ' 🏆' : ''}`
    ).join('\n')}\n\nWhat a fun game! 🎉`;

    if (navigator.share) {
      navigator.share({
        title: 'Digital Charades Results',
        text: resultsText
      });
    } else {
      navigator.clipboard.writeText(resultsText);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.2, 1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            🎉
          </motion.div>

          <h1 className="text-5xl font-bold text-white mb-4">Game Complete!</h1>
          <p className="text-xl text-white/80">What an amazing performance everyone!</p>
        </motion.div>

        {/* Winner Announcement */}
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SafeIcon icon={FiTrophy} className="text-6xl text-white mb-4 mx-auto" />
          <h2 className="text-3xl font-bold text-white mb-2">🏆 Champions! 🏆</h2>
          <h3 className="text-4xl font-bold text-white mb-4">{winner.name}</h3>
          <p className="text-xl text-white/90">
            {winner.score} point{winner.score !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Full Results */}
        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">Final Scoreboard</h3>
          
          {sortedTeams.map((team, index) => (
            <motion.div
              key={team.id}
              className={`relative p-6 rounded-2xl transition-all duration-300 ${
                index === 0 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl scale-105' 
                  : 'bg-white/90 shadow-lg'
              }`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`text-3xl font-bold ${
                    index === 0 ? 'text-white' : 'text-gray-800'
                  }`}>
                    #{index + 1}
                  </div>
                  
                  <div>
                    <h4 className={`text-2xl font-bold ${
                      index === 0 ? 'text-white' : 'text-gray-800'
                    }`}>
                      {team.name}
                    </h4>
                    <p className={`${
                      index === 0 ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {team.players?.length || 0} players
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-4xl font-bold ${
                    index === 0 ? 'text-white' : 'text-gray-800'
                  }`}>
                    {team.score}
                  </div>
                  <p className={`text-sm ${
                    index === 0 ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    points
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className={`h-2 rounded-full ${
                  index === 0 ? 'bg-white/30' : 'bg-gray-200'
                }`}>
                  <motion.div
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-white' : 'bg-gradient-to-r from-blue-400 to-purple-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(team.score / maxScore) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              </div>

              {index === 0 && (
                <motion.div
                  className="absolute -top-3 -right-3 bg-white rounded-full p-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 500 }}
                >
                  <SafeIcon icon={FiTrophy} className="text-yellow-500 text-2xl" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fun Stats */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">Game Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{state.teams.length}</div>
              <div className="text-white/70 text-sm">Teams</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {state.teams.reduce((sum, team) => sum + (team.players?.length || 0), 0)}
              </div>
              <div className="text-white/70 text-sm">Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {state.teams.reduce((sum, team) => sum + team.score, 0)}
              </div>
              <div className="text-white/70 text-sm">Total Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {state.selectedCategories?.length || 0}
              </div>
              <div className="text-white/70 text-sm">Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={playAgain}
            className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiRotateCcw} className="text-xl" />
            <span>Play Again</span>
          </motion.button>

          <motion.button
            onClick={shareResults}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiShare2} className="text-xl" />
            <span>Share Results</span>
          </motion.button>

          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiHome} className="text-xl" />
            <span>Home</span>
          </motion.button>
        </motion.div>

        {/* Celebration Animation */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                rotate: 0 
              }}
              animate={{ 
                y: -100,
                rotate: 360,
                x: Math.random() * window.innerWidth
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              {['🎉', '🎊', '🏆', '⭐', '🎭'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameResults;