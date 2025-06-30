import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiTrash2, FiArrowLeft, FiSave, FiEdit3, FiFolder, FiFileText } = FiIcons;

function AdminCategories() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('🎯');
  const [newCategoryColor, setNewCategoryColor] = useState('from-blue-400 to-purple-500');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Card form state
  const [newCard, setNewCard] = useState({
    text: '',
    difficulty: 'medium',
    hint: ''
  });
  const [editingCard, setEditingCard] = useState(null);

  const availableColors = [
    'from-red-400 to-pink-500',
    'from-blue-400 to-purple-500',
    'from-green-400 to-teal-500',
    'from-yellow-400 to-orange-500',
    'from-purple-400 to-indigo-500',
    'from-pink-400 to-red-500',
    'from-indigo-400 to-blue-500',
    'from-teal-400 to-green-500',
    'from-orange-400 to-red-500',
    'from-cyan-400 to-blue-500'
  ];

  const availableIcons = ['🎯', '🎪', '🎨', '🎵', '🏆', '🌟', '🚀', '💎', '🔥', '⚡', '🎭', '🎲', '🎸', '🎹', '🎤'];

  const createCategory = () => {
    if (newCategoryName.trim()) {
      const category = {
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim() || 'Custom category',
        icon: newCategoryIcon,
        color: newCategoryColor,
        cards: []
      };

      dispatch({ type: 'CREATE_CUSTOM_CATEGORY', payload: category });
      resetCategoryForm();
    }
  };

  const updateCategory = () => {
    if (newCategoryName.trim() && editingCategory) {
      const updatedCategory = {
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim() || 'Custom category',
        icon: newCategoryIcon,
        color: newCategoryColor
      };

      dispatch({ 
        type: 'UPDATE_CUSTOM_CATEGORY', 
        payload: { oldName: editingCategory, newCategory: updatedCategory } 
      });
      
      if (selectedCategory === editingCategory) {
        setSelectedCategory(updatedCategory.name);
      }
      
      resetCategoryForm();
    }
  };

  const deleteCategory = (categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}" and all its cards?`)) {
      dispatch({ type: 'DELETE_CUSTOM_CATEGORY', payload: categoryName });
      if (selectedCategory === categoryName) {
        setSelectedCategory(null);
      }
    }
  };

  const resetCategoryForm = () => {
    setNewCategoryName('');
    setNewCategoryDescription('');
    setNewCategoryIcon('🎯');
    setNewCategoryColor('from-blue-400 to-purple-500');
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const startEditingCategory = (categoryName) => {
    const category = state.customCategories[categoryName];
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.description);
    setNewCategoryIcon(category.icon);
    setNewCategoryColor(category.color);
    setEditingCategory(categoryName);
    setShowCategoryForm(true);
  };

  const addCardToCategory = () => {
    if (newCard.text.trim() && selectedCategory) {
      const card = {
        id: Date.now(),
        text: newCard.text.trim(),
        difficulty: newCard.difficulty,
        hint: newCard.hint.trim() || undefined
      };

      dispatch({ 
        type: 'ADD_CARD_TO_CATEGORY', 
        payload: { categoryName: selectedCategory, card } 
      });
      
      resetCardForm();
    }
  };

  const updateCard = () => {
    if (newCard.text.trim() && selectedCategory && editingCard) {
      dispatch({
        type: 'REMOVE_CARD_FROM_CATEGORY',
        payload: { categoryName: selectedCategory, cardId: editingCard.id }
      });

      const updatedCard = {
        ...editingCard,
        text: newCard.text.trim(),
        difficulty: newCard.difficulty,
        hint: newCard.hint.trim() || undefined
      };

      dispatch({
        type: 'ADD_CARD_TO_CATEGORY',
        payload: { categoryName: selectedCategory, card: updatedCard }
      });

      resetCardForm();
    }
  };

  const deleteCard = (cardId) => {
    if (selectedCategory) {
      dispatch({
        type: 'REMOVE_CARD_FROM_CATEGORY',
        payload: { categoryName: selectedCategory, cardId }
      });
    }
  };

  const resetCardForm = () => {
    setNewCard({ text: '', difficulty: 'medium', hint: '' });
    setEditingCard(null);
  };

  const startEditingCard = (card) => {
    setNewCard({
      text: card.text,
      difficulty: card.difficulty,
      hint: card.hint || ''
    });
    setEditingCard(card);
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Custom Categories</h1>
            <p className="text-white/70">Manage custom game categories and cards</p>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <SafeIcon icon={FiFolder} className="mr-3" />
                Categories
              </h2>
              <motion.button
                onClick={() => setShowCategoryForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiPlus} className="text-xl" />
              </motion.button>
            </div>

            {/* Category Creation Form */}
            {showCategoryForm && (
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-4 border border-white/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h3>
                
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none text-sm bg-white/20 text-white placeholder-white/50"
                />
                
                <input
                  type="text"
                  placeholder="Description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none text-sm bg-white/20 text-white placeholder-white/50"
                />

                {/* Icon Selection */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableIcons.map(icon => (
                      <button
                        key={icon}
                        onClick={() => setNewCategoryIcon(icon)}
                        className={`p-2 rounded-lg text-xl transition-colors ${
                          newCategoryIcon === icon 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Color</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setNewCategoryColor(color)}
                        className={`h-8 rounded-lg bg-gradient-to-r ${color} border-2 transition-colors ${
                          newCategoryColor === color ? 'border-white' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    onClick={editingCategory ? updateCategory : createCategory}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </motion.button>
                  <motion.button
                    onClick={resetCategoryForm}
                    className="px-4 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-medium transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Categories List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.keys(state.customCategories).length === 0 ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <SafeIcon icon={FiFolder} className="text-4xl text-white/50 mx-auto mb-2" />
                  <p className="text-white/70">No custom categories yet</p>
                  <p className="text-white/50 text-sm">Create your first category!</p>
                </div>
              ) : (
                Object.entries(state.customCategories).map(([categoryName, category]) => (
                  <motion.div
                    key={categoryName}
                    className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      selectedCategory === categoryName
                        ? 'bg-white/20 border-white/40 scale-105'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    onClick={() => setSelectedCategory(categoryName)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${category.color} text-white text-xl`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">
                            {category.name}
                          </h3>
                          <p className="text-sm text-white/70">
                            {category.cards?.length || 0} cards
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-1">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditingCategory(categoryName);
                          }}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SafeIcon icon={FiEdit3} className="text-sm" />
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCategory(categoryName);
                          }}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SafeIcon icon={FiTrash2} className="text-sm" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Card Manager */}
          <div className="lg:col-span-2 space-y-6">
            {selectedCategory ? (
              <>
                {/* Selected Category Header */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${state.customCategories[selectedCategory].color} text-white text-2xl`}>
                      {state.customCategories[selectedCategory].icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedCategory}</h2>
                      <p className="text-white/70">{state.customCategories[selectedCategory].description}</p>
                    </div>
                  </div>

                  {/* Add Card Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      {editingCard ? 'Edit Card' : 'Add New Card'}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Card text"
                        value={newCard.text}
                        onChange={(e) => setNewCard({ ...newCard, text: e.target.value })}
                        className="px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none bg-white/20 text-white placeholder-white/50"
                      />
                      
                      <select
                        value={newCard.difficulty}
                        onChange={(e) => setNewCard({ ...newCard, difficulty: e.target.value })}
                        className="px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none bg-white/20 text-white"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <textarea
                      placeholder="Optional hint"
                      value={newCard.hint}
                      onChange={(e) => setNewCard({ ...newCard, hint: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none resize-none bg-white/20 text-white placeholder-white/50"
                    />

                    <div className="flex space-x-3">
                      {editingCard ? (
                        <>
                          <motion.button
                            onClick={updateCard}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <SafeIcon icon={FiSave} className="inline mr-2" />
                            Update Card
                          </motion.button>
                          <motion.button
                            onClick={resetCardForm}
                            className="px-6 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Cancel
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={addCardToCategory}
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
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <SafeIcon icon={FiFileText} className="mr-2" />
                    Cards ({state.customCategories[selectedCategory]?.cards?.length || 0})
                  </h3>
                  
                  {(state.customCategories[selectedCategory]?.cards?.length || 0) === 0 ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                      <div className="text-4xl mb-4">📝</div>
                      <p className="text-white/70 text-lg">No cards in this category yet</p>
                      <p className="text-white/50">Add your first card above!</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {state.customCategories[selectedCategory].cards.map((card, index) => (
                        <motion.div
                          key={card.id}
                          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
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
                              </div>
                              
                              <h4 className="text-lg font-bold text-white mb-1">{card.text}</h4>
                              
                              {card.hint && (
                                <p className="text-white/70 text-sm">💡 {card.hint}</p>
                              )}
                            </div>

                            <div className="flex space-x-2 ml-4">
                              <motion.button
                                onClick={() => startEditingCard(card)}
                                className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <SafeIcon icon={FiEdit3} />
                              </motion.button>
                              
                              <motion.button
                                onClick={() => deleteCard(card.id)}
                                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
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
              </>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
                <SafeIcon icon={FiFolder} className="text-6xl text-white/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Select a Category</h3>
                <p className="text-white/70">Choose a category from the left to manage its cards</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategories;