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
      className="game-option" 
      onClick={() => onGameSelect(gameKey)}
    >
      <span className="game-emoji">{game.emoji}</span>
      <span className="game-text">{game.fullName}</span>
    </div>
  );

  return (
    <header className="dashboard-header" role="banner">
      <nav aria-label="Breadcrumb">
        <div className="breadcrumb">{getBreadcrumbText()}</div>
      </nav>
      
      <div className="search-bar" role="search">
        <div className="search-container">
          <div className="search-icon-wrapper">
            <div className="search-icon-container">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" strokeWidth="2.5"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m21 21-4.35-4.35"/>
                <circle cx="11" cy="11" r="3" fill="currentColor" opacity="0.3"/>
              </svg>
              <div className="search-icon-glow"></div>
            </div>
          </div>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search players, pros, or games..." 
            aria-label="Search players, pros, or games"
          />
          <div className="search-actions">
            <button 
              className="search-filter-btn" 
              title="Filters"
              aria-label="Open search filters"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <button 
              className="search-clear-btn" 
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
      
      <div className="header-actions">
        <div className="game-selector">
          <div className="game-dropdown">
            <button 
              className="game-dropdown-trigger"
              onClick={onGameDropdownToggle}
              aria-expanded={isGameDropdownOpen}
              aria-haspopup="listbox"
              aria-label={`Current game: ${currentGame}. Click to change game.`}
            >
              <div className="game-current">
                <span className="game-emoji" aria-hidden="true">
                  {GAMES[currentGame]?.emoji}
                </span>
                <span className="game-name">{currentGame}</span>
              </div>
              <svg className={`dropdown-arrow ${isGameDropdownOpen ? 'open' : ''}`} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`game-dropdown-menu ${isGameDropdownOpen ? 'open' : ''}`}
              role="listbox"
              aria-label="Select a game"
            >
              {Object.entries(GAMES).map(([key, game]) => renderGameOption(key, game))}
            </div>
          </div>
        </div>
      
        <button className="header-icon" aria-label="Notifications">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
          </svg>
        </button>
        <div className="user-avatar" role="button" tabIndex="0" aria-label="User profile">MJ</div>
      </div>
    </header>
  );
};

export default Header;
