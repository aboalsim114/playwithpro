import React, { useState } from 'react';

const GameSelection = () => {
  const [activeFilter, setActiveFilter] = useState('most-popular');

  const filterTabs = [
    { id: 'most-popular', label: 'Plus populaires' },
    { id: 'most-action', label: 'Plus d\'action' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'matches', label: 'Matchs' }
  ];

  const gameCards = [
    { id: 1, name: 'CS2', image: '🔫', fullName: 'Counter-Strike 2', prosOnline: 12, hasTrophy: true },
    { id: 2, name: 'Valorant', image: '🎯', fullName: 'Valorant', prosOnline: 8, hasTrophy: false },
    { id: 3, name: 'LoL', image: '⚔️', fullName: 'League of Legends', prosOnline: 15, hasTrophy: true },
    { id: 4, name: 'Fortnite', image: '🏗️', fullName: 'Fortnite', prosOnline: 6, hasTrophy: false },
    { id: 5, name: 'Apex', image: '🚀', fullName: 'Apex Legends', prosOnline: 9, hasTrophy: false },
    { id: 6, name: 'FIFA', image: '⚽', fullName: 'FIFA', prosOnline: 4, hasTrophy: false },
    { id: 7, name: 'COD', image: '💥', fullName: 'Call of Duty', prosOnline: 7, hasTrophy: true },
    { id: 8, name: 'Rocket League', image: '🚗', fullName: 'Rocket League', prosOnline: 3, hasTrophy: false },
    { id: 9, name: 'Overwatch', image: '🛡️', fullName: 'Overwatch 2', prosOnline: 5, hasTrophy: false },
    { id: 10, name: 'Dota 2', image: '🗡️', fullName: 'Dota 2', prosOnline: 11, hasTrophy: true },
    { id: 11, name: 'Rainbow Six', image: '🔍', fullName: 'Rainbow Six Siege', prosOnline: 6, hasTrophy: false },
    { id: 12, name: 'PUBG', image: '🎯', fullName: 'PUBG', prosOnline: 4, hasTrophy: false },
    { id: 13, name: 'Minecraft', image: '🧱', fullName: 'Minecraft', prosOnline: 2, hasTrophy: false },
    { id: 14, name: 'Among Us', image: '👥', fullName: 'Among Us', prosOnline: 1, hasTrophy: false },
    { id: 15, name: 'Fall Guys', image: '🟡', fullName: 'Fall Guys', prosOnline: 3, hasTrophy: false }
  ];

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Choisir un jeu</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtres
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-sm">
            <span>Voir tous</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
              activeFilter === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-5 gap-3">
        {gameCards.map((game) => (
          <div
            key={game.id}
            className="relative bg-gray-700 hover:bg-gray-600 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
          >
            <div className="aspect-square flex items-center justify-center text-4xl mb-1">
              {game.image}
            </div>
            
            {/* Game Name */}
            <div className="text-center mb-1">
              <div className="text-white text-xs font-medium">{game.name}</div>
              <div className="text-gray-400 text-xs">{game.prosOnline} pros</div>
            </div>
            
            {/* Status Icons */}
            {game.hasTrophy && (
              <div className="absolute bottom-1.5 left-1.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            )}
            
            {/* Online Indicator */}
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
