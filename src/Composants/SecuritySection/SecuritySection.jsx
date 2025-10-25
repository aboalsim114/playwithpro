import React, { memo, useEffect, useRef, useState, useCallback } from 'react';

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
 * Liquid Glass Morphing Background
 */
const LiquidGlassBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated liquid shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-emerald-400/30 to-teal-600/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-4 h-4 bg-white/10 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${6 + (i % 3)}s`
          }}
        />
      ))}
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {[...Array(144)].map((_, i) => (
            <div 
              key={i} 
              className="border border-cyan-400/20 animate-pulse"
              style={{ 
                animationDelay: `${(i % 12) * 0.1}s`,
                animationDuration: '3s'
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
const GamingParticles = memo(() => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)]
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 3000);
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
 * Holographic Grid Effect
 */
const HolographicGrid = memo(() => {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
});

/**
 * Gaming Liquid Glass Card Component
 */
const GamingSecurityCard = memo(({ icon, title, description, delay = 0, index, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
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
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-sm`} />
      
      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card content */}
      <div className="relative z-10 p-8">
        {/* Gaming-style number badge */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/25">
          {String(index + 1).padStart(2, '0')}
        </div>
        
        {/* Icon with liquid glass effect */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          {/* Glowing effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
            {description}
          </p>
        </div>
        
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
        <span className="text-cyan-300 group-hover:text-white transition-colors">SÉCURITÉ GAMING</span>
        <div className="w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
      </div>
      
      {/* Main title with gaming effects */}
      <div className="relative mb-8">
        <h2 className="text-6xl md:text-8xl font-black mb-4">
          <span className="block text-white drop-shadow-2xl">
            SÉCURITÉ
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            MAXIMALE
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
          Infrastructure de pointe avec chiffrement militaire, anti-triche IA et protection totale des données.
        </span>
      </p>
      
      {/* Gaming stats with liquid glass cards */}
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {[
          { value: "99.9%", label: "Uptime", color: "from-green-400 to-emerald-500" },
          { value: "256-bit", label: "Encryption", color: "from-blue-400 to-cyan-500" },
          { value: "24/7", label: "Monitoring", color: "from-purple-400 to-pink-500" }
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
 * Main Gaming SecuritySection component
 */
const SecuritySection = () => {
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const gamingSecurityFeatures = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: "Chiffrement Quantique",
      description: "Protection de niveau militaire avec chiffrement AES-256 et protocoles sécurisés pour toutes vos données de jeu.",
      color: "from-cyan-400 to-blue-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
        </svg>
      ),
      title: "Anti-Triche IA Gaming",
      description: "Système d'intelligence artificielle avancé pour détecter et prévenir toute forme de triche en temps réel.",
      color: "from-purple-400 to-pink-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Protection Gaming",
      description: "Sauvegarde sécurisée et protection complète de vos données personnelles et de progression de jeu.",
      color: "from-emerald-400 to-teal-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Serveurs Premium",
      description: "Infrastructure de serveurs haute performance avec latence ultra-faible pour une expérience gaming optimale.",
      color: "from-orange-400 to-red-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      title: "Performance Gaming",
      description: "Optimisation avancée pour des performances maximales et une expérience de jeu fluide sans interruption.",
      color: "from-yellow-400 to-orange-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
        </svg>
      ),
      title: "Support 24/7",
      description: "Équipe de support technique disponible 24h/24 et 7j/7 pour résoudre tous vos problèmes gaming.",
      color: "from-indigo-400 to-purple-600"
    }
  ];

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
      id="security"
      role="region"
      aria-labelledby="security-title"
      ref={sectionRef}
    >
      {/* Background Effects */}
      <LiquidGlassBackground />
      <GamingParticles />
      <HolographicGrid />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <GamingSectionHeader />
        
        {/* Gaming Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamingSecurityFeatures.map((feature, index) => (
            <GamingSecurityCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.2}
              index={index}
              color={feature.color}
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

export default memo(SecuritySection);
