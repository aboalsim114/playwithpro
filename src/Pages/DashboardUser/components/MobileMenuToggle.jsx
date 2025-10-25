import React from 'react';

const MobileMenuToggle = ({ onToggle }) => (
  <button 
    className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    onClick={onToggle}
    aria-label="Toggle mobile menu"
  >
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

export default MobileMenuToggle;
