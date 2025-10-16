/**
 * @fileoverview Performance optimization utilities for the How It Works section
 * Contains functions to optimize animations and reduce bundle size
 */

/**
 * Throttle function to limit the rate of function execution
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Debounce function to delay function execution
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers high contrast
 * @returns boolean indicating if high contrast is preferred
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Optimize animation performance by using transform and opacity
 * @param element - DOM element to optimize
 */
export const optimizeForAnimation = (element: HTMLElement): void => {
  element.style.willChange = 'transform, opacity';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
};

/**
 * Remove animation optimizations when not needed
 * @param element - DOM element to reset
 */
export const resetAnimationOptimizations = (element: HTMLElement): void => {
  element.style.willChange = 'auto';
  element.style.backfaceVisibility = 'visible';
  element.style.perspective = 'none';
};

/**
 * Generate optimized CSS custom properties for animations
 * @param index - Element index
 * @param total - Total number of elements
 * @returns Object with optimized CSS properties
 */
export const generateAnimationProperties = (index: number, total: number) => {
  const baseDelay = 0.1;
  const staggerDelay = 0.2;
  
  return {
    '--animation-delay': `${index * staggerDelay}s`,
    '--animation-duration': `${0.8 + (index % 3) * 0.2}s`,
    '--animation-stagger': `${baseDelay + (index / total) * 0.5}s`
  };
};

/**
 * Lazy load images and other resources
 * @param selector - CSS selector for elements to lazy load
 */
export const lazyLoadElements = (selector: string): void => {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('loaded');
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  elements.forEach((element) => observer.observe(element));
};

/**
 * Preload critical resources
 * @param resources - Array of resource URLs to preload
 */
export const preloadResources = (resources: string[]): void => {
  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
};

/**
 * Optimize scroll performance
 * @param callback - Function to call on scroll
 * @param throttleMs - Throttle delay in milliseconds
 * @returns Optimized scroll handler
 */
export const createOptimizedScrollHandler = (
  callback: () => void,
  throttleMs: number = 16
) => {
  return throttle(callback, throttleMs);
};

/**
 * Optimize resize performance
 * @param callback - Function to call on resize
 * @param debounceMs - Debounce delay in milliseconds
 * @returns Optimized resize handler
 */
export const createOptimizedResizeHandler = (
  callback: () => void,
  debounceMs: number = 250
) => {
  return debounce(callback, debounceMs);
};
