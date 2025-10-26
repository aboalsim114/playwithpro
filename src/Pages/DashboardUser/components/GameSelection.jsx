import React, { useState } from 'react';

const GameSelection = () => {
  const [activeFilter, setActiveFilter] = useState('most-popular');

  const filterTabs = [
    { id: 'most-popular', label: 'Most popular' },
    { id: 'most-action', label: 'Most action' },
    { id: 'hot-as-hell', label: 'Hot as hell' },
    { id: 'cold-as-ice', label: 'Cold as ice' }
  ];

  const gameCards = [
    { id: 1, name: 'Old Wizard', image: '🧙‍♂️', hasTrophy: true },
    { id: 2, name: 'Skull Warrior', image: '💀', hasLock: false },
    { id: 3, name: 'Gas Mask', image: '🛡️', hasTrophy: false },
    { id: 4, name: 'Cowboy Girl', image: '🤠', hasLock: false },
    { id: 5, name: 'Red Beard', image: '🧔', hasTrophy: false },
    { id: 6, name: 'Bald Warrior', image: '💪', hasLock: false },
    { id: 7, name: 'Bat Eye', image: '👁️', hasTrophy: false },
    { id: 8, name: 'Scarred Cowboy', image: '🤠', hasLock: false },
    { id: 9, name: 'Dark Witch', image: '🧙‍♀️', hasTrophy: false },
    { id: 10, name: 'Skeleton Hood', image: '💀', hasLock: false },
    { id: 11, name: 'Blue Hair', image: '💙', hasTrophy: false },
    { id: 12, name: 'Zombie', image: '🧟', hasLock: false },
    { id: 13, name: 'TNT Guy', image: '💣', hasTrophy: false },
    { id: 14, name: 'Uncle Sam', image: '👴', hasLock: false },
    { id: 15, name: 'Mystery Card', image: '❓', hasTrophy: false }
  ];

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Choose game</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-sm">
            <span>See all</span>
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
            className="relative bg-gray-700 hover:bg-gray-600 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <div className="aspect-square flex items-center justify-center text-4xl mb-1">
              {game.image}
            </div>
            
            {/* Status Icons */}
            {game.hasTrophy && (
              <div className="absolute bottom-1.5 left-1.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            )}
            
            {game.hasLock && (
              <div className="absolute bottom-1.5 left-1.5 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
            )}
            
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
