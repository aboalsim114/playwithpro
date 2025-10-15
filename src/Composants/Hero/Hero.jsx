import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Hero.css';

// Import components
import { StatusIndicator, FeatureCard, StatCard, HeroButton } from './components';

// Import constants
import { 
  HERO_CONTENT, 
  STATUS_INDICATORS, 
  FEATURE_CARDS, 
  STATISTICS, 
  SVG_ICONS 
} from './constants';

const Hero = ({ onPlayClick, onExploreClick }) => {
  const handlePlayClick = () => {
    if (onPlayClick) {
      onPlayClick();
    }
  };

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    }
  };

  return (
    <section className="hero-section" id="home" role="banner">
      <div className="hero-container">
        {/* Status Indicators */}
        <div className="status-indicators" aria-label="Statut du serveur">
          {STATUS_INDICATORS.map((indicator) => (
            <StatusIndicator
              key={indicator.id}
              type={indicator.type}
              color={indicator.color}
              icon={indicator.icon}
              text={indicator.text}
              id={indicator.id}
            />
          ))}
        </div>

        {/* Hero Title Section */}
        <header className="hero-title-section">
          <h1 className="hero-title">
            <span className="title-text">{HERO_CONTENT.title.text}</span>
            <span className="title-gradient">{HERO_CONTENT.title.gradient}</span>
          </h1>
          <p className="hero-description">
            {HERO_CONTENT.description}
          </p>
          <div className="hero-buttons" role="group" aria-label="Actions principales">
            <HeroButton
              variant="primary"
              icon={SVG_ICONS.play}
              onClick={handlePlayClick}
              aria-label="Commencer à jouer maintenant"
            >
              {HERO_CONTENT.buttons.play}
            </HeroButton>
            <HeroButton
              variant="secondary"
              icon={SVG_ICONS.arrow}
              onClick={handleExploreClick}
              aria-label="Explorer les modes de jeu"
            >
              {HERO_CONTENT.buttons.explore}
            </HeroButton>
          </div>
        </header>

        {/* Feature Cards */}
        <section className="feature-cards" aria-label="Fonctionnalités du jeu">
          {FEATURE_CARDS.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={SVG_ICONS[feature.icon]}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              id={feature.id}
            />
          ))}
        </section>

        {/* Statistics Cards */}
        <section className="stats-cards" aria-label="Statistiques du jeu">
          {STATISTICS.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              id={stat.id}
            />
          ))}
        </section>
      </div>
    </section>
  );
};

Hero.propTypes = {
  onPlayClick: PropTypes.func,
  onExploreClick: PropTypes.func
};

Hero.defaultProps = {
  onPlayClick: null,
  onExploreClick: null
};

export default memo(Hero);
