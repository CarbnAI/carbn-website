"use client";

import { AnimatePresence, motion } from "motion/react";
import { PinnedTrack, StepRail, usePinnedSteps } from "@/components/ui/pinned";
import { SectionHeader } from "@/components/ui/section";
import { Counter } from "@/components/ui/sticky-split";
import {
  RouterDiagram,
  type RouterNode,
} from "@/components/visuals/router-diagram";

const EASE = [0.23, 1, 0.32, 1] as const;

// Which part of the request path each component lives in.
const NODE: Record<string, RouterNode> = {
  "Backend adapter interface": "backends",
  "Backend router": "router",
  "Unified inference API": "api",
  "Hardware discovery": "hardware",
  "Model registry": "router",
  "Model provisioning": "hardware",
};

/**
 * Pinned walkthrough of the engine: the request-path diagram holds in frame
 * while scrolling steps through each component, lighting its node.
 */
export function EngineComponents({
  eyebrow,
  title,
  intro,
  rows,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  rows: [string, string][];
}) {
  const { ref, active, progress, goTo } = usePinnedSteps(rows.length);
  const [name, body] = rows[active];

  return (
    <>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <PinnedTrack trackRef={ref} count={rows.length}>
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-5">
            <RouterDiagram focus={NODE[name]} />
          </div>
          <div className="col-span-6 col-start-7">
            <Counter value={active} total={rows.length} />
            <ol className="sr-only">
              {rows.map(([n, b]) => (
                <li key={n}>
                  <h3>{n}</h3>
                  <p>{b}</p>
                </li>
              ))}
            </ol>
            <div aria-hidden className="relative mt-8 min-h-[220px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, transform: "translateY(24px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transform: "translateY(-16px)" }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="border-l-[3px] border-volt pl-8"
                >
                  <h3 className="type-heading text-h1 text-graphite-50">
                    {name}
                  </h3>
                  <p className="measure mt-5 text-body-lg text-graphite-300">
                    {body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <StepRail
              count={rows.length}
              active={active}
              progress={progress}
              onSelect={goTo}
              labels={rows.map(([n]) => n)}
              className="mt-10"
            />
          </div>
        </div>
      </PinnedTrack>

      <ol className="border-t lg:hidden">
        {rows.map(([n, b], i) => (
          <li key={n} className="relative border-b py-8 pl-6 md:pl-8">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[3px] bg-volt"
            />
            <span className="type-mono text-graphite-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="type-heading mt-4 text-h2 text-graphite-50">{n}</h3>
            <p className="measure mt-3 text-body-lg text-graphite-300">{b}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
