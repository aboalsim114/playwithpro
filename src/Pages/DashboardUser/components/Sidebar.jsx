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
      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
        activeNav === item.id 
          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
      onClick={() => onNavClick(item.id)}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {SVG_ICONS[item.icon]}
      </svg>
      <span className="font-medium">{item.label}</span>
    </button>
  );

  const renderNavSection = (section) => (
    <div key={section.title} className="mb-6">
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.title}</div>
      <div className="space-y-1">
        {section.items.map(renderNavItem)}
      </div>
    </div>
  );

  return (
    <aside 
      className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-40 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
      aria-label="Navigation sidebar"
      role="complementary"
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎮 PLAY-WITH-PRO</h2>
          <div className="flex" role="tablist" aria-label="User type selection">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                userType === 'player' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => onUserTypeChange('player')}
              role="tab"
              aria-selected={userType === 'player'}
              aria-label="Switch to player mode"
            >
              👾 Player
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto" aria-label="Main navigation">
          {Object.values(NAV_SECTIONS).map(renderNavSection)}
        </nav>
        
        {/* Gaming Status Card */}
        <div className="p-4 border-t border-gray-200" role="region" aria-label="Quick actions">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm font-medium">Ready to play? Find your next match!</p>
            </div>
            <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors" aria-label="Find a match to play">
              FIND MATCH
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
