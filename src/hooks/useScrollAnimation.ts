"use client"
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number; // How much of element visible before animating (0-1)
  triggerOnce?: boolean; // Animate only once or every time it enters viewport
  delay?: number; // Optional delay in ms
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    triggerOnce = true,
    delay = 0 
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            // If triggerOnce is true, stop observing after animation
            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!triggerOnce) {
            // Reset animation if triggerOnce is false
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return { ref, isVisible };
}