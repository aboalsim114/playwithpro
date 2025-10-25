import React, { memo } from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ label, value, change, changeType, id }) => {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';
  
  return (
    <article 
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
      data-testid={`stat-${id}`}
    >
      <div className="text-gray-300 text-sm font-medium mb-2">{label}</div>
      <div className="text-white text-3xl font-bold mb-2">{value}</div>
      <div 
        className={`text-sm font-medium ${changeColor}`}
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
