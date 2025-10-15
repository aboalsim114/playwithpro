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

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);

  const handleStepClick = useCallback((stepIndex) => {
    setActiveStep(stepIndex);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

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
        '--mouse-y': mousePosition.y
      }}
    >
      {/* Animated Background Elements */}
      <div className="background-effects">
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="floating-shape"
              style={{
                '--shape-delay': `${i * 0.5}s`,
                '--shape-duration': `${6 + (i % 3)}s`,
                '--shape-size': `${20 + (i % 4) * 15}px`
              }}
            ></div>
          ))}
        </div>
        
        <div className="particle-system">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--particle-delay': `${i * 0.3}s`,
                '--particle-duration': `${4 + (i % 2)}s`,
                '--particle-size': `${4 + (i % 3) * 2}px`
              }}
            ></div>
          ))}
        </div>

        <div className="light-rays">
          <div className="light-ray ray-1"></div>
          <div className="light-ray ray-2"></div>
          <div className="light-ray ray-3"></div>
        </div>
      </div>

      <div className="how-it-works-container">
        {/* Section Header */}
        <header className="how-it-works-header">
          <div className="header-decoration">
            <div className="decoration-line line-1"></div>
            <div className="decoration-diamond"></div>
            <div className="decoration-line line-2"></div>
          </div>
          
          <h2 id="how-it-works-title" className="how-it-works-title">
            <span className="title-text">{HOW_IT_WORKS_CONTENT.title.text}</span>
            <span className="title-gradient">{HOW_IT_WORKS_CONTENT.title.gradient}</span>
          </h2>
          
          <p className="how-it-works-description">
            {HOW_IT_WORKS_CONTENT.description}
          </p>
        </header>

        {/* Steps Grid */}
        <div className="steps-grid">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`step-item ${activeStep === index ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
              style={{ 
                '--step-delay': `${index * 0.1}s`,
                '--step-index': index
              }}
              onClick={() => handleStepClick(index)}
            >
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
                icon={STEP_ICONS[step.icon]}
                color={step.color}
                id={step.id}
                index={index}
                isActive={activeStep === index}
                mousePosition={mousePosition}
              />
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="connection-lines">
          <svg viewBox="0 0 1000 200" className="connection-svg">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78DBFF" stopOpacity="0.6"/>
                <stop offset="25%" stopColor="#FF77C6" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#7877C6" stopOpacity="0.9"/>
                <stop offset="75%" stopColor="#FF77C6" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#78DBFF" stopOpacity="0.6"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path 
              d="M 50 100 Q 250 50 450 100 Q 650 150 850 100" 
              stroke="url(#connectionGradient)" 
              strokeWidth="3" 
              fill="none"
              className="connection-path"
              filter="url(#glow)"
            />
            <circle r="4" fill="#78DBFF" className="connection-dot" filter="url(#glow)">
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#connectionPath"/>
              </animateMotion>
            </circle>
            <path id="connectionPath" d="M 50 100 Q 250 50 450 100 Q 650 150 850 100" fill="none"/>
          </svg>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-track">
            {STEPS.map((_, index) => (
              <button
                key={index}
                className={`progress-dot ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                onClick={() => handleStepClick(index)}
                aria-label={`Aller à l'étape ${index + 1}`}
              >
                <span className="dot-number">{index + 1}</span>
                <div className="dot-glow"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HowItWorks);