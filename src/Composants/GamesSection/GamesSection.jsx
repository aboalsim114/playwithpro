import React, { memo, useEffect, useRef, useState } from 'react';

/**
 * Custom hook for managing intersection observer
 */
const useIntersectionObserver = (elementRef, threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold]);

  return isVisible;
};

/**
 * Liquid Glass Morphing Background for Gaming
 */
const GamingLiquidBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated liquid shapes for gaming */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-emerald-400/30 to-teal-600/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/30 to-red-600/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '14s', animationDelay: '6s' }} />
      
      {/* Gaming floating elements */}
      {[...Array(12)].map((_, i) => (
            <div
              key={i}
          className="absolute w-3 h-3 bg-white/10 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${4 + (i % 3)}s`
          }}
        />
      ))}
      
      {/* Gaming grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-16 grid-rows-16 h-full w-full">
          {[...Array(256)].map((_, i) => (
            <div 
              key={i} 
              className="border border-cyan-400/20 animate-pulse"
              style={{ 
                animationDelay: `${(i % 16) * 0.1}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

/**
 * Gaming Particle System
 */
const GamingParticleSystem = memo(() => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        speed: Math.random() * 3 + 1,
        color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'][Math.floor(Math.random() * 5)]
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
            </div>
  );
});

/**
 * Gaming Holographic Grid
 */
const GamingHolographicGrid = memo(() => {
  return (
    <div className="absolute inset-0 opacity-15">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="gamingGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#00ffff" strokeWidth="0.3" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gamingGrid)" />
                  </svg>
                </div>
  );
});

/**
 * Gaming Section Header with Liquid Glass Effects
 */
const GamingSectionHeader = memo(() => {
  return (
    <header className="text-center mb-20 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
                  </div>
      
      {/* Gaming badge */}
      <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 px-6 py-3 rounded-full text-sm font-bold mb-8 group hover:scale-105 transition-all duration-300">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span className="text-cyan-300 group-hover:text-white transition-colors">UNIVERS GAMING</span>
        <div className="w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
                </div>

      {/* Main title with gaming effects */}
      <div className="relative mb-8">
        <h2 className="text-6xl md:text-8xl font-black mb-4">
          <span className="block text-white drop-shadow-2xl">
            JEUX
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            LIQUIDES
          </span>
        </h2>
        
        {/* Animated underline */}
        <div className="relative w-64 h-1 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-sm opacity-50" />
                  </div>
                </div>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed relative">
        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Plongez dans l'univers du gaming liquide où chaque mouvement est fluide, chaque action est précise, et chaque victoire est épique.
        </span>
      </p>
      
      {/* Gaming stats with liquid glass cards */}
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {[
          { value: "6", label: "Jeux Disponibles", color: "from-cyan-400 to-blue-500" },
          { value: "6.2M", label: "Joueurs Actifs", color: "from-purple-400 to-pink-500" },
          { value: "4.6/5", label: "Note Moyenne", color: "from-emerald-400 to-teal-500" }
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
            {/* Hover effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
          </div>
        ))}
      </div>
    </header>
  );
});

/**
 * Gaming Liquid Glass Card Component
 */
const GamingCard = memo(({ game, index, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 ${
        isHovered ? 'shadow-2xl shadow-cyan-500/25' : ''
      }`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl" />
      
      {/* Animated liquid effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-sm`} />
      
      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card content */}
      <div className="relative z-10 p-8">
        {/* Gaming-style icon */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mx-auto`}>
            {game.icon}
          </div>
          {/* Glowing effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${game.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {game.title}
                  </h3>
          <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
            {game.description}
          </p>
                  
                  {/* Status */}
          <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-lg font-bold text-white">{game.players}</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
          <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-lg font-bold text-white">{game.rating}</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

        {/* Gaming Button */}
        <button className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
        
        {/* Animated progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

      {/* Floating particles around card */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

/**
 * Main Gaming GamesSection component
 */
const GamesSection = () => {
  const sectionRef = useRef(null);

  const gamingData = [
    {
      title: "Counter-Strike 2",
      description: "Tactical FPS compétitif",
      players: "1.2M",
      rating: "4.8/5",
      color: "from-blue-400 to-cyan-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Valorant",
      description: "FPS tactique avec agents",
      players: "850K",
      rating: "4.7/5",
      color: "from-red-400 to-pink-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      title: "League of Legends",
      description: "MOBA stratégique",
      players: "2.1M",
      rating: "4.6/5",
      color: "from-yellow-400 to-orange-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8"/>
                    <path d="M12 8v8"/>
                  </svg>
      )
    },
    {
      title: "Dota 2",
      description: "MOBA complexe",
      players: "680K",
      rating: "4.5/5",
      color: "from-purple-400 to-violet-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/>
                  </svg>
      )
    },
    {
      title: "Apex Legends",
      description: "Battle Royale",
      players: "920K",
      rating: "4.4/5",
      color: "from-orange-400 to-red-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
      )
    },
    {
      title: "Rocket League",
      description: "Football avec voitures",
      players: "450K",
      rating: "4.3/5",
      color: "from-cyan-400 to-blue-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  </svg>
      )
    }
  ];

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
      id="games"
      ref={sectionRef}
    >
      {/* Background Effects */}
      <GamingLiquidBackground />
      <GamingParticleSystem />
      <GamingHolographicGrid />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <GamingSectionHeader />
        
        {/* Gaming Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamingData.map((game, index) => (
            <GamingCard
              key={index}
              game={game}
              index={index}
              delay={index * 0.2}
            />
          ))}
          </div>

        {/* Gaming Footer Stats */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold">SERVEURS ACTIFS</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="text-2xl font-bold text-white">99.9% UPTIME</div>
            <div className="w-px h-6 bg-white/20" />
            <div className="text-2xl font-bold text-cyan-400">LATENCE &lt; 5MS</div>
        </div>
        </div>
        </div>
      </section>
  );
};

export default memo(GamesSection);