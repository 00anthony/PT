"use client"
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-up';
  delay?: number;
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  as = 'div',
  ...props
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, delay });

  const Component = as;

  return React.createElement(
    Component,
    {
      ref,
      className: `${animation} ${isVisible ? 'visible' : ''} ${className}`,
      ...props
    },
    children
  );
}