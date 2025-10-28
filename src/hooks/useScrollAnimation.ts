import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

export const useStaggeredAnimation = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
};

export const useScrollDirection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      // Account for newsletter banner height (48px) + some buffer
      const threshold = 150;

      // Always show header at the very top
      if (scrollY <= 50) {
        setIsVisible(true);
      } else if (scrollY > lastScrollY && scrollY > threshold) {
        // Scrolling down and past threshold - hide header
        setIsVisible(false);
      } else if (scrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [lastScrollY]);

  return isVisible;
};