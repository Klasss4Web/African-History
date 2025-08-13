import { motion } from "motion/react";
import { type ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  stagger?: boolean;
  once?: boolean;
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  stagger = false,
  once = true,
}: AnimatedTextProps) {
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: -30 };
      case "right":
        return { opacity: 0, x: 30 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  if (stagger && typeof children === "string") {
    // Split text into words for stagger effect
    const words = children.split(" ");

    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        }}
        viewport={{ once }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            variants={{
              hidden: getInitialState(),
              visible: {
                ...getAnimateState(),
                transition: {
                  duration,
                  ease: [0.4, 0, 0.2, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={getInitialState()}
      animate={getAnimateState()}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for different text types
export function AnimatedHeading({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
  delay?: number;
}) {
  return (
    <AnimatedText
      className={className}
      delay={delay}
      duration={0.8}
      direction="up"
      stagger={true}
    >
      {children}
    </AnimatedText>
  );
}

export function AnimatedParagraph({
  children,
  className = "",
  delay = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AnimatedText
      className={className}
      delay={delay}
      duration={0.6}
      direction="up"
    >
      {children}
    </AnimatedText>
  );
}

export function AnimatedBadge({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AnimatedText
      className={className}
      delay={delay}
      duration={0.5}
      direction="fade"
    >
      {children}
    </AnimatedText>
  );
}

// Container for staggered multiple elements
export function AnimatedContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
}) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
