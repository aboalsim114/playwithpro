import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileTopBar = ({ userData }) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/user/1');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
      {/* User Profile Section */}
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={handleAvatarClick}
        >
          <span className="text-white font-bold">
            {userData?.username?.charAt(0) || 'U'}
          </span>
        </div>
        <div>
          <div className="text-white font-medium">{userData?.fullName || 'Utilisateur'}</div>
          <div className="text-gray-400 text-sm">Niveau {userData?.level || 1} • {userData?.stats?.gamesPlayed || 0} matchs</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Rechercher des joueurs..." 
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 pr-10 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default ProfileTopBar;
