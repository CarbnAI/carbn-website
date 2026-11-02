"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { layers } from "@/lib/content/company";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/eyebrow";

const EASE = [0.23, 1, 0.32, 1] as const;

// Explanation motion: the stack assembles from the hardware up, once.
export function StackSchematic({ className }: { className?: string }) {
  const ordered = [...layers].reverse(); // platform on top, hardware at the base
  const count = ordered.length;

  return (
    <figure
      className={cn(
        "border-[1.5px] border-graphite-500 bg-graphite-900",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <span className="type-mono text-graphite-300">carbn / stack</span>
        <Tag>Illustrative</Tag>
      </figcaption>

      <ol className="relative p-4 md:p-6">
        {ordered.map((layer, i) => {
          const fromBottom = count - 1 - i;
          const isEngine = layer.id === "engine";
          const isHardware = layer.id === "hardware";
          const row = (
            <div
              className={cn(
                "group flex items-center justify-between gap-4 border-[1.5px] px-4 py-3.5 transition-[border-color] duration-200 ease-carbn",
                isEngine
                  ? "border-volt bg-graphite-950"
                  : "border-graphite-500 hover:border-graphite-50",
                isHardware && "border-dashed",
              )}
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="type-mono text-graphite-400">
                  {String(fromBottom).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "type-heading text-h5 truncate",
                    isEngine ? "text-volt" : "text-graphite-50",
                  )}
                >
                  {layer.name}
                </span>
              </div>
              <span className="type-label shrink-0 text-graphite-300">
                {layer.distribution}
              </span>
            </div>
          );

          return (
            <motion.li
              key={layer.id}
              initial={{ opacity: 0, transform: "translateY(10px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: 0.25 + fromBottom * 0.08,
              }}
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className="mx-auto block h-3 w-px bg-graphite-500 md:h-4"
                />
              ) : null}
              {layer.href ? (
                <Link href={layer.href} className="block">
                  {row}
                </Link>
              ) : (
                row
              )}
            </motion.li>
          );
        })}
      </ol>

      <dl className="grid grid-cols-1 border-t sm:grid-cols-3">
        {[
          ["Backend", "MAX, vLLM fallback"],
          ["Data path", "On your network"],
          ["Per-token cost", "None"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={cn(
              "px-4 py-3",
              i > 0 && "border-t sm:border-t-0 sm:border-l",
            )}
          >
            <dt className="type-label text-graphite-400">{k}</dt>
            <dd className="type-mono mt-1 text-graphite-50">{v}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
