import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiUsers, FiSettings } = FiIcons;

function Home() {
  const { state } = useGame();

  const menuItems = [
    {
      title: 'Start New Game',
      description: 'Begin a fresh charades adventure',
      icon: FiPlay,
      link: '/team-setup',
      color: 'from-green-400 to-blue-500',
      primary: true
    },
    {
      title: 'Game Settings',
      description: 'Configure your game experience',
      icon: FiSettings,
      link: '/admin/login',
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${state.adminSettings.primaryColor}`}>
      <motion.div
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-8xl mb-4"
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {state.adminSettings.gameIcon}
        </motion.div>
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {state.adminSettings.gameTitle}
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {state.adminSettings.gameDescription}
        </p>
      </motion.div>

      <div className="grid gap-6 w-full max-w-4xl">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={item.link}>
              <motion.div
                className={`relative p-8 rounded-3xl bg-gradient-to-r ${item.color} text-white shadow-2xl cursor-pointer overflow-hidden ${
                  item.primary ? 'transform scale-105' : ''
                }`}
                whileHover={{ scale: item.primary ? 1.08 : 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex items-center">
                  <div className="bg-white/20 rounded-2xl p-4 mr-6">
                    <SafeIcon icon={item.icon} className="text-4xl" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                    <p className="text-white/90 text-lg">{item.description}</p>
                  </div>
                  {item.primary && (
                    <motion.div
                      className="ml-4"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <div className="text-4xl">🚀</div>
                    </motion.div>
                  )}
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Admin Access Link */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="/admin/login"
          className="text-white/50 hover:text-white/80 text-sm transition-colors"
        >
          Administrator Access
        </Link>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-white/70 mb-4">Ready to have some fun?</p>
        <div className="flex justify-center space-x-4 text-2xl">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          >
            🎉
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            🎊
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          >
            🥳
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;