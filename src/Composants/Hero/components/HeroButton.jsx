import React, { memo } from 'react';
import PropTypes from 'prop-types';

const HeroButton = ({ 
  variant = 'primary', 
  children, 
  icon, 
  onClick, 
  type = 'button',
  'aria-label': ariaLabel,
  ...props 
}) => {
  const baseClasses = variant === 'primary' 
    ? 'liquid-glass-button-primary'
    : 'liquid-glass-button-secondary';
  
  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

HeroButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  'aria-label': PropTypes.string
};

HeroButton.defaultProps = {
  variant: 'primary',
  icon: null,
  onClick: null,
  type: 'button',
  'aria-label': null
};

export default memo(HeroButton);
