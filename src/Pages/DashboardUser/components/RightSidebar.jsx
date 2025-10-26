import React, { useState } from 'react';

const WinnersWidget = () => {
  const [activeTab, setActiveTab] = useState('live');

  const winners = [
    { id: 1, game: 'Duck Hunters', amount: '€4 187.53', time: '3 min ago', avatar: '🦆' },
    { id: 2, game: 'Apocalypse Super', amount: '€2 543.21', time: '7 min ago', avatar: '☢️' },
    { id: 3, game: 'Magic Forest', amount: '€1 876.90', time: '12 min ago', avatar: '🌲' },
    { id: 4, game: 'Space Odyssey', amount: '€3 234.56', time: '18 min ago', avatar: '🚀' },
    { id: 5, game: 'Dragon Quest', amount: '€5 678.12', time: '25 min ago', avatar: '🐉' }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Winners</h3>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab('live')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'live'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Live
        </button>
        <button
          onClick={() => setActiveTab('paused')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'paused'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Paused
        </button>
      </div>

      {/* Winners List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {winners.map((winner) => (
          <div key={winner.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs">
              {winner.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{winner.game}</div>
              <div className="text-gray-400 text-xs">{winner.time}</div>
            </div>
            <div className="text-white font-bold text-xs">{winner.amount}</div>
            <div className="flex gap-1">
              <button className="w-5 h-5 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button className="w-5 h-5 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentsWidget = () => {
  const [activeTab, setActiveTab] = useState('new');

  const comments = [
    { 
      id: 1, 
      user: 'Rio777', 
      time: '39 sec ago', 
      text: '@tiger_nolimit I don\'t think so. The higher the bet, and the higher bonuses. It\'s EA PokerStar...',
      isAdmin: false,
      isYou: false
    },
    { 
      id: 2, 
      user: 'Admin', 
      time: '2 min ago', 
      text: 'Welcome to our new tournament! Good luck everyone!',
      isAdmin: true,
      isYou: false
    },
    { 
      id: 3, 
      user: 'You', 
      time: '5 min ago', 
      text: 'This game is amazing! Can\'t wait to play more.',
      isAdmin: false,
      isYou: true
    }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Comments</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab('new')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'new'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          New
        </button>
        <button
          onClick={() => setActiveTab('hot')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'hot'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Hot
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white">
                {comment.user.charAt(0)}
              </div>
              <span className="text-white text-xs font-medium">{comment.user}</span>
              {comment.isAdmin && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">Admin</span>
              )}
              {comment.isYou && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">You</span>
              )}
              <span className="text-gray-400 text-xs">{comment.time}</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RightSidebar = () => {
  return (
    <div className="w-full">
      <WinnersWidget />
      <CommentsWidget />
    </div>
  );
};

export default RightSidebar;
