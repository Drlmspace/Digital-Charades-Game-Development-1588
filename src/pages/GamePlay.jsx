import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Timer from '../components/Timer';
import GameCard from '../components/GameCard';
import TeamCard from '../components/TeamCard';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiSkipForward, FiPause, FiHome, FiRotateCcw } = FiIcons;

function GamePlay() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [showHint, setShowHint] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gamePhase, setGamePhase] = useState('ready'); // ready, playing, paused, timeup
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  useEffect(() => {
    if (!state.teams.length || !state.selectedCategories.length) {
      navigate('/');
      return;
    }

    if (!state.gameStarted) {
      dispatch({ type: 'START_GAME' });
    }
  }, [state.teams, state.selectedCategories, state.gameStarted, navigate, dispatch]);

  const handleCorrectGuess = () => {
    dispatch({ type: 'CORRECT_GUESS' });
    nextCard();
  };

  const handleSkip = () => {
    nextCard();
  };

  const nextCard = () => {
    dispatch({ type: 'NEXT_CARD' });
    setShowHint(false);
  };

  const handleTimeUp = () => {
    setGamePhase('timeup');
    setIsTimerActive(false);
  };

  const nextTurn = () => {
    dispatch({ type: 'NEXT_TURN' });
    setGamePhase('ready');
    setIsTimerActive(false);
    setShowHint(false);
    setRoundsPlayed(prev => prev + 1);

    // Check if game should end
    if (roundsPlayed >= state.gameSettings.rounds * state.teams.length) {
      navigate('/results');
    }
  };

  const startTurn = () => {
    setGamePhase('playing');
    setIsTimerActive(true);
  };

  const pauseGame = () => {
    setGamePhase('paused');
    setIsTimerActive(false);
  };

  const resumeGame = () => {
    setGamePhase('playing');
    setIsTimerActive(true);
  };

  const currentTeam = state.teams[state.currentTeamIndex];

  if (!state.currentCard || !currentTeam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-xl">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with scores */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex space-x-4">
            <motion.button
              onClick={() => navigate('/')}
              className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiHome} className="text-xl" />
            </motion.button>
            
            <motion.button
              onClick={gamePhase === 'playing' ? pauseGame : resumeGame}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiPause} className="text-xl" />
            </motion.button>
          </div>

          <div className="text-center">
            <p className="text-white/70 text-sm">Round {Math.floor(roundsPlayed / state.teams.length) + 1}</p>
            <p className="text-white font-medium">of {state.gameSettings.rounds}</p>
          </div>
        </motion.div>

        {/* Current team indicator */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">Current Turn:</h2>
          </div>
          <TeamCard
            team={currentTeam}
            isActive={true}
            onClick={() => {}}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Card */}
          <div className="space-y-6">
            {gamePhase === 'ready' ? (
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Act?</h3>
                <p className="text-white/80 mb-6">
                  {currentTeam.name}, get ready to act out your card!
                </p>
                <motion.button
                  onClick={startTurn}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Acting! 🚀
                </motion.button>
              </motion.div>
            ) : gamePhase === 'timeup' ? (
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-6xl mb-4">⏰</div>
                <h3 className="text-2xl font-bold text-white mb-4">Time's Up!</h3>
                <p className="text-white/80 mb-6">
                  The answer was: <strong>"{state.currentCard.text}"</strong>
                </p>
                <motion.button
                  onClick={nextTurn}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Team
                </motion.button>
              </motion.div>
            ) : gamePhase === 'paused' ? (
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-6xl mb-4">⏸️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Game Paused</h3>
                <motion.button
                  onClick={resumeGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume Game
                </motion.button>
              </motion.div>
            ) : (
              <GameCard
                card={state.currentCard}
                showHint={showHint}
                onToggleHint={() => setShowHint(!showHint)}
              />
            )}

            {/* Game Controls */}
            {gamePhase === 'playing' && (
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={handleCorrectGuess}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiCheck} className="text-xl" />
                  <span>Correct!</span>
                </motion.button>

                <motion.button
                  onClick={handleSkip}
                  className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiSkipForward} className="text-xl" />
                  <span>Skip</span>
                </motion.button>

                <motion.button
                  onClick={nextTurn}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiX} className="text-xl" />
                  <span>End Turn</span>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Timer and Team Scores */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <Timer
                duration={state.gameSettings.timeLimit}
                onTimeUp={handleTimeUp}
                isActive={isTimerActive}
                onToggle={setIsTimerActive}
                showControls={false}
              />
            </div>

            {/* All Teams Scores */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white text-center">Scoreboard</h3>
              {state.teams.map((team, index) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  isActive={index === state.currentTeamIndex}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;