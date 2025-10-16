import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Modern card background component
 */
const CardBackground = memo(() => (
  <div className="card-background">
    <div className="bg-gradient" />
    <div className="bg-pattern" />
  </div>
));

/**
 * Modern icon container component
 */
const IconContainer = memo(({ color, icon }) => (
  <div className="icon-wrapper">
    <div className={`icon-container ${color}`}>
      <div className="icon-content">
        {icon}
      </div>
      <div className="icon-glow" />
    </div>
  </div>
));

/**
 * Modern card header content component
 */
const CardHeaderContent = memo(({ title, index }) => (
  <div className="header-content">
    <h3 className="card-title">
      {title}
    </h3>
    <div className="card-subtitle">
      <span className="step-label">Étape {index + 1}</span>
    </div>
  </div>
));

/**
 * Modern card features component
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
 * Modern card effects component
 */
const CardEffects = memo(() => (
  <div className="card-effects">
    <div className="effect-ripple" />
    <div className="effect-particles">
      <div className="effect-particle" />
      <div className="effect-particle" />
      <div className="effect-particle" />
    </div>
  </div>
));

/**
 * Modern StepCard component - displays individual step information with clean design
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
      className={`modern-step-card ${color} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} 
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