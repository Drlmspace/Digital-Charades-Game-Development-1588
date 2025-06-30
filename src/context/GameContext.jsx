import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { gameCards } from '../data/gameCards';

const GameContext = createContext();

const initialState = {
  teams: [],
  currentTeamIndex: 0,
  currentPlayerIndex: 0,
  selectedCategories: [],
  gameCards: [],
  currentCard: null,
  gameStarted: false,
  gameSettings: {
    timeLimit: 60,
    difficulty: 'mixed',
    rounds: 5,
    soundEnabled: true
  },
  gameStats: {
    totalGames: 0,
    totalCards: 0,
    averageScore: 0
  },
  customCards: [],
  customCategories: {},
  // Admin settings
  adminSettings: {
    gameTitle: 'Digital Charades',
    gameSubtitle: 'The Ultimate Party Game',
    gameDescription: 'The ultimate party game experience! Act out words and phrases while your team guesses. Perfect for families, friends, and gatherings of all sizes.',
    gameIcon: '🎭',
    primaryColor: 'from-purple-400 via-pink-500 to-red-500',
    soundEffects: {
      correctGuess: '/sounds/correct.mp3',
      timeUp: '/sounds/timeup.mp3',
      gameStart: '/sounds/start.mp3',
      buttonClick: '/sounds/click.mp3'
    },
    enableAnimations: true,
    showPlayerStats: true,
    allowTeamEditing: true,
    maxTeams: 8,
    maxPlayersPerTeam: 10
  },
  isAdminAuthenticated: false
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    
    case 'SET_CATEGORIES':
      return { ...state, selectedCategories: action.payload };
    
    case 'START_GAME':
      const cards = generateGameCards(state.selectedCategories, state.gameSettings.difficulty, state.customCategories);
      return {
        ...state,
        gameStarted: true,
        gameCards: cards,
        currentCard: cards[0] || null
      };
    
    case 'NEXT_CARD':
      const nextCardIndex = Math.floor(Math.random() * state.gameCards.length);
      return {
        ...state,
        currentCard: state.gameCards[nextCardIndex]
      };
    
    case 'CORRECT_GUESS':
      const updatedTeams = [...state.teams];
      updatedTeams[state.currentTeamIndex].score += 1;
      return {
        ...state,
        teams: updatedTeams
      };
    
    case 'NEXT_TURN':
      const nextTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;
      return {
        ...state,
        currentTeamIndex: nextTeamIndex
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        gameSettings: { ...state.gameSettings, ...action.payload }
      };
    
    case 'UPDATE_ADMIN_SETTINGS':
      return {
        ...state,
        adminSettings: { ...state.adminSettings, ...action.payload }
      };
    
    case 'ADD_CUSTOM_CARD':
      return {
        ...state,
        customCards: [...state.customCards, action.payload]
      };

    case 'CREATE_CUSTOM_CATEGORY':
      return {
        ...state,
        customCategories: {
          ...state.customCategories,
          [action.payload.name]: {
            ...action.payload,
            cards: []
          }
        }
      };

    case 'ADD_CARD_TO_CATEGORY':
      const { categoryName, card } = action.payload;
      return {
        ...state,
        customCategories: {
          ...state.customCategories,
          [categoryName]: {
            ...state.customCategories[categoryName],
            cards: [...(state.customCategories[categoryName]?.cards || []), card]
          }
        }
      };

    case 'REMOVE_CARD_FROM_CATEGORY':
      const { categoryName: catName, cardId } = action.payload;
      return {
        ...state,
        customCategories: {
          ...state.customCategories,
          [catName]: {
            ...state.customCategories[catName],
            cards: state.customCategories[catName].cards.filter(card => card.id !== cardId)
          }
        }
      };

    case 'DELETE_CUSTOM_CATEGORY':
      const { [action.payload]: deletedCategory, ...remainingCategories } = state.customCategories;
      return {
        ...state,
        customCategories: remainingCategories
      };

    case 'UPDATE_CUSTOM_CATEGORY':
      const { oldName, newCategory } = action.payload;
      const { [oldName]: oldCat, ...otherCategories } = state.customCategories;
      return {
        ...state,
        customCategories: {
          ...otherCategories,
          [newCategory.name]: {
            ...oldCat,
            ...newCategory
          }
        }
      };

    case 'ADMIN_LOGIN':
      return {
        ...state,
        isAdminAuthenticated: true
      };

    case 'ADMIN_LOGOUT':
      return {
        ...state,
        isAdminAuthenticated: false
      };
    
    case 'RESET_GAME':
      return {
        ...initialState,
        gameSettings: state.gameSettings,
        customCards: state.customCards,
        customCategories: state.customCategories,
        adminSettings: state.adminSettings,
        isAdminAuthenticated: state.isAdminAuthenticated
      };
    
    case 'LOAD_SAVED_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

function generateGameCards(categories, difficulty, customCategories = {}) {
  let cards = [];
  
  categories.forEach(category => {
    if (gameCards[category]) {
      const categoryCards = gameCards[category];
      const filteredCards = difficulty === 'mixed' 
        ? categoryCards 
        : categoryCards.filter(card => card.difficulty === difficulty);
      cards = [...cards, ...filteredCards];
    }
    else if (customCategories[category]) {
      const categoryCards = customCategories[category].cards || [];
      const filteredCards = difficulty === 'mixed' 
        ? categoryCards 
        : categoryCards.filter(card => card.difficulty === difficulty);
      cards = [...cards, ...filteredCards];
    }
  });
  
  return shuffleArray(cards);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('charades-game-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsed });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data whenever state changes
  useEffect(() => {
    const dataToSave = {
      gameSettings: state.gameSettings,
      customCards: state.customCards,
      customCategories: state.customCategories,
      gameStats: state.gameStats,
      adminSettings: state.adminSettings
    };
    localStorage.setItem('charades-game-data', JSON.stringify(dataToSave));
  }, [state.gameSettings, state.customCards, state.customCategories, state.gameStats, state.adminSettings]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}