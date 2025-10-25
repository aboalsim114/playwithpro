import React, { memo } from 'react';
import PropTypes from 'prop-types';

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
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden" id="home" role="banner">
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Status Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" aria-label="Statut du serveur">
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
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white block">{HERO_CONTENT.title.text}</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent block">
              {HERO_CONTENT.title.gradient}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {HERO_CONTENT.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Actions principales">
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" aria-label="Fonctionnalités du jeu">
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Statistiques du jeu">
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
