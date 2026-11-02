"use client";

import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Scroll distance each step occupies while the section is pinned. */
const STEP_VH = 55;

/**
 * Scroll-driven pinning. The section holds in the viewport while the reader's
 * own scrolling advances it one step at a time; after the last step it
 * releases and the page continues. Scroll is never captured or blocked, so
 * trackpads, keyboards, find-in-page and assistive tech behave normally.
 */
export function usePinnedSteps(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Only the active step lives in React state; continuous progress stays a
  // motion value so the fills update without re-rendering every frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  /** Scrolls to the middle of step `i`. */
  const goTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + (travel * (i + 0.5)) / count,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    },
    [count],
  );

  return { ref, active, progress: scrollYProgress, goTo };
}

/**
 * Outer track (tall, sets the scroll distance) and inner frame (sticky, one
 * viewport tall under the header). Desktop only; render a stacked fallback
 * below `lg`.
 */
export function PinnedTrack({
  trackRef,
  count,
  className,
  children,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  count: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={trackRef}
      className="relative hidden lg:block"
      style={{ height: `calc(100svh + ${(count - 1) * STEP_VH}svh)` }}
    >
      <div
        className={cn(
          "sticky top-[72px] flex h-[calc(100svh-72px)] flex-col justify-center",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Segment({
  i,
  count,
  progress,
}: {
  i: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const transform = useTransform(
    progress,
    (v) => `scaleX(${Math.min(1, Math.max(0, v * count - i))})`,
  );
  return (
    <motion.span
      className="absolute inset-0 origin-left bg-graphite-50"
      style={{ transform }}
    />
  );
}

/** Segmented progress rail: past steps solid, the current step fills with scroll. */
export function StepRail({
  count,
  active,
  progress,
  onSelect,
  labels,
  className,
}: {
  count: number;
  active: number;
  progress: MotionValue<number>;
  onSelect?: (i: number) => void;
  labels?: string[];
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect?.(i)}
          aria-label={labels ? `Go to ${labels[i]}` : `Go to step ${i + 1}`}
          aria-current={i === active ? "step" : undefined}
          className="group flex min-h-11 flex-col justify-center"
        >
          <span className="relative block h-[3px] w-full overflow-hidden bg-graphite-500">
            <Segment i={i} count={count} progress={progress} />
          </span>
          <span
            className={cn(
              "type-mono mt-3 text-left transition-colors duration-200 ease-carbn",
              i === active
                ? "text-graphite-50"
                : "text-graphite-400 group-hover:text-graphite-200",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </button>
      ))}
    </div>
  );
}
