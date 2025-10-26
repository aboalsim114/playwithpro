import React, { useState } from 'react';

const WinnersWidget = () => {
  const [activeTab, setActiveTab] = useState('live');

  const recentMatches = [
    { id: 1, player: 'ProGamer_CS2', game: 'CS2', duration: '30min', rating: '5.0', time: '3 min ago', avatar: '🔫' },
    { id: 2, player: 'ValorantPro', game: 'Valorant', duration: '1h', rating: '4.8', time: '7 min ago', avatar: '🎯' },
    { id: 3, player: 'LoL_Master', game: 'LoL', duration: '45min', rating: '4.9', time: '12 min ago', avatar: '⚔️' },
    { id: 4, player: 'FortniteKing', game: 'Fortnite', duration: '15min', rating: '4.7', time: '18 min ago', avatar: '🏗️' },
    { id: 5, player: 'ApexLegend', game: 'Apex', duration: '1h', rating: '5.0', time: '25 min ago', avatar: '🚀' }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Sessions récentes</h3>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
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
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          En direct
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Terminées
        </button>
      </div>

      {/* Recent Matches List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {recentMatches.map((match) => (
          <div key={match.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs">
              {match.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{match.player}</div>
              <div className="text-gray-400 text-xs">{match.game} • {match.duration}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-yellow-400 text-xs">⭐ {match.rating}</div>
              <div className="flex gap-1">
                <button className="w-5 h-5 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-2.5 h-2.5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button className="w-5 h-5 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentsWidget = () => {
  const [activeTab, setActiveTab] = useState('new');

  const chatMessages = [
    { 
      id: 1, 
      user: 'Player123', 
      time: '39 sec ago', 
      text: 'Super session avec ProGamer_CS2 ! J\'ai appris énormément en 30min',
      isPro: false,
      isYou: false
    },
    { 
      id: 2, 
      user: 'ProGamer_CS2', 
      time: '2 min ago', 
      text: 'Merci pour la session ! N\'hésitez pas à réserver pour du coaching avancé.',
      isPro: true,
      isYou: false
    },
    { 
      id: 3, 
      user: 'Vous', 
      time: '5 min ago', 
      text: 'Quelqu\'un connaît un bon coach pour Valorant ?',
      isPro: false,
      isYou: true
    },
    { 
      id: 4, 
      user: 'ValorantPro', 
      time: '8 min ago', 
      text: 'Je suis disponible pour du coaching Valorant ! Disponible maintenant.',
      isPro: true,
      isYou: false
    }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Chat communautaire</h3>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs">En ligne</span>
        </div>
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
          Nouveau
        </button>
        <button
          onClick={() => setActiveTab('hot')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'hot'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Populaire
        </button>
      </div>

      {/* Chat Messages */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {chatMessages.map((message) => (
          <div key={message.id} className="bg-gray-700 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white">
                {message.user.charAt(0)}
              </div>
              <span className="text-white text-xs font-medium">{message.user}</span>
              {message.isPro && (
                <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded font-bold">PRO</span>
              )}
              {message.isYou && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">Vous</span>
              )}
              <span className="text-gray-400 text-xs">{message.time}</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{message.text}</p>
          </div>
        ))}
      </div>
      
      {/* Chat Input */}
      <div className="mt-3 flex gap-2">
        <input 
          type="text" 
          placeholder="Écrire un message..." 
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors">
          Envoyer
        </button>
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
