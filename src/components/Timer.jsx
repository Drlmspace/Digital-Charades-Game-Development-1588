import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiPlay, FiPause } = FiIcons;

function Timer({ 
  duration = 60, 
  onTimeUp, 
  isActive = false, 
  onToggle,
  showControls = true 
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    setIsRunning(isActive);
  }, [isActive]);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onTimeUp]);

  const handleToggle = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    onToggle?.(newState);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(false);
    onToggle?.(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / duration) * 100;

  const getTimerColor = () => {
    if (percentage > 60) return 'text-green-500';
    if (percentage > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = () => {
    if (percentage > 60) return 'stroke-green-500';
    if (percentage > 30) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <motion.div
          className="relative w-32 h-32"
          animate={{ scale: timeLeft <= 10 && isRunning ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1, repeat: timeLeft <= 10 && isRunning ? Infinity : 0 }}
        >
          {/* Background circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={getProgressColor()}
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <SafeIcon 
              icon={FiClock} 
              className={`text-2xl ${getTimerColor()} mb-1`}
            />
            <span className={`text-2xl font-bold ${getTimerColor()}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </div>

      {showControls && (
        <div className="flex space-x-3">
          <motion.button
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon 
              icon={isRunning ? FiPause : FiPlay} 
              className="inline mr-2" 
            />
            {isRunning ? 'Pause' : 'Start'}
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-200"
            onClick={resetTimer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Timer;