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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

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

  const handleScroll = useCallback(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (scrollTop + windowHeight - elementTop) / elementHeight
      ));
      
      setScrollProgress(progress);
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
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
      {/* Dynamic Background */}
      <div className="dynamic-background">
        <div className="morphing-shapes">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="morphing-shape"
              style={{
                '--shape-delay': `${i * 0.8}s`,
                '--shape-duration': `${8 + (i % 3)}s`,
                '--shape-size': `${100 + (i % 3) * 50}px`
              }}
            ></div>
          ))}
        </div>
        
        <div className="energy-waves">
          <div className="energy-wave wave-1"></div>
          <div className="energy-wave wave-2"></div>
          <div className="energy-wave wave-3"></div>
        </div>

        <div className="neural-network">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="neural-node"
              style={{
                '--node-delay': `${i * 0.1}s`,
                '--node-duration': `${3 + (i % 2)}s`,
                '--node-x': `${Math.random() * 100}%`,
                '--node-y': `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="how-it-works-container">
        {/* Section Header */}
        <header className="how-it-works-header">
          <div className="header-orb">
            <div className="orb-core"></div>
            <div className="orb-rings">
              <div className="orb-ring ring-1"></div>
              <div className="orb-ring ring-2"></div>
              <div className="orb-ring ring-3"></div>
            </div>
          </div>
          
          <h2 id="how-it-works-title" className="how-it-works-title">
            <span className="title-text">{HOW_IT_WORKS_CONTENT.title.text}</span>
            <span className="title-gradient">{HOW_IT_WORKS_CONTENT.title.gradient}</span>
          </h2>
          
          <p className="how-it-works-description">
            {HOW_IT_WORKS_CONTENT.description}
          </p>
        </header>

        {/* Timeline Container */}
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-track">
            {/* Central Timeline Line */}
            <div className="timeline-line">
              <div className="line-progress"></div>
              <div className="line-glow"></div>
            </div>

            {/* Timeline Steps */}
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`timeline-step ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''} ${isVisible ? 'visible' : ''}`}
                style={{ 
                  '--step-delay': `${index * 0.2}s`,
                  '--step-index': index
                }}
                onClick={() => handleStepClick(index)}
              >
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-pulse"></div>
                </div>

                <div className="step-node">
                  <div className="node-core">
                    <div className="node-icon">
                      {STEP_ICONS[step.icon]}
                    </div>
                    <div className="node-number">{index + 1}</div>
                  </div>
                  <div className="node-rings">
                    <div className="node-ring ring-1"></div>
                    <div className="node-ring ring-2"></div>
                    <div className="node-ring ring-3"></div>
                  </div>
                  <div className="node-glow"></div>
                </div>

                <div className="step-content">
                  <StepCard
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    icon={STEP_ICONS[step.icon]}
                    color={step.color}
                    id={step.id}
                    index={index}
                    isActive={activeStep === index}
                    isCompleted={index < activeStep}
                    mousePosition={mousePosition}
                    scrollProgress={scrollProgress}
                  />
                </div>
              </div>
            ))}
          </div>
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
                <div className="dot-pulse"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HowItWorks);