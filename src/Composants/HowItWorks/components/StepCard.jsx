import React, { memo } from 'react';
import PropTypes from 'prop-types';

const StepCard = ({ 
  number, 
  title, 
  description, 
  icon, 
  color, 
  id,
  index,
  isActive = false,
  isCompleted = false,
  mousePosition = { x: 0, y: 0 },
  scrollProgress = 0
}) => {
  return (
    <div 
      className={`step-card ${color} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} 
      id={id}
      data-index={index}
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y,
        '--scroll-progress': scrollProgress,
        '--index': index
      }}
    >
      {/* Card Background */}
      <div className="card-background">
        <div className="bg-gradient"></div>
        <div className="bg-mesh"></div>
        <div className="bg-particles">
          <div className="bg-particle particle-1"></div>
          <div className="bg-particle particle-2"></div>
          <div className="bg-particle particle-3"></div>
        </div>
      </div>

      {/* Card Header */}
      <div className="card-header">
        <div className="header-icon">
          <div className={`icon-container ${color}`}>
            <div className="icon-background"></div>
            <div className="icon-content">
              {icon}
            </div>
            <div className="icon-aura"></div>
          </div>
        </div>
        
        <div className="header-content">
          <h3 className="card-title">
            {title.split('').map((char, i) => (
              <span 
                key={i} 
                className="title-char"
                style={{ '--char-delay': `${i * 0.03}s` }}
              >
                {char}
              </span>
            ))}
          </h3>
          <div className="card-subtitle">
            <span className="step-number">Étape {index + 1}</span>
            <div className="step-indicator">
              <div className="indicator-dot"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <p className="card-description">{description}</p>
        
        <div className="card-features">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <span>Rapide</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <span>Précis</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <span>Efficace</span>
          </div>
        </div>
      </div>

      {/* Card Effects */}
      <div className="card-effects">
        <div className="effect-glow"></div>
        <div className="effect-lines">
          <div className="effect-line line-1"></div>
          <div className="effect-line line-2"></div>
          <div className="effect-line line-3"></div>
        </div>
        <div className="effect-particles">
          <div className="effect-particle particle-1"></div>
          <div className="effect-particle particle-2"></div>
          <div className="effect-particle particle-3"></div>
          <div className="effect-particle particle-4"></div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="hover-overlay">
        <div className="overlay-glow"></div>
        <div className="overlay-pattern"></div>
      </div>

      {/* Status Indicator */}
      <div className="status-indicator">
        <div className="status-ring"></div>
        <div className="status-pulse"></div>
      </div>
    </div>
  );
};

StepCard.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isCompleted: PropTypes.bool,
  mousePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  scrollProgress: PropTypes.number
};

StepCard.defaultProps = {
  index: 0,
  isActive: false,
  isCompleted: false,
  mousePosition: { x: 0, y: 0 },
  scrollProgress: 0
};

export default memo(StepCard);