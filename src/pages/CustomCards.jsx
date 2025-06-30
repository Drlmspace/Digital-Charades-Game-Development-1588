import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiTrash2, FiArrowLeft, FiSave, FiEdit3 } = FiIcons;

function CustomCards() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [newCard, setNewCard] = useState({
    text: '',
    difficulty: 'medium',
    hint: '',
    category: 'Custom'
  });
  const [editingCard, setEditingCard] = useState(null);

  const addCard = () => {
    if (newCard.text.trim()) {
      const card = {
        id: Date.now(),
        ...newCard,
        text: newCard.text.trim(),
        hint: newCard.hint.trim() || undefined
      };
      
      dispatch({ type: 'ADD_CUSTOM_CARD', payload: card });
      setNewCard({
        text: '',
        difficulty: 'medium',
        hint: '',
        category: 'Custom'
      });
    }
  };

  const removeCard = (cardId) => {
    const updatedCards = state.customCards.filter(card => card.id !== cardId);
    dispatch({ type: 'LOAD_SAVED_DATA', payload: { ...state, customCards: updatedCards } });
  };

  const startEditing = (card) => {
    setEditingCard(card);
    setNewCard({ ...card });
  };

  const saveEdit = () => {
    if (newCard.text.trim()) {
      const updatedCards = state.customCards.map(card =>
        card.id === editingCard.id
          ? { ...newCard, text: newCard.text.trim(), hint: newCard.hint.trim() || undefined }
          : card
      );
      dispatch({ type: 'LOAD_SAVED_DATA', payload: { ...state, customCards: updatedCards } });
      setEditingCard(null);
      setNewCard({
        text: '',
        difficulty: 'medium',
        hint: '',
        category: 'Custom'
      });
    }
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewCard({
      text: '',
      difficulty: 'medium',
      hint: '',
      category: 'Custom'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Custom Cards</h1>
          <p className="text-white/80 text-lg">
            Create your own charades cards ({state.customCards.length} created)
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card Creator */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingCard ? 'Edit Card' : 'Create New Card'}
            </h2>

            <div className="space-y-4">
              {/* Card Text */}
              <div>
                <label className="block text-white/80 mb-2">Card Text *</label>
                <input
                  type="text"
                  placeholder="Enter word or phrase to act out"
                  value={newCard.text}
                  onChange={(e) => setNewCard({ ...newCard, text: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-white/80 mb-2">Category</label>
                <input
                  type="text"
                  placeholder="Custom category name"
                  value={newCard.category}
                  onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-white/80 mb-2">Difficulty</label>
                <select
                  value={newCard.difficulty}
                  onChange={(e) => setNewCard({ ...newCard, difficulty: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Hint */}
              <div>
                <label className="block text-white/80 mb-2">Hint (Optional)</label>
                <textarea
                  placeholder="Optional hint to help players"
                  value={newCard.hint}
                  onChange={(e) => setNewCard({ ...newCard, hint: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {editingCard ? (
                  <>
                    <motion.button
                      onClick={saveEdit}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SafeIcon icon={FiSave} className="inline mr-2" />
                      Save Changes
                    </motion.button>
                    <motion.button
                      onClick={cancelEdit}
                      className="px-6 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={addCard}
                    disabled={!newCard.text.trim()}
                    className={`w-full py-3 rounded-xl font-medium transition-colors ${
                      newCard.text.trim()
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                    whileHover={newCard.text.trim() ? { scale: 1.02 } : {}}
                    whileTap={newCard.text.trim() ? { scale: 0.98 } : {}}
                  >
                    <SafeIcon icon={FiPlus} className="inline mr-2" />
                    Add Card
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Your Custom Cards</h2>
            
            {state.customCards.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">🎭</div>
                <p className="text-white/70 text-lg">No custom cards yet</p>
                <p className="text-white/50">Create your first card to get started!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {state.customCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="bg-white rounded-2xl p-4 shadow-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
                            {card.difficulty.toUpperCase()}
                          </span>
                          <span className="text-gray-500 text-sm">{card.category}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{card.text}</h3>
                        
                        {card.hint && (
                          <p className="text-gray-600 text-sm">💡 {card.hint}</p>
                        )}
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          onClick={() => startEditing(card)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SafeIcon icon={FiEdit3} />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => removeCard(card.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SafeIcon icon={FiTrash2} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Home</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default CustomCards;