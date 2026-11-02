"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useId, useState } from "react";
import { PinnedTrack, StepRail, usePinnedSteps } from "@/components/ui/pinned";
import { layers } from "@/lib/content/company";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Interactive architecture: one tab per layer, from the platform down to the
 * hardware. The active marker slides between tabs (spatial consistency) and
 * the detail panel cross-fades in 150ms.
 */
export function LayerExplorer({
  active: controlled,
  onSelect,
}: {
  /** When set, the parent drives the active layer (see PinnedLayerExplorer). */
  active?: string;
  onSelect?: (id: string) => void;
} = {}) {
  const ordered = [...layers].reverse();
  const [own, setOwn] = useState("engine");
  const active = controlled ?? own;
  const setActive = (id: string) => (onSelect ? onSelect(id) : setOwn(id));
  const base = useId();
  const current = ordered.find((l) => l.id === active)!;

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const delta = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = ordered[(index + delta + ordered.length) % ordered.length];
    setActive(next.id);
    document.getElementById(`${base}-tab-${next.id}`)?.focus();
  }

  return (
    <div className="grid border-[1.5px] border-graphite-500 lg:grid-cols-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Carbn layers"
        className="border-b lg:col-span-5 lg:border-r lg:border-b-0"
      >
        {ordered.map((layer, i) => {
          const selected = layer.id === active;
          return (
            <button
              key={layer.id}
              id={`${base}-tab-${layer.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(layer.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative flex min-h-16 w-full items-center justify-between gap-4 px-6 text-left transition-colors duration-200 ease-carbn",
                i > 0 && "border-t",
                selected
                  ? "bg-graphite-900 text-graphite-50"
                  : "text-graphite-300 hover:text-graphite-50",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`${base}-marker`}
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] bg-volt"
                  transition={{ duration: 0.25, ease: EASE }}
                />
              ) : null}
              <span className="flex items-center gap-4">
                <span className="type-mono text-graphite-400">
                  {String(ordered.length - 1 - i).padStart(2, "0")}
                </span>
                <span className="type-heading text-h4">{layer.name}</span>
              </span>
              <span className="type-label hidden text-graphite-400 sm:inline">
                {layer.distribution}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${current.id}`}
        className="relative min-h-[320px] p-6 md:p-10 lg:col-span-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex h-full flex-col"
          >
            <p className="type-label text-graphite-400">
              Layer · {current.distribution}
            </p>
            <h3 className="type-heading mt-4 text-h2 text-graphite-50">
              {current.name}
            </h3>
            <p className="measure mt-4 text-body-lg text-graphite-300">
              {current.role}
            </p>
            {current.href ? (
              <Link
                href={current.href}
                className="link mt-8 inline-flex w-fit items-center gap-2"
              >
                Explore {current.name}
                <ArrowRight className="size-[18px] stroke-[1.5]" aria-hidden />
              </Link>
            ) : (
              <p className="type-mono mt-8 text-graphite-400">
                Carbn fits the hardware already in the rack.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Home-page version: the section pins and scrolling builds the stack from the
 * hardware up, one layer per step. Tabs still work: they scroll to their step.
 * Below `lg` it is the ordinary tabbed explorer.
 */
export function PinnedLayerExplorer({ header }: { header: React.ReactNode }) {
  const bottomUp = layers; // hardware → platform
  const { ref, active, progress, goTo } = usePinnedSteps(bottomUp.length);

  return (
    <>
      <PinnedTrack trackRef={ref} count={bottomUp.length}>
        {header}
        <LayerExplorer
          active={bottomUp[active].id}
          onSelect={(id) => goTo(bottomUp.findIndex((l) => l.id === id))}
        />
        <StepRail
          count={bottomUp.length}
          active={active}
          progress={progress}
          onSelect={goTo}
          labels={bottomUp.map((l) => l.name)}
          className="mt-6"
        />
      </PinnedTrack>
      <div className="lg:hidden">
        {header}
        <LayerExplorer />
      </div>
    </>
  );
}
