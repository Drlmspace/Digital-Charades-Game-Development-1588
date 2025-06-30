import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import TeamCard from '../components/TeamCard';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiTrash2, FiArrowLeft, FiArrowRight, FiUsers } = FiIcons;

const teamColors = [
  'from-red-400 to-pink-500',
  'from-blue-400 to-purple-500',
  'from-green-400 to-teal-500',
  'from-yellow-400 to-orange-500',
  'from-purple-400 to-indigo-500',
  'from-pink-400 to-red-500',
  'from-indigo-400 to-blue-500',
  'from-teal-400 to-green-500'
];

function TeamSetup() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team Awesome', players: ['Player 1'], score: 0, color: teamColors[0] },
    { id: 2, name: 'Team Fantastic', players: ['Player 2'], score: 0, color: teamColors[1] }
  ]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const addTeam = () => {
    if (newTeamName.trim() && teams.length < 8) {
      const newTeam = {
        id: Date.now(),
        name: newTeamName.trim(),
        players: [],
        score: 0,
        color: teamColors[teams.length % teamColors.length]
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
    }
  };

  const removeTeam = (teamId) => {
    if (teams.length > 2) {
      setTeams(teams.filter(team => team.id !== teamId));
      if (selectedTeamId === teamId) {
        setSelectedTeamId(null);
      }
    }
  };

  const addPlayer = () => {
    if (newPlayerName.trim() && selectedTeamId) {
      setTeams(teams.map(team => 
        team.id === selectedTeamId 
          ? { ...team, players: [...team.players, newPlayerName.trim()] }
          : team
      ));
      setNewPlayerName('');
    }
  };

  const removePlayer = (teamId, playerIndex) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, players: team.players.filter((_, index) => index !== playerIndex) }
        : team
    ));
  };

  const updateTeamName = (teamId, newName) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, name: newName }
        : team
    ));
  };

  const proceedToCategories = () => {
    const validTeams = teams.filter(team => team.players.length > 0);
    if (validTeams.length >= 2) {
      dispatch({ type: 'SET_TEAMS', payload: validTeams });
      navigate('/categories');
    }
  };

  const canProceed = teams.filter(team => team.players.length > 0).length >= 2;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Setup Your Teams</h1>
          <p className="text-white/80 text-lg">Create teams and add players to get started</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Teams List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <SafeIcon icon={FiUsers} className="mr-3" />
                Teams ({teams.length})
              </h2>
              
              {teams.length < 8 && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTeam()}
                    className="px-4 py-2 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <motion.button
                    onClick={addTeam}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiPlus} className="text-xl" />
                  </motion.button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  className="relative"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeamCard
                    team={team}
                    isActive={selectedTeamId === team.id}
                    onClick={() => setSelectedTeamId(team.id)}
                    showScore={false}
                  />
                  
                  {teams.length > 2 && (
                    <motion.button
                      onClick={() => removeTeam(team.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiTrash2} className="text-sm" />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Editor */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
            {selectedTeamId ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Edit {teams.find(t => t.id === selectedTeamId)?.name}
                </h3>

                {/* Edit team name */}
                <div>
                  <label className="block text-white/80 mb-2">Team Name</label>
                  <input
                    type="text"
                    value={teams.find(t => t.id === selectedTeamId)?.name || ''}
                    onChange={(e) => updateTeamName(selectedTeamId, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                {/* Add players */}
                <div>
                  <label className="block text-white/80 mb-2">Add Player</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Player name"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                      className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <motion.button
                      onClick={addPlayer}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiPlus} />
                    </motion.button>
                  </div>
                </div>

                {/* Players list */}
                <div>
                  <label className="block text-white/80 mb-2">
                    Players ({teams.find(t => t.id === selectedTeamId)?.players.length || 0})
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {teams.find(t => t.id === selectedTeamId)?.players.map((player, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between bg-white/20 rounded-xl p-3"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-white font-medium">{player}</span>
                        <motion.button
                          onClick={() => removePlayer(selectedTeamId, index)}
                          className="text-red-300 hover:text-red-200 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SafeIcon icon={FiTrash2} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-white/60 py-12">
                <SafeIcon icon={FiUsers} className="text-6xl mx-auto mb-4 opacity-50" />
                <p className="text-xl">Select a team to edit</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between items-center mt-8"
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
            <span>Back</span>
          </motion.button>

          <motion.button
            onClick={proceedToCategories}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all ${
              canProceed
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
          >
            <span>Choose Categories</span>
            <SafeIcon icon={FiArrowRight} />
          </motion.button>
        </motion.div>

        {!canProceed && (
          <motion.p
            className="text-center text-yellow-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ You need at least 2 teams with players to continue
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default TeamSetup;