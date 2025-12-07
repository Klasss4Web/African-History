import { useState, useEffect, useRef } from "react";

function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false); // ✅ Separate state for animation
  const elementRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Observe the element and set shouldAnimate to true
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
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
  }, []); // ✅ Empty dependency array to run only once

  // 2. Start the animation when shouldAnimate becomes true
  useEffect(() => {
    if (shouldAnimate) {
      let start = 0;
      const increment = target / (duration / 16);

      timerRef.current = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timerRef.current as NodeJS.Timeout);
          timerRef.current = null;
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }

    // 3. Cleanup: Clear the timer when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [shouldAnimate, target, duration]); // ✅ Reruns when shouldAnimate or props change

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
