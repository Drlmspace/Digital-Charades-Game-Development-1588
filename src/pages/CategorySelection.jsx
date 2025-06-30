import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import CategoryCard from '../components/CategoryCard';
import { gameCards, categoryInfo } from '../data/gameCards';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiCheck } = FiIcons;

function CategorySelection() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Combine built-in categories with custom categories
  const allCategories = {
    ...gameCards,
    ...Object.fromEntries(
      Object.entries(state.customCategories).map(([name, category]) => [
        name,
        category.cards || []
      ])
    )
  };

  const allCategoryInfo = {
    ...categoryInfo,
    ...Object.fromEntries(
      Object.entries(state.customCategories).map(([name, category]) => [
        name,
        {
          icon: category.icon,
          description: category.description,
          color: category.color
        }
      ])
    )
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(Object.keys(allCategories));
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const proceedToGame = () => {
    if (selectedCategories.length > 0) {
      dispatch({ type: 'SET_CATEGORIES', payload: selectedCategories });
      navigate('/game');
    }
  };

  const canProceed = selectedCategories.length > 0;

  // Separate built-in and custom categories
  const builtInCategories = Object.entries(gameCards);
  const customCategories = Object.entries(state.customCategories);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Choose Categories</h1>
          <p className="text-white/80 text-lg">
            Select the categories you want to play with ({selectedCategories.length} selected)
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="flex justify-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={selectAllCategories}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiCheck} className="inline mr-2" />
            Select All
          </motion.button>
          
          <motion.button
            onClick={clearAllCategories}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All
          </motion.button>
        </motion.div>

        {/* Built-in Categories */}
        <div className="mb-12">
          <motion.h2 
            className="text-2xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎭 Built-in Categories
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builtInCategories.map(([category, cards], index) => (
              <motion.div
                key={category}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard
                  category={category}
                  info={allCategoryInfo[category]}
                  isSelected={selectedCategories.includes(category)}
                  onToggle={() => toggleCategory(category)}
                  cardCount={cards.length}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Categories */}
        {customCategories.length > 0 && (
          <div className="mb-8">
            <motion.h2 
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎯 Your Custom Categories
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customCategories.map(([category, categoryData], index) => (
                <motion.div
                  key={category}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: (builtInCategories.length + index) * 0.1 }}
                >
                  <CategoryCard
                    category={category}
                    info={allCategoryInfo[category]}
                    isSelected={selectedCategories.includes(category)}
                    onToggle={() => toggleCategory(category)}
                    cardCount={categoryData.cards?.length || 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Custom Categories Message */}
        {customCategories.length === 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">No Custom Categories Yet</h3>
            <p className="text-white/70 mb-4">
              Create your own categories with personalized cards for a unique experience!
            </p>
            <motion.button
              onClick={() => navigate('/custom-categories')}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Custom Categories
            </motion.button>
          </motion.div>
        )}

        {/* Selected Categories Summary */}
        {selectedCategories.length > 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Selected Categories:</h3>
            <div className="flex flex-wrap gap-3">
              {selectedCategories.map(category => (
                <motion.span
                  key={category}
                  className="px-4 py-2 bg-white/20 rounded-full text-white font-medium flex items-center space-x-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <span>{allCategoryInfo[category]?.icon || '🎯'}</span>
                  <span>{category}</span>
                  <span className="text-white/70">({allCategories[category]?.length || 0})</span>
                </motion.span>
              ))}
            </div>
            <p className="text-white/70 mt-4">
              Total cards: {selectedCategories.reduce((sum, cat) => sum + (allCategories[cat]?.length || 0), 0)}
            </p>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => navigate('/team-setup')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Teams</span>
          </motion.button>

          <motion.button
            onClick={proceedToGame}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all ${
              canProceed
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
          >
            <span>Start Game</span>
            <SafeIcon icon={FiArrowRight} />
          </motion.button>
        </motion.div>

        {!canProceed && (
          <motion.p
            className="text-center text-yellow-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ Please select at least one category to continue
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default CategorySelection;