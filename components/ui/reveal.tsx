"use client";

import { motion, type HTMLMotionProps } from "motion/react";

// Scroll reveal: opacity + 12px rise, once, strong ease-out. Purpose: prevents a
// long page from arriving as one flat block. Reduced motion is handled globally
// by MotionConfig (transform dropped, opacity kept).
const EASE = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  delay = 0,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(12px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children by 50ms (capped) as the group enters the viewport. */
export function RevealGroup({
  children,
  className,
  stagger = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, transform: "translateY(12px)" },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
