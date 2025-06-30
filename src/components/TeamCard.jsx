import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTrophy, FiStar } = FiIcons;

function TeamCard({ team, isActive, onClick, showScore = true }) {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-white shadow-2xl scale-105 ring-4 ring-yellow-400' 
          : 'bg-white/90 shadow-lg hover:shadow-xl hover:scale-102'
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <SafeIcon icon={FiStar} className="text-white text-lg" />
        </motion.div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full bg-gradient-to-r ${team.color} text-white`}>
            <SafeIcon icon={FiUsers} className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
            <p className="text-gray-600">{team.players?.length || 0} players</p>
          </div>
        </div>

        {showScore && (
          <div className="text-center">
            <div className="flex items-center space-x-1 mb-1">
              <SafeIcon icon={FiTrophy} className="text-yellow-500 text-lg" />
              <span className="text-2xl font-bold text-gray-800">{team.score}</span>
            </div>
            <p className="text-sm text-gray-600">points</p>
          </div>
        )}
      </div>

      {team.players && team.players.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Players:</p>
          <div className="flex flex-wrap gap-2">
            {team.players.map((player, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {player}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default TeamCard;