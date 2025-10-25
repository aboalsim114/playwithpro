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
 * Floating particles background component
 */
const FloatingParticles = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${8 + (i % 4)}s`
          }}
        />
      ))}
    </div>
  );
});

/**
 * Subtle grid background
 */
const GridBackground = memo(() => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="border border-white/20" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );
});

/**
 * Modern security card component
 */
const SecurityCard = memo(({ icon, title, description, delay = 0, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 ${
        isHovered ? 'shadow-2xl' : ''
      }`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 text-2xl font-bold text-white/50">
        {String(index + 1).padStart(2, '0')}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
            {icon}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl" />
    </div>
  );
});

/**
 * Modern section header component
 */
const SectionHeader = memo(() => {
  return (
    <header className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
        <span>SÉCURITÉ</span>
        <div className="w-8 h-px bg-red-300" />
      </div>
      
      <h2 className="text-5xl md:text-7xl font-bold mb-6">
        <span className="text-white block">Sécurité Maximale</span>
        <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent block">
          Serveurs Privés
        </span>
      </h2>
      
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Infrastructure de pointe avec chiffrement militaire, anti-triche IA et protection totale des données.
      </p>
      
      <div className="flex items-center justify-center gap-8 flex-wrap">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">99.9%</div>
          <div className="text-sm text-gray-400">Uptime</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">256-bit</div>
          <div className="text-sm text-gray-400">Encryption</div>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">24/7</div>
          <div className="text-sm text-gray-400">Monitoring</div>
        </div>
      </div>
    </header>
  );
});

/**
 * Main SecuritySection component
 */
const SecuritySection = () => {
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const securityFeatures = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: "Chiffrement Avancé",
      description: "Protection de niveau militaire avec chiffrement AES-256 et protocoles sécurisés pour toutes vos données."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
        </svg>
      ),
      title: "Anti-Triche IA",
      description: "Système d'intelligence artificielle avancé pour détecter et prévenir toute forme de triche en temps réel."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Protection des Données",
      description: "Sauvegarde sécurisée et protection complète de vos données personnelles et de progression de jeu."
    }
  ];

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 overflow-hidden"
      id="security"
      role="region"
      aria-labelledby="security-title"
      ref={sectionRef}
    >
      <GridBackground />
      <FloatingParticles />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <SectionHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <SecurityCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(SecuritySection);
