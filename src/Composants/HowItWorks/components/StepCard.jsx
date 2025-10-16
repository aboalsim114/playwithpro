import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Card background component with animated elements
 */
const CardBackground = memo(() => (
  <div className="card-background">
    <div className="bg-gradient" />
    <div className="bg-mesh" />
    <div className="bg-particles">
      <div className="bg-particle particle-1" />
      <div className="bg-particle particle-2" />
      <div className="bg-particle particle-3" />
    </div>
  </div>
));

/**
 * Icon container component
 */
const IconContainer = memo(({ color, icon }) => (
  <div className="header-icon">
    <div className={`icon-container ${color}`}>
      <div className="icon-background" />
      <div className="icon-content">
        {icon}
      </div>
      <div className="icon-aura" />
    </div>
  </div>
));

/**
 * Card header content component
 */
const CardHeaderContent = memo(({ title, index }) => (
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
        <div className="indicator-dot" />
      </div>
    </div>
  </div>
));

/**
 * Card features component
 */
const CardFeatures = memo(() => (
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
));

/**
 * Card effects component
 */
const CardEffects = memo(() => (
  <div className="card-effects">
    <div className="effect-glow" />
    <div className="effect-lines">
      <div className="effect-line line-1" />
      <div className="effect-line line-2" />
      <div className="effect-line line-3" />
    </div>
    <div className="effect-particles">
      <div className="effect-particle particle-1" />
      <div className="effect-particle particle-2" />
      <div className="effect-particle particle-3" />
      <div className="effect-particle particle-4" />
    </div>
  </div>
));

/**
 * Hover overlay component
 */
const HoverOverlay = memo(() => (
  <div className="hover-overlay">
    <div className="overlay-glow" />
    <div className="overlay-pattern" />
  </div>
));

/**
 * Status indicator component
 */
const StatusIndicator = memo(() => (
  <div className="status-indicator">
    <div className="status-ring" />
    <div className="status-pulse" />
  </div>
));

/**
 * StepCard component - displays individual step information with animations
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
      <CardBackground />
      
      <div className="card-header">
        <IconContainer color={color} icon={icon} />
        <CardHeaderContent title={title} index={index} />
      </div>

      <div className="card-body">
        <p className="card-description">{description}</p>
        <CardFeatures />
      </div>

      <CardEffects />
      <HoverOverlay />
      <StatusIndicator />
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