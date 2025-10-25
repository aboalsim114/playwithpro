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

// Import styles
import './Hero.css';

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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Centered glass container */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8 pt-24">
        <div className="relative w-full max-w-6xl">
          {/* Liquid glass border container */}
          <div className="relative p-1 rounded-3xl liquid-border">
            {/* Glass content container */}
            <div className="relative glass-container rounded-3xl shadow-2xl">
              {/* Inner content */}
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Status Indicators */}
                <div className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12" aria-label="Statut du serveur">
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
                <header className="text-center mb-12 sm:mb-16">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                    <span className="text-white block">{HERO_CONTENT.title.text}</span>
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent block">
                      {HERO_CONTENT.title.gradient}
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
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
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16" aria-label="Fonctionnalités du jeu">
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
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" aria-label="Statistiques du jeu">
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
            </div>
          </div>
        </div>
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
