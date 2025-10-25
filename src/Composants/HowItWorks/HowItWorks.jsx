import React, { memo, useEffect, useRef, useState, useCallback } from 'react';

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
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${12 + (i % 4)}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-gradient-to-r from-pink-500/30 to-red-500/30 rounded-full blur-xl animate-pulse" />
      </div>

      {/* Particle system */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${8 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="border border-white/10" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Light rays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12" />
      </div>
    </div>
  );
});

/**
 * Modern section header component
 */
const SectionHeader = memo(() => {
  return (
    <header className="text-center mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <div className="text-lg">⚡</div>
          <span>Processus Simple</span>
        </div>
        
        <h2 id="how-it-works-title" className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white block">{HOW_IT_WORKS_CONTENT.title.text}</span>
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent block">
            {HOW_IT_WORKS_CONTENT.title.gradient}
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {HOW_IT_WORKS_CONTENT.description}
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
          <div className="w-3 h-3 bg-white/50 rounded-full" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
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
    <div className="relative mb-16" ref={cardsRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-105 ${
              activeStep === index ? 'bg-white/20 scale-105 shadow-2xl' : ''
            } ${index < activeStep ? 'bg-green-500/20 border-green-500/50' : ''} ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ 
              animationDelay: `${index * 0.15}s`
            }}
            onClick={() => handleStepClick(index)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 border border-white/30 rounded-xl" />
            
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {index + 1}
              </div>
              <div className="text-2xl">
                {STEP_ICONS[step.icon]}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>

            <div className="relative z-10 mt-4">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500" 
                     style={{ width: activeStep >= index ? '100%' : '0%' }} />
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute w-1 h-1 bg-white/50 rounded-full animate-ping" 
                       style={{ 
                         left: `${Math.random() * 100}%`,
                         top: `${Math.random() * 100}%`,
                         animationDelay: `${i * 0.1}s`
                       }} />
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
    <div className="flex justify-center">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-1 bg-white/20 rounded-full max-w-md">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500" 
               style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
        </div>
        
        {STEPS.map((_, index) => (
          <button
            key={index}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              index === activeStep 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110' 
                : index < activeStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/20 text-gray-300 hover:bg-white/30'
            }`}
            onClick={() => handleStepClick(index)}
            aria-label={`Aller à l'étape ${index + 1}`}
          >
            <span>{index + 1}</span>
            {index === activeStep && (
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
            )}
            {index < activeStep && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
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
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden" 
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

      <div className="relative z-10 container mx-auto px-4 py-16">
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