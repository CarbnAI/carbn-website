import { cn } from "@/lib/utils";
import { Index } from "./eyebrow";
import { RevealGroup, RevealItem } from "./reveal";

/**
 * Cell surfaces. Volt is the focal cell: at most one per group, for the item
 * that matters most. Paper (Graphite 50) is a secondary emphasis. Panel and
 * dots give rhythm without adding colour. No 45° patterns: those belong to
 * status labels only.
 */
export type CellTone = "default" | "volt" | "paper" | "panel" | "dots";

const RHYTHM: CellTone[] = [
  "default",
  "panel",
  "default",
  "dots",
  "default",
  "panel",
  "default",
  "dots",
];

/** Picks a tone for cell `i`: the highlight gets Volt, the rest follow a quiet rhythm. */
export function toneFor(
  i: number,
  highlight?: number,
  paper?: number,
): CellTone {
  if (i === highlight) return "volt";
  if (i === paper) return "paper";
  return RHYTHM[i % RHYTHM.length];
}

export function Cells({
  className,
  cols = 3,
  children,
}: {
  className?: string;
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
}) {
  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-1 border-t border-l",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </RevealGroup>
  );
}

export function Cell({
  n,
  total,
  title,
  children,
  className,
  icon,
  tone = "default",
  tag,
}: {
  n?: number;
  total?: number;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  tone?: CellTone;
  tag?: string;
}) {
  const light = tone === "volt" || tone === "paper";
  return (
    <RevealItem
      className={cn(
        "relative flex min-w-0 flex-col border-r border-b p-6 md:p-8",
        tone === "volt" && "bg-volt text-graphite-950",
        tone === "paper" && "bg-graphite-50 text-graphite-950",
        tone === "panel" && "bg-graphite-900",
        className,
      )}
    >
      {tone === "dots" ? (
        // Dot field fills the top of the cell only, so it never sits behind the text.
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[42%] bg-[radial-gradient(var(--color-graphite-600)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
      ) : null}
      {n || icon || tag ? (
        <div className="mb-8 flex items-start justify-between gap-4 md:mb-12">
          {n ? (
            tone === "volt" ? (
              <span className="type-mono text-[48px] leading-none text-graphite-950">
                {String(n).padStart(2, "0")}
              </span>
            ) : (
              <Index
                n={n}
                total={total}
                className={cn(tone === "paper" && "text-graphite-600")}
              />
            )
          ) : (
            <span />
          )}
          {tag ? (
            <span
              className={cn(
                "type-label border-[1.5px] px-2 py-1",
                light
                  ? "border-graphite-950 text-graphite-950"
                  : "border-graphite-500 text-graphite-300",
              )}
            >
              {tag}
            </span>
          ) : null}
          {icon ? (
            <span
              className={cn(
                "[&_svg]:size-5 [&_svg]:stroke-[1.5]",
                light ? "text-graphite-950" : "text-graphite-300",
              )}
            >
              {icon}
            </span>
          ) : null}
        </div>
      ) : null}
      <h3
        className={cn(
          "type-heading text-h4",
          light ? "text-graphite-950" : "text-graphite-50",
        )}
      >
        {title}
      </h3>
      {children ? (
        <p
          className={cn(
            "mt-3 text-body",
            tone === "volt"
              ? "text-graphite-950"
              : tone === "paper"
                ? "text-graphite-700"
                : "text-graphite-300",
          )}
        >
          {children}
        </p>
      ) : null}
    </RevealItem>
  );
}
