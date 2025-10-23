import React from 'react';

const GamingProSection = () => {
  const renderGamingBackground = () => (
    <div className="gaming-background">
      <div className="cyber-grid"></div>
      <div className="neon-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      <div className="energy-waves">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`wave wave-${i + 1}`}></div>
        ))}
      </div>
      <div className="holographic-lines">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`line line-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="content-column">
      <div className="gaming-pro-section">
        {renderGamingBackground()}
      </div>
    </div>
  );
};

export default GamingProSection;
