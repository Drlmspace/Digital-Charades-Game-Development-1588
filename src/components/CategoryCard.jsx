import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck } = FiIcons;

function CategoryCard({ category, info, isSelected, onToggle, cardCount }) {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-white shadow-2xl scale-105 ring-4 ring-green-400' 
          : 'bg-white/90 shadow-lg hover:shadow-xl hover:scale-102'
      }`}
      onClick={onToggle}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {isSelected && (
        <motion.div
          className="absolute -top-3 -right-3 bg-green-400 rounded-full p-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <SafeIcon icon={FiCheck} className="text-white text-lg" />
        </motion.div>
      )}

      <div className={`text-4xl mb-4 p-4 rounded-2xl bg-gradient-to-r ${info.color} inline-block`}>
        {info.icon}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{category}</h3>
      <p className="text-gray-600 mb-4">{info.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{cardCount} cards</span>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected 
            ? 'bg-green-400 border-green-400' 
            : 'border-gray-300'
        }`}>
          {isSelected && <SafeIcon icon={FiCheck} className="text-white text-sm" />}
        </div>
      </div>
    </motion.div>
  );
}

export default CategoryCard;