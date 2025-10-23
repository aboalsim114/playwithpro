import React from 'react';

const MobileMenuToggle = ({ onToggle }) => (
  <button 
    className="mobile-menu-toggle"
    onClick={onToggle}
    aria-label="Toggle mobile menu"
  >
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

export default MobileMenuToggle;
