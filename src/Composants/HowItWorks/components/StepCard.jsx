import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Gaming-themed card background component
 */
const CardBackground = memo(() => (
  <div className="card-background">
    <div className="bg-gradient" />
    <div className="bg-pattern" />
    <div className="gaming-glow" />
  </div>
));

/**
 * Gaming-themed icon container component
 */
const IconContainer = memo(({ color, icon }) => (
  <div className="icon-wrapper">
    <div className={`icon-container gaming-icon ${color}`}>
      <div className="icon-content">
        {icon}
      </div>
      <div className="icon-glow gaming-glow" />
      <div className="icon-particles">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="particle" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  </div>
));

/**
 * Gaming-themed card header content component
 */
const CardHeaderContent = memo(({ title, index }) => (
  <div className="header-content">
    <h3 className="card-title gaming-title">
      {title}
    </h3>
    <div className="card-subtitle">
      <span className="step-label gaming-step">MISSION {index + 1}</span>
    </div>
  </div>
));

/**
 * Gaming-themed card features component
 */
const CardFeatures = memo(() => (
  <div className="card-features gaming-features">
    <div className="feature-item gaming-feature">
      <div className="feature-icon">⚡</div>
      <span>RAPIDE</span>
    </div>
    <div className="feature-item gaming-feature">
      <div className="feature-icon">🎯</div>
      <span>PRÉCIS</span>
    </div>
    <div className="feature-item gaming-feature">
      <div className="feature-icon">🔥</div>
      <span>INTENSE</span>
    </div>
  </div>
));

/**
 * Gaming-themed card effects component
 */
const CardEffects = memo(() => (
  <div className="card-effects gaming-effects">
    <div className="effect-ripple gaming-ripple" />
    <div className="effect-particles gaming-particles">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="effect-particle gaming-particle" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
    <div className="gaming-scanlines">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="scanline" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </div>
  </div>
));

/**
 * Gaming-themed StepCard component - displays individual step information with gaming design
 * @param {Object} props - Component props
 * @param {string} props.number - Step number emoji
 * @param {string} props.title - Step title
 * @param {string} props.description - Step description
 * @param {JSX.Element} props.icon - Step icon
 * @param {string} props.color - Step color theme
 * @param {string} props.id - Step unique identifier
 * @param {number} props.index - Step index
 * @param {boolean} props.isActive - Whether step is currently active
 * @param {boolean} props.isCompleted - Whether step is completed
 * @param {Object} props.mousePosition - Mouse position for effects
 * @param {number} props.scrollProgress - Scroll progress for animations
 */
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
      className={`gaming-step-card ${color} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} 
      id={id}
      data-index={index}
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y,
        '--scroll-progress': scrollProgress,
        '--index': index
      }}
    >
      <CardBackground />
      
      <div className="card-header gaming-header">
        <IconContainer color={color} icon={icon} />
        <CardHeaderContent title={title} index={index} />
      </div>

      <div className="card-body gaming-body">
        <p className="card-description gaming-description">{description}</p>
        <CardFeatures />
      </div>

      <CardEffects />
    </div>
  );
};

// PropTypes for sub-components
IconContainer.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

CardHeaderContent.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

// Main component PropTypes
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