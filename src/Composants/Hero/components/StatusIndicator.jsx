import React, { memo } from 'react';
import PropTypes from 'prop-types';

const StatusIndicator = ({ type, color, icon, text, id }) => {
  const renderIndicator = () => {
    if (type === 'dot') {
      return <div className={`status-dot ${color}`} aria-hidden="true" />;
    }
    if (type === 'icon') {
      return <div className="status-icon" aria-hidden="true">{icon}</div>;
    }
    return null;
  };

  return (
    <div 
      className="status-badge" 
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
