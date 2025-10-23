import React from 'react';
import { NAV_SECTIONS, SVG_ICONS } from '../constants';

const Sidebar = ({ 
  isMobileMenuOpen, 
  userType, 
  activeNav, 
  onNavClick, 
  onUserTypeChange 
}) => {
  const renderNavItem = (item) => (
    <button 
      key={item.id}
      className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
      onClick={() => onNavClick(item.id)}
    >
      <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {SVG_ICONS[item.icon]}
      </svg>
      <span className="nav-text">{item.label}</span>
    </button>
  );

  const renderNavSection = (section) => (
    <div key={section.title} className="nav-section">
      <div className="nav-section-title">{section.title}</div>
      {section.items.map(renderNavItem)}
    </div>
  );

  return (
    <aside 
      className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}
      aria-label="Navigation sidebar"
      role="complementary"
    >
      <div className="sidebar-header">
        <h2 className="sidebar-title">🎮 PLAY-WITH-PRO</h2>
        <div className="user-type-selector" role="tablist" aria-label="User type selection">
          <button 
            className={`user-type-btn ${userType === 'player' ? 'active' : ''}`}
            onClick={() => onUserTypeChange('player')}
            role="tab"
            aria-selected={userType === 'player'}
            aria-label="Switch to player mode"
          >
            👾 Player
          </button>
        </div>
      </div>
      
      <nav className="sidebar-nav" aria-label="Main navigation">
        {Object.values(NAV_SECTIONS).map(renderNavSection)}
      </nav>
      
      {/* Gaming Status Card */}
      <div className="help-card" role="region" aria-label="Quick actions">
        <div className="help-content">
          <svg className="help-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="help-text">Ready to play? Find your next match!</p>
        </div>
        <button className="help-button" aria-label="Find a match to play">
          FIND MATCH
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
