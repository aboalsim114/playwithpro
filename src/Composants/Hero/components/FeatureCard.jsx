import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FeatureCard = ({ icon, title, description, color, id }) => {
  return (
    <article 
      className="feature-card"
      data-testid={`feature-${id}`}
    >
      <div className={`feature-icon ${color}`} aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
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
