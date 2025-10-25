import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FeatureCard = ({ icon, title, description, color, id }) => {
  const colorClasses = {
    'orange': 'bg-orange-500',
    'yellow': 'bg-yellow-500',
    'blue': 'bg-blue-500',
    'purple': 'bg-purple-500'
  };

  return (
    <article 
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
      data-testid={`feature-${id}`}
    >
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center text-white text-xl mb-4`} aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </article>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['orange', 'yellow', 'blue', 'purple']).isRequired,
  id: PropTypes.string.isRequired
};

export default memo(FeatureCard);
