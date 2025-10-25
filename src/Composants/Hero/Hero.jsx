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
    <section className="min-h-screen bg-black relative overflow-hidden" id="home" role="banner">
      {/* Gaming Background with Grid and Neon Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Neon Orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-pink-400 rounded-full filter blur-2xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-green-400 rounded-full filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
        
        {/* Scanlines Effect */}
        <div className="absolute inset-0 bg-scanlines opacity-10"></div>
        
        {/* Corner Neon Accents */}
        <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-pink-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-green-400 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-yellow-400 to-transparent"></div>
      </div>

      {/* Gaming Hero Container with Centered Border */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 pt-24">
        {/* Gaming Border Container */}
        <div className="gaming-border-container">
          <div className="gaming-border-frame">
            {/* Corner Decorations */}
            <div className="gaming-corner gaming-corner-tl"></div>
            <div className="gaming-corner gaming-corner-tr"></div>
            <div className="gaming-corner gaming-corner-bl"></div>
            <div className="gaming-corner gaming-corner-br"></div>
            
            {/* Side Borders with Animated Elements */}
            <div className="gaming-side-border gaming-side-border-top"></div>
            <div className="gaming-side-border gaming-side-border-bottom"></div>
            <div className="gaming-side-border gaming-side-border-left"></div>
            <div className="gaming-side-border gaming-side-border-right"></div>
            
            {/* Content Container */}
            <div className="gaming-content-container">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side - Hero Content */}
                <div className="space-y-8">
                  {/* Status Indicators */}
                  <div className="flex flex-wrap gap-4 mb-8" aria-label="Statut du serveur">
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

                  {/* Hero Title */}
                  <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                      <span className="block text-white mb-2">{HERO_CONTENT.title.text}</span>
                      <span className="block bg-gradient-to-r from-cyan-400 via-pink-500 to-green-400 bg-clip-text text-transparent animate-gradient-x">
                        {HERO_CONTENT.title.gradient}
                      </span>
                    </h1>
                    
                    <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                      {HERO_CONTENT.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                  </div>
                </div>

                {/* Right Side - Gaming Stats & Features */}
                <div className="space-y-8">
                  {/* Live Stats Panel */}
                  <div className="bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 shadow-2xl">
                    <h3 className="text-cyan-400 text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      STATS EN TEMPS RÉEL
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                  </div>

                  {/* Feature Cards */}
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </div>
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
