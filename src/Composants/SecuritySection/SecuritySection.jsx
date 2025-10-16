import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import './SecuritySection.css';

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
    <div className="floating-particles">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="particle"
          style={{
            '--particle-delay': `${i * 0.5}s`,
            '--particle-duration': `${8 + (i % 4)}s`,
            '--particle-x': `${Math.random() * 100}%`,
            '--particle-y': `${Math.random() * 100}%`,
            '--particle-size': `${4 + (i % 3) * 2}px`
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
    <div className="grid-background">
      <div className="grid-lines">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-line" style={{ '--line-delay': `${i * 0.1}s` }} />
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
      className={`security-card card-${index + 1} ${isHovered ? 'hovered' : ''}`}
      style={{ '--card-delay': `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
      
      <div className="card-content">
        <div className="card-icon-wrapper">
          <div className="card-icon">
            {icon}
          </div>
          <div className="icon-glow" />
        </div>
        
        <div className="card-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
      
      <div className="card-accent" />
    </div>
  );
});

/**
 * Modern section header component
 */
const SectionHeader = memo(() => {
  return (
    <header className="security-header">
      <div className="header-badge">
        <span className="badge-text">SÉCURITÉ</span>
        <div className="badge-line" />
      </div>
      
      <h2 className="security-title">
        <span className="title-main">Sécurité Maximale</span>
        <span className="title-sub">Serveurs Privés</span>
      </h2>
      
      <p className="security-description">
        Infrastructure de pointe avec chiffrement militaire, anti-triche IA et protection totale des données.
      </p>
      
      <div className="header-stats">
        <div className="stat-item">
          <span className="stat-number">99.9%</span>
          <span className="stat-label">Uptime</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">256-bit</span>
          <span className="stat-label">Encryption</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Monitoring</span>
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
      className="security-section"
      id="security"
      role="region"
      aria-labelledby="security-title"
      ref={sectionRef}
    >
      <GridBackground />
      <FloatingParticles />
      
      <div className="security-container">
        <SectionHeader />
        
        <div className="security-cards-container">
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
