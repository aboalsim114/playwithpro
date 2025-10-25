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
    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3'
    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3';
  
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
