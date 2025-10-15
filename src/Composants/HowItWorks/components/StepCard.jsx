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
  mousePosition = { x: 0, y: 0 }
}) => {
  return (
    <div 
      className={`step-card ${color} ${isActive ? 'active' : ''}`} 
      id={id}
      data-index={index}
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y,
        '--index': index
      }}
    >
      {/* Card Background Effects */}
      <div className="card-background">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
        <div className="bg-glow"></div>
      </div>

      {/* Step Number */}
      <div className="step-number">
        <span className="number-text">{index + 1}</span>
        <div className="number-ring"></div>
        <div className="number-pulse"></div>
      </div>
      
      {/* Step Icon */}
      <div className={`step-icon ${color}`}>
        <div className="icon-background"></div>
        <div className="icon-content">
          {icon}
        </div>
        <div className="icon-rings">
          <div className="icon-ring ring-1"></div>
          <div className="icon-ring ring-2"></div>
        </div>
        <div className="icon-glow"></div>
      </div>
      
      {/* Step Content */}
      <div className="step-content">
        <h3 className="step-title">
          {title.split('').map((char, i) => (
            <span 
              key={i} 
              className="title-char"
              style={{ '--char-delay': `${i * 0.02}s` }}
            >
              {char}
            </span>
          ))}
        </h3>
        <p className="step-description">{description}</p>
      </div>
      
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="indicator-dot"></div>
        <div className="indicator-pulse"></div>
      </div>

      {/* Hover Effects */}
      <div className="hover-effects">
        <div className="hover-glow"></div>
        <div className="hover-particles">
          <div className="hover-particle particle-1"></div>
          <div className="hover-particle particle-2"></div>
          <div className="hover-particle particle-3"></div>
        </div>
      </div>

      {/* Border Animation */}
      <div className="border-animation">
        <div className="border-segment segment-1"></div>
        <div className="border-segment segment-2"></div>
        <div className="border-segment segment-3"></div>
        <div className="border-segment segment-4"></div>
      </div>

      {/* Energy Field */}
      <div className="energy-field">
        <div className="energy-line line-1"></div>
        <div className="energy-line line-2"></div>
        <div className="energy-line line-3"></div>
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
  mousePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};

StepCard.defaultProps = {
  index: 0,
  isActive: false,
  mousePosition: { x: 0, y: 0 }
};

export default memo(StepCard);