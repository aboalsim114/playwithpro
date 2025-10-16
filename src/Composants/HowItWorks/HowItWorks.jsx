import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import './HowItWorks.css';

// Import components
import { StepCard } from './components';

// Import constants
import { 
  HOW_IT_WORKS_CONTENT, 
  STEPS, 
  STEP_ICONS 
} from './constants';

/**
 * Custom hook for managing step navigation
 */
const useStepNavigation = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = useCallback((stepIndex) => {
    setActiveStep(stepIndex);
  }, []);

  return { activeStep, handleStepClick };
};

/**
 * Custom hook for managing mouse position tracking
 */
const useMousePosition = (elementRef) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  }, [elementRef]);

  return { mousePosition, handleMouseMove };
};

/**
 * Custom hook for managing scroll progress
 */
const useScrollProgress = (elementRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (scrollTop + windowHeight - elementTop) / elementHeight
      ));
      
      setScrollProgress(progress);
    }
  }, [elementRef]);

  return { scrollProgress, handleScroll };
};

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
 * Dynamic background component with modern animated elements
 */
const DynamicBackground = memo(() => {
  return (
    <div className="dynamic-background">
      {/* Floating geometric shapes */}
      <div className="floating-shapes">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className={`floating-shape shape-${i + 1}`}
            style={{
              '--shape-delay': `${i * 0.5}s`,
              '--shape-duration': `${12 + (i % 4)}s`,
              '--shape-size': `${60 + (i % 3) * 40}px`
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient orbs */}
      <div className="gradient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Particle system */}
      <div className="particle-system">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              '--particle-delay': `${i * 0.1}s`,
              '--particle-duration': `${8 + (i % 3)}s`,
              '--particle-x': `${Math.random() * 100}%`,
              '--particle-y': `${Math.random() * 100}%`,
              '--particle-size': `${2 + Math.random() * 4}px`
            }}
          />
        ))}
      </div>

      {/* Animated grid */}
      <div className="animated-grid">
        <div className="grid-lines">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line" style={{ '--line-delay': `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Light rays */}
      <div className="light-rays">
        <div className="ray ray-1" />
        <div className="ray ray-2" />
        <div className="ray ray-3" />
      </div>
    </div>
  );
});

/**
 * Modern section header component
 */
const SectionHeader = memo(() => {
  return (
    <header className="how-it-works-header">
      <div className="header-container">
        <div className="header-badge">
          <div className="badge-icon">⚡</div>
          <span className="badge-text">Processus Simple</span>
        </div>
        
        <h2 id="how-it-works-title" className="how-it-works-title">
          <span className="title-main">{HOW_IT_WORKS_CONTENT.title.text}</span>
          <span className="title-accent">{HOW_IT_WORKS_CONTENT.title.gradient}</span>
        </h2>
        
        <p className="how-it-works-description">
          {HOW_IT_WORKS_CONTENT.description}
        </p>

        <div className="header-decoration">
          <div className="decoration-line" />
          <div className="decoration-dot" />
          <div className="decoration-line" />
        </div>
      </div>
    </header>
  );
});

/**
 * Modern floating cards layout
 */
const FloatingCards = memo(({ 
  activeStep, 
  handleStepClick, 
  isVisible, 
  mousePosition, 
  scrollProgress 
}) => {
  const cardsRef = useRef(null);

  return (
    <div className="floating-cards-container" ref={cardsRef}>
      <div className="cards-grid">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`floating-card ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''} ${isVisible ? 'visible' : ''}`}
            style={{ 
              '--card-delay': `${index * 0.15}s`,
              '--card-index': index,
              '--card-x': `${(index % 2) * 50 + 25}%`,
              '--card-y': `${Math.floor(index / 2) * 50 + 25}%`
            }}
            onClick={() => handleStepClick(index)}
          >
            <div className="card-glow" />
            <div className="card-border" />
            
            <div className="card-header">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">
                {STEP_ICONS[step.icon]}
              </div>
            </div>

            <div className="card-content">
              <h3 className="card-title">{step.title}</h3>
              <p className="card-description">{step.description}</p>
            </div>

            <div className="card-footer">
              <div className="progress-indicator">
                <div className="progress-bar" />
              </div>
            </div>

            <div className="card-effects">
              <div className="effect-ripple" />
              <div className="effect-particles">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="effect-particle" style={{ '--particle-delay': `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Modern progress indicator component
 */
const ProgressIndicator = memo(({ activeStep, handleStepClick }) => {
  return (
    <div className="progress-indicator">
      <div className="progress-track">
        <div className="progress-line">
          <div className="progress-fill" style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
        </div>
        
        {STEPS.map((_, index) => (
          <button
            key={index}
            className={`progress-dot ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
            onClick={() => handleStepClick(index)}
            aria-label={`Aller à l'étape ${index + 1}`}
          >
            <div className="dot-inner">
              <span className="dot-number">{index + 1}</span>
            </div>
            <div className="dot-ring" />
            <div className="dot-glow" />
          </button>
        ))}
      </div>
    </div>
  );
});

const HowItWorks = () => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  // Custom hooks
  const { activeStep, handleStepClick } = useStepNavigation();
  const { mousePosition, handleMouseMove } = useMousePosition(sectionRef);
  const { scrollProgress, handleScroll } = useScrollProgress(cardsRef);
  const isVisible = useIntersectionObserver(sectionRef);

  // Event listeners setup
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <section 
      className="how-it-works-section" 
      id="how-it-works" 
      role="region" 
      aria-labelledby="how-it-works-title"
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y,
        '--scroll-progress': scrollProgress
      }}
    >
      <DynamicBackground />

      <div className="how-it-works-container">
        <SectionHeader />
        <FloatingCards 
          activeStep={activeStep}
          handleStepClick={handleStepClick}
          isVisible={isVisible}
          mousePosition={mousePosition}
          scrollProgress={scrollProgress}
        />
        <ProgressIndicator 
          activeStep={activeStep}
          handleStepClick={handleStepClick}
        />
      </div>
    </section>
  );
};

export default memo(HowItWorks);