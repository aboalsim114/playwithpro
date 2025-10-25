import React, { memo, useEffect, useRef, useState, useCallback } from 'react';

// Import components
// import { StepCard } from './components';

// Import constants
import { 
  HOW_IT_WORKS_CONTENT, 
  STEPS, 
  STEP_ICONS 
} from './constants';

// Import gaming styles
import './styles';

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
 * Gaming-themed dynamic background with e-sport elements
 */
const DynamicBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gaming HUD elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-8 h-8 border-2 border-cyan-400/30 rounded-lg animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + (i % 3)}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
      
      {/* Neon glow orbs with gaming colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-gradient-to-r from-green-400/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Gaming particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${6 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      {/* Gaming grid overlay */}
      <div className="absolute inset-0 opacity-15">
        <div className="grid grid-cols-24 grid-rows-24 h-full w-full">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="border border-cyan-400/20" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      </div>

      {/* Gaming scanlines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -skew-x-12 animate-pulse" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent transform -skew-x-12 animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent transform -skew-x-12 animate-pulse" />
      </div>

      {/* Gaming corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400/40" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-400/40" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400/40" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400/40" />
    </div>
  );
});

/**
 * Grid 2-Column Gaming-themed content header component
 */
const ContentHeader = memo(() => {
  return (
    <div className="content-header">
      <div className="content-badge">
        <div className="content-badge-icon">🎮</div>
        <span>MISSION GAMING</span>
        <div className="content-badge-dot" />
      </div>
      
      <h2 id="how-it-works-title" className="content-title">
        <span className="content-title-text">{HOW_IT_WORKS_CONTENT.title.text}</span>
        <span className="content-title-gradient">
          {HOW_IT_WORKS_CONTENT.title.gradient}
        </span>
      </h2>
      
      <p className="content-description">
        {HOW_IT_WORKS_CONTENT.description}
      </p>

      <div className="content-features">
        <div className="content-feature">
          <div className="content-feature-icon">🧑‍🤝‍🧑</div>
          <span className="content-feature-text">Match avec un Pro</span>
        </div>
        <div className="content-feature">
          <div className="content-feature-icon">🧠</div>
          <span className="content-feature-text">Coaching Personnalisé</span>
        </div>
        <div className="content-feature">
          <div className="content-feature-icon">🏆</div>
          <span className="content-feature-text">Classements & Badges</span>
        </div>
        <div className="content-feature">
          <div className="content-feature-icon">💬</div>
          <span className="content-feature-text">Chat Temps Réel</span>
        </div>
        <div className="content-feature">
          <div className="content-feature-icon">💰</div>
          <span className="content-feature-text">Paiement Sécurisé</span>
        </div>
        <div className="content-feature">
          <div className="content-feature-icon">🎥</div>
          <span className="content-feature-text">Replay Automatique</span>
        </div>
      </div>
    </div>
  );
});

/**
 * Grid 2-Column Gaming-themed steps layout
 */
const StepsGrid = memo(({ 
  activeStep, 
  handleStepClick, 
  isVisible, 
  mousePosition, 
  scrollProgress 
}) => {
  const cardsRef = useRef(null);

  return (
    <div className="steps-column" ref={cardsRef}>
      <div className="steps-grid">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`step-card ${
              activeStep === index ? 'active' : ''
            } ${index < activeStep ? 'completed' : ''} ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ 
              animationDelay: `${index * 0.2}s`
            }}
            onClick={() => handleStepClick(index)}
          >
            {/* Gaming card glow effect */}
            <div className="gaming-glow" />
            
            {/* Step card header */}
            <div className="step-card-header">
              <div className="step-number">
                {step.number}
              </div>
              <div className="step-icon">
                {STEP_ICONS[step.icon]}
              </div>
            </div>

            {/* Step card content */}
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>

            {/* Step progress bar */}
            <div className="step-progress">
              <div className="step-progress-bar">
                <div className="step-progress-fill" 
                     style={{ width: activeStep >= index ? '100%' : '0%' }} />
              </div>
            </div>

            {/* Gaming particle effects */}
            <div className="gaming-particles">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="gaming-particle" 
                     style={{ 
                       left: `${Math.random() * 100}%`,
                       top: `${Math.random() * 100}%`,
                       animationDelay: `${i * 0.2}s`
                     }} />
              ))}
            </div>

            {/* Gaming corner accents */}
            <div className="gaming-corner gaming-corner-top-right" />
            <div className="gaming-corner gaming-corner-bottom-left" />
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Grid 2-Column Gaming-themed progress indicator component
 */
const ProgressIndicator = memo(({ activeStep, handleStepClick }) => {
  return (
    <div className="progress-section">
      <div className="progress-container">
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" 
                 style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
          </div>
          
          <div className="progress-steps">
            {STEPS.map((step, index) => (
              <button
                key={index}
                className={`progress-step ${
                  index === activeStep 
                    ? 'active' 
                    : index < activeStep 
                      ? 'completed' 
                      : 'pending'
                }`}
                onClick={() => handleStepClick(index)}
                aria-label={`Aller à l'étape ${index + 1}`}
              >
                <span className="text-lg">{step.number}</span>
                {index === activeStep && (
                  <div className="progress-step-ping" />
                )}
                {index < activeStep && (
                  <div className="progress-step-check">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const HowItWorks = () => {
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
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 overflow-hidden" 
      id="how-it-works" 
      aria-labelledby="how-it-works-title"
      ref={sectionRef}
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y,
        '--scroll-progress': scrollProgress
      }}
    >
      <DynamicBackground />

      {/* Grid 2-Column Container */}
      <div className="grid-container">
        <div className="grid-wrapper">
          {/* Left Column - Content */}
          <div className="content-column">
            <ContentHeader />
          </div>

          {/* Right Column - Steps Grid */}
          <div className="steps-column">
            <StepsGrid 
              activeStep={activeStep}
              handleStepClick={handleStepClick}
              isVisible={isVisible}
              mousePosition={mousePosition}
              scrollProgress={scrollProgress}
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator 
          activeStep={activeStep}
          handleStepClick={handleStepClick}
        />
      </div>
    </section>
  );
};

export default memo(HowItWorks);