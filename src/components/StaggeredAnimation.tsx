"use client"
import React, { Children, cloneElement, isValidElement, ReactElement, CSSProperties } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StaggeredAnimationProps {
  children: React.ReactNode;
  staggerDelay?: number; // Delay between each child animation (ms)
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-up';
  threshold?: number;
  className?: string;
}

interface ChildProps {
  className?: string;
  style?: CSSProperties;
}

export default function StaggeredAnimation({
  children,
  staggerDelay = 100,
  animation = 'fade-up',
  threshold = 0.1,
  className = ''
}: StaggeredAnimationProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const childrenArray = Children.toArray(children);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {childrenArray.map((child, index) => {
        if (isValidElement<ChildProps>(child)) {
          const childElement = child as ReactElement<ChildProps>;
          return cloneElement(childElement, {
            key: index,
            className: `${childElement.props.className || ''} ${animation} ${isVisible ? 'visible' : ''}`,
            style: {
              ...(childElement.props.style || {}),
              transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
            }
          });
        }
        return child;
      })}
    </div>
  );
}