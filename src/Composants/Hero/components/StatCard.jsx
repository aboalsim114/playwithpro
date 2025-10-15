import React, { memo } from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ label, value, change, changeType, id }) => {
  return (
    <article 
      className="stat-card"
      data-testid={`stat-${id}`}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div 
        className={`stat-change ${changeType}`}
        aria-label={`Changement: ${change}`}
      >
        {change}
      </div>
    </article>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  changeType: PropTypes.oneOf(['positive', 'negative']).isRequired,
  id: PropTypes.string.isRequired
};

export default memo(StatCard);
