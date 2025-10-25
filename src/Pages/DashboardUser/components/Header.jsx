import React from 'react';
import { GAMES } from '../constants';

const Header = ({ 
  userType, 
  currentGame, 
  isGameDropdownOpen, 
  onGameDropdownToggle, 
  onGameSelect 
}) => {
  const getBreadcrumbText = () => {
    const typeMap = {
      player: 'Player Dashboard',
      pro: 'Pro Dashboard',
      streamer: 'Streamer Dashboard'
    };
    return `Gaming / ${typeMap[userType] || 'Dashboard'}`;
  };

  const renderGameOption = (gameKey, game) => (
    <div 
      key={gameKey}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors" 
      onClick={() => onGameSelect(gameKey)}
    >
      <span className="text-lg">{game.emoji}</span>
      <span className="text-sm font-medium text-gray-700">{game.fullName}</span>
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4" role="banner">
      <div className="flex items-center justify-between">
        <nav aria-label="Breadcrumb">
          <div className="text-sm text-gray-600">{getBreadcrumbText()}</div>
        </nav>
        
        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
          <div className="relative flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" strokeWidth="2.5"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Search players, pros, or games..." 
                aria-label="Search players, pros, or games"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                <button 
                  className="p-1 text-gray-400 hover:text-gray-600" 
                  title="Filters"
                  aria-label="Open search filters"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button 
                  className="p-1 text-gray-400 hover:text-gray-600" 
                  title="Clear"
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={onGameDropdownToggle}
                aria-expanded={isGameDropdownOpen}
                aria-haspopup="listbox"
                aria-label={`Current game: ${currentGame}. Click to change game.`}
              >
                <span className="text-lg" aria-hidden="true">
                  {GAMES[currentGame]?.emoji}
                </span>
                <span className="font-medium">{currentGame}</span>
                <svg className={`w-4 h-4 transition-transform ${isGameDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isGameDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  role="listbox"
                  aria-label="Select a game"
                >
                  {Object.entries(GAMES).map(([key, game]) => renderGameOption(key, game))}
                </div>
              )}
            </div>
          </div>
        
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Notifications">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold cursor-pointer hover:bg-blue-700 transition-colors" role="button" tabIndex="0" aria-label="User profile">MJ</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
