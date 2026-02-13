
import { ReactNode } from 'react';

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  image: string;
}

export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';

export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
}

export interface StaggeredAnimationProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  animation?: AnimationType;
}
