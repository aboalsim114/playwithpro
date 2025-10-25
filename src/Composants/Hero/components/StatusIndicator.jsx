import React, { memo } from 'react';
import PropTypes from 'prop-types';

const StatusIndicator = ({ type, color, icon, text, id }) => {
  const renderIndicator = () => {
    if (type === 'dot') {
      const colorClasses = {
        'green': 'bg-green-500',
        'red': 'bg-red-500',
        'yellow': 'bg-yellow-500',
        'blue': 'bg-blue-500'
      };
      return <div className={`w-3 h-3 rounded-full ${colorClasses[color] || 'bg-gray-500'} animate-pulse`} aria-hidden="true" />;
    }
    if (type === 'icon') {
      return <div className="text-lg" aria-hidden="true">{icon}</div>;
    }
    return null;
  };

  return (
    <div 
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium" 
      role="status" 
      aria-label={text}
      data-testid={`status-${id}`}
    >
      {renderIndicator()}
      <span>{text}</span>
    </div>
  );
};

StatusIndicator.propTypes = {
  type: PropTypes.oneOf(['dot', 'icon']).isRequired,
  color: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

StatusIndicator.defaultProps = {
  color: null,
  icon: null
};

export default memo(StatusIndicator);
