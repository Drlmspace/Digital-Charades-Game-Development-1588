import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHelpCircle, FiStar } = FiIcons;

function GameCard({ card, showHint = false, onToggleHint }) {
  if (!card) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyStars = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Difficulty indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {[...Array(getDifficultyStars(card.difficulty))].map((_, i) => (
            <SafeIcon key={i} icon={FiStar} className="text-yellow-400 text-lg" />
          ))}
          <span className="text-sm text-gray-600 capitalize">{card.difficulty}</span>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
          {card.difficulty.toUpperCase()}
        </span>
      </div>

      {/* Card text */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          {card.text}
        </h2>
      </div>

      {/* Hint section */}
      {card.hint && (
        <div className="border-t pt-6">
          <button
            onClick={onToggleHint}
            className="flex items-center justify-center w-full mb-4 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <SafeIcon icon={FiHelpCircle} className="mr-2" />
            <span className="font-medium">
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </span>
          </button>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: showHint ? 1 : 0, 
              height: showHint ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-blue-800 text-center font-medium">
                💡 {card.hint}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default GameCard;