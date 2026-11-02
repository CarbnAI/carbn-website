"use client";

import { AnimatePresence, motion, useTransform } from "motion/react";
import { PinnedTrack, usePinnedSteps } from "@/components/ui/pinned";
import type { Item } from "@/lib/content/products";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;
const pad = (v: number) => String(v).padStart(2, "0");

/**
 * Build sequence. On large screens the section pins and scrolling walks the
 * stages: a Graphite 50 line fills down the rail and the active stage's detail
 * slides into the frame. The fill tracks reading progress, not delivery: only
 * stage 01 carries Volt, because nothing is built yet.
 */
export function BuildTimeline({ items }: { items: Item[] }) {
  const { ref, active, progress, goTo } = usePinnedSteps(items.length);
  const current = items[active];
  const fill = useTransform(progress, (v) => `scaleY(${v})`);

  return (
    <>
      <PinnedTrack trackRef={ref} count={items.length}>
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-5">
            <p className="type-label mb-8 text-graphite-400">
              Build sequence · in order of priority
            </p>
            <ol className="relative">
              <span
                aria-hidden
                className="absolute top-3 bottom-3 left-[7px] w-px bg-graphite-500"
              />
              <motion.span
                aria-hidden
                className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-graphite-50"
                style={{ transform: fill }}
              />
              {items.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? "step" : undefined}
                    className="group relative flex min-h-11 w-full items-center gap-5 pl-10 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 size-4 border-[1.5px] transition-colors duration-300 ease-out",
                        i === 0
                          ? "border-volt bg-volt"
                          : i <= active
                            ? "border-graphite-50 bg-graphite-950"
                            : "border-graphite-500 bg-graphite-950",
                      )}
                    />
                    <span className="type-mono text-graphite-400">
                      {pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "type-heading text-h5 transition-colors duration-200 ease-carbn",
                        i === active
                          ? "text-graphite-50"
                          : "text-graphite-400 group-hover:text-graphite-200",
                      )}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <ol className="sr-only">
            {items.map((it, n) => (
              <li key={it.title}>
                <h3>
                  {pad(n + 1)}. {it.title} ({n === 0 ? "first" : "planned"})
                </h3>
                <p>{it.body}</p>
              </li>
            ))}
          </ol>
          <div
            aria-hidden
            className="relative col-span-6 col-start-7 min-h-[300px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, transform: "translateY(24px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(-16px)" }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="type-mono text-[64px] leading-none text-graphite-50">
                    {pad(active + 1)}
                  </span>
                  <span className="type-mono text-graphite-400">
                    / {pad(items.length)}
                  </span>
                  <span
                    className={cn(
                      "type-label ml-auto border-[1.5px] px-2 py-1",
                      active === 0
                        ? "border-volt bg-volt text-graphite-950"
                        : "border-graphite-500 text-graphite-300",
                    )}
                  >
                    {active === 0 ? "First" : "Planned"}
                  </span>
                </div>
                <h3 className="type-heading mt-8 text-h1 text-graphite-50">
                  {current.title}
                </h3>
                <p className="measure mt-5 text-body-lg text-graphite-300">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </PinnedTrack>

      <ol className="relative lg:hidden">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px bg-graphite-500"
        />
        {items.map((s, i) => (
          <li key={s.title} className="relative pb-10 pl-10">
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 left-0 size-4 border-[1.5px]",
                i === 0
                  ? "border-volt bg-volt"
                  : "border-graphite-500 bg-graphite-950",
              )}
            />
            <span className="type-mono text-graphite-400">
              {pad(i + 1)} / {pad(items.length)}
            </span>
            <p
              className={cn(
                "type-label mt-1",
                i === 0 ? "text-volt" : "text-graphite-400",
              )}
            >
              {i === 0 ? "First" : "Planned"}
            </p>
            <h3 className="type-heading mt-3 text-h3 text-graphite-50">
              {s.title}
            </h3>
            <p className="measure mt-2 text-body text-graphite-300">{s.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
