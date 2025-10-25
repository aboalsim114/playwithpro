import React, { memo, useEffect, useRef, useState, useCallback } from 'react';

// Import components
import { StepCard } from './components';

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
 * Gaming-themed section header component
 */
const SectionHeader = memo(() => {
  return (
    <header className="text-center mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-6 py-3 rounded-full text-sm font-bold mb-8 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
          <div className="text-xl animate-pulse">🎮</div>
          <span className="tracking-wider">MISSION GAMING</span>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
        </div>
        
        <h2 id="how-it-works-title" className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          <span className="text-white block drop-shadow-2xl">{HOW_IT_WORKS_CONTENT.title.text}</span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block animate-pulse">
            {HOW_IT_WORKS_CONTENT.title.gradient}
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          {HOW_IT_WORKS_CONTENT.description}
        </p>

        <div className="flex items-center justify-center gap-6">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-cyan-400/50" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-cyan-400/50" />
        </div>
      </div>
    </header>
  );
});

/**
 * Gaming-themed floating cards layout
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-lg border-2 border-cyan-400/30 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:border-cyan-400/60 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 ${
              activeStep === index ? 'border-cyan-400/80 scale-105 shadow-2xl shadow-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30' : ''
            } ${index < activeStep ? 'border-green-400/60 bg-gradient-to-br from-green-900/30 to-emerald-900/30' : ''} ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ 
              animationDelay: `${index * 0.2}s`
            }}
            onClick={() => handleStepClick(index)}
          >
            {/* Gaming card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-2xl" />
            
            {/* Gaming card header */}
            <div className="relative z-10 flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-cyan-500/30">
                {step.number}
              </div>
              <div className="text-3xl text-cyan-400">
                {STEP_ICONS[step.icon]}
              </div>
            </div>

            {/* Gaming card content */}
            <div className="relative z-10">
              <h3 className="text-xl font-black text-white mb-4 tracking-wide">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">{step.description}</p>
            </div>

            {/* Gaming progress bar */}
            <div className="relative z-10 mt-6">
              <div className="w-full bg-slate-700/50 rounded-full h-2 border border-cyan-400/20">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700 shadow-lg shadow-cyan-400/50" 
                     style={{ width: activeStep >= index ? '100%' : '0%' }} />
              </div>
            </div>

            {/* Gaming particle effects */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-ping" 
                       style={{ 
                         left: `${Math.random() * 100}%`,
                         top: `${Math.random() * 100}%`,
                         animationDelay: `${i * 0.2}s`
                       }} />
                ))}
              </div>
            </div>

            {/* Gaming corner accents */}
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40" />
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Gaming-themed progress indicator component
 */
const ProgressIndicator = memo(({ activeStep, handleStepClick }) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-6">
        <div className="flex-1 h-2 bg-slate-700/50 rounded-full max-w-lg border border-cyan-400/20">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700 shadow-lg shadow-cyan-400/50" 
               style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
        </div>
        
        {STEPS.map((step, index) => (
          <button
            key={index}
            className={`relative w-16 h-16 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-500 border-2 ${
              index === activeStep 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/50 scale-110 border-cyan-400' 
                : index < activeStep 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-400' 
                  : 'bg-slate-800/50 text-gray-400 border-cyan-400/30 hover:border-cyan-400/60 hover:bg-slate-700/50'
            }`}
            onClick={() => handleStepClick(index)}
            aria-label={`Aller à l'étape ${index + 1}`}
          >
            <span className="text-2xl">{step.number}</span>
            {index === activeStep && (
              <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/60 animate-ping" />
            )}
            {index < activeStep && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center border-2 border-slate-900">
                <span className="text-xs font-bold">✓</span>
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
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 overflow-hidden" 
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