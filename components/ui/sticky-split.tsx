"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PinnedTrack, StepRail, usePinnedSteps } from "./pinned";

const EASE = [0.23, 1, 0.32, 1] as const;

export type SplitItem = {
  title: string;
  body: string;
  tag?: string;
  note?: { label: string; text: string };
};

/** Large mono counter that rolls to the active index. */
export function Counter({
  value,
  total,
  className,
}: {
  value: number;
  total: number;
  className?: string;
}) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <div
      className={cn(
        "type-mono flex items-baseline gap-3 text-graphite-400",
        className,
      )}
      aria-hidden
    >
      <span className="relative inline-block h-[1em] overflow-hidden text-[64px] leading-none text-graphite-50 tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ opacity: 0, transform: "translateY(40%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={{ opacity: 0, transform: "translateY(-40%)" }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {pad(value + 1)}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-[14px]">/ {pad(total)}</span>
    </div>
  );
}

function ItemBody({
  item,
  i,
  volt,
}: {
  item: SplitItem;
  i: number;
  volt: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span
          className={cn(
            "type-mono",
            volt ? "text-graphite-950" : "text-graphite-400",
          )}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        {item.tag ? (
          <span
            className={cn(
              "type-label border-[1.5px] px-2 py-1",
              volt
                ? "border-graphite-950"
                : "border-graphite-500 text-graphite-300",
            )}
          >
            {item.tag}
          </span>
        ) : null}
      </div>
      <h3
        className={cn(
          "type-heading mt-6 text-h2",
          volt ? "text-graphite-950" : "text-graphite-50",
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "measure mt-4 text-body-lg",
          volt ? "text-graphite-950" : "text-graphite-300",
        )}
      >
        {item.body}
      </p>
      {item.note ? (
        <div
          className={cn("mt-6 border-t pt-4", volt && "border-graphite-950")}
        >
          <p
            className={cn(
              "type-label",
              volt ? "text-graphite-950" : "text-graphite-400",
            )}
          >
            {item.note.label}
          </p>
          <p
            className={cn(
              "mt-2 text-body",
              volt ? "text-graphite-950" : "text-graphite-50",
            )}
          >
            {item.note.text}
          </p>
        </div>
      ) : null}
    </>
  );
}

/**
 * Pinned split. On large screens the section holds in the viewport while the
 * reader's scrolling advances one item at a time: the item slides up into the
 * frame, the counter rolls and the rail fills. After the last item the section
 * releases. Below `lg` it is a plain stacked list. Purpose: explanation, one
 * point at a time.
 */
export function StickySplit({
  aside,
  items,
  highlight,
  className,
}: {
  aside: React.ReactNode;
  items: SplitItem[];
  /** Index of an item that takes the Volt fill when it is shown. */
  highlight?: number;
  className?: string;
}) {
  const { ref, active, progress, goTo } = usePinnedSteps(items.length);
  const item = items[active];
  const volt = active === highlight;

  return (
    <div className={className}>
      <PinnedTrack trackRef={ref} count={items.length}>
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-5">
            {aside}
            <Counter value={active} total={items.length} className="mt-12" />
          </div>
          <div className="col-span-6 col-start-7">
            {/* Screen readers get every item; the animated card below is visual only. */}
            <ol className="sr-only">
              {items.map((it) => (
                <li key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                  {it.note ? (
                    <p>
                      {it.note.label}: {it.note.text}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
            <div aria-hidden className="relative min-h-[380px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, transform: "translateY(24px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transform: "translateY(-16px)" }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className={cn(
                    "border-[1.5px] p-8 xl:p-10",
                    volt
                      ? "border-volt bg-volt text-graphite-950"
                      : "border-graphite-500 bg-graphite-900",
                  )}
                >
                  <ItemBody item={item} i={active} volt={volt} />
                </motion.div>
              </AnimatePresence>
            </div>
            <StepRail
              count={items.length}
              active={active}
              progress={progress}
              onSelect={goTo}
              labels={items.map((it) => it.title)}
              className="mt-8"
            />
          </div>
        </div>
      </PinnedTrack>

      <div className="mb-10 lg:hidden">{aside}</div>
      <ol className="border-t lg:hidden">
        {items.map((it, i) => {
          const isVolt = i === highlight;
          return (
            <li
              key={it.title}
              className={cn(
                "relative border-b py-8 pl-6 md:py-10 md:pl-8",
                isVolt && "bg-volt pr-6 text-graphite-950 md:pr-8",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 w-[3px]",
                  isVolt ? "bg-graphite-950" : "bg-volt",
                )}
              />
              <ItemBody item={it} i={i} volt={isVolt} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
