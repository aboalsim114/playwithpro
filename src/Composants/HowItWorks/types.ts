/**
 * @fileoverview TypeScript interfaces for the How It Works section
 * Provides type safety and better development experience
 */

/**
 * Step configuration interface
 */
export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'purple' | 'orange' | 'green';
}

/**
 * Main content configuration interface
 */
export interface HowItWorksContent {
  title: {
    text: string;
    gradient: string;
  };
  description: string;
}

/**
 * Mouse position interface
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * StepCard component props interface
 */
export interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  id: string;
  index: number;
  isActive?: boolean;
  isCompleted?: boolean;
  mousePosition?: MousePosition;
  scrollProgress?: number;
}

/**
 * Timeline component props interface
 */
export interface TimelineProps {
  activeStep: number;
  handleStepClick: (stepIndex: number) => void;
  isVisible: boolean;
  mousePosition: MousePosition;
  scrollProgress: number;
}

/**
 * Progress indicator props interface
 */
export interface ProgressIndicatorProps {
  activeStep: number;
  handleStepClick: (stepIndex: number) => void;
}

/**
 * Custom hook return types
 */
export interface UseStepNavigationReturn {
  activeStep: number;
  handleStepClick: (stepIndex: number) => void;
}

export interface UseMousePositionReturn {
  mousePosition: MousePosition;
  handleMouseMove: (e: MouseEvent) => void;
}

export interface UseScrollProgressReturn {
  scrollProgress: number;
  handleScroll: () => void;
}

/**
 * Icon container props interface
 */
export interface IconContainerProps {
  color: string;
  icon: React.ReactNode;
}

/**
 * Card header content props interface
 */
export interface CardHeaderContentProps {
  title: string;
  index: number;
}
