import { useState, useEffect, useRef } from "react";

// Counter animation hook with intersection observer
function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16); // 60 FPS

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return { count, elementRef };
}

// Individual counter component
export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  className = "",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { count, elementRef } = useAnimatedCounter(target, duration);

  return (
    <span ref={elementRef} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
