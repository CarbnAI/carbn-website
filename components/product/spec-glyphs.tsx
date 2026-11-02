import { cn } from "@/lib/utils";

/*
 * Small schematic glyphs. They show the shape of each idea, never a figure:
 * the site makes no performance claims. Strokes use currentColor so the
 * parent decides the tone.
 */
const svg = "h-14 w-full max-w-[160px]";

export function MeasureGlyph({ index }: { index: number }) {
  switch (index) {
    case 0: // Throughput: rising bars
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="currentColor"
        >
          {[14, 22, 31, 40, 48].map((h, i) => (
            <rect key={i} x={8 + i * 30} y={56 - h} width="18" height={h} />
          ))}
        </svg>
      );
    case 1: // Time to first token: request, gap, then tokens
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 28 H156" opacity="0.4" />
          <rect
            x="4"
            y="20"
            width="6"
            height="16"
            fill="currentColor"
            stroke="none"
          />
          <path d="M14 14 V42 M56 14 V42" strokeDasharray="2 3" />
          {[60, 70, 80, 90, 100, 110, 120, 130, 140, 150].map((x) => (
            <rect
              key={x}
              x={x}
              y="22"
              width="5"
              height="12"
              fill="currentColor"
              stroke="none"
            />
          ))}
        </svg>
      );
    case 2: // Latency distribution: histogram with a long tail
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="currentColor"
        >
          {[6, 18, 36, 48, 40, 26, 16, 10, 7, 5, 4, 3, 3, 2].map((h, i) => (
            <rect key={i} x={4 + i * 11} y={56 - h} width="9" height={h} />
          ))}
        </svg>
      );
    case 3: // Concurrency limit: holds, then drops past the limit
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M108 4 V52" strokeDasharray="3 3" />
          <path d="M4 44 L28 40 L52 34 L76 22 L100 14 L112 12 L124 30 L140 46 L156 50" />
        </svg>
      );
    case 4: // Memory: used and headroom
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="4" y="16" width="152" height="24" />
          <rect
            x="4"
            y="16"
            width="104"
            height="24"
            fill="currentColor"
            stroke="none"
          />
          <path d="M112 28 H152" strokeDasharray="2 3" />
        </svg>
      );
    case 5: // Utilisation: cores in use
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 4 + (i % 8) * 19;
            const y = i < 8 ? 6 : 32;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width="14"
                height="18"
                fill={i % 8 < 6 ? "currentColor" : "none"}
              />
            );
          })}
        </svg>
      );
    default: // Power draw: draw over time
      return (
        <svg
          viewBox="0 0 160 56"
          className={svg}
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 46 H20 V20 H44 V30 H64 V12 H92 V26 H112 V18 H136 V40 H156" />
        </svg>
      );
  }
}

/** Specimens for the CarbnChat rendering standard, one per content type. */
export function RenderingSpecimen({
  index,
  light,
}: {
  index: number;
  light?: boolean;
}) {
  const ink = light ? "text-graphite-950" : "text-graphite-50";
  const soft = light ? "text-graphite-700" : "text-graphite-400";
  const line = light ? "bg-graphite-950" : "bg-graphite-300";
  const frame = cn(
    "h-[72px] border-[1.5px] p-3",
    light ? "border-graphite-950" : "border-graphite-500",
  );
  switch (index) {
    case 0:
      return (
        <div className={frame}>
          <div className={cn("h-2 w-1/2", line)} />
          <div className={cn("mt-2 h-1 w-5/6 opacity-60", line)} />
          <div className={cn("mt-1.5 h-1 w-2/3 opacity-60", line)} />
          <div className={cn("mt-1.5 h-1 w-1/3 opacity-60", line)} />
        </div>
      );
    case 1:
      return (
        <div
          className={cn(
            frame,
            "type-mono flex flex-col justify-between text-[11px]",
          )}
        >
          <span className={soft}>ts · copy</span>
          <span className={ink}>const engine = route(model);</span>
        </div>
      );
    case 2:
      return (
        <div className={cn(frame, "grid grid-cols-3 gap-px p-0")}>
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "border-r border-b last:border-0",
                light ? "border-graphite-950/40" : "border-graphite-700",
                i < 3 && (light ? "bg-graphite-950/10" : "bg-graphite-800"),
              )}
            />
          ))}
        </div>
      );
    case 3:
      return (
        <div
          className={cn(
            frame,
            "type-mono flex items-center justify-center text-[18px]",
            ink,
          )}
        >
          x̄ = ∑ xᵢ / n
        </div>
      );
    case 4:
      return (
        <div className={cn(frame, "flex items-center justify-between gap-2")}>
          {["A", "B", "C"].map((t, i) => (
            <span key={t} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "type-mono flex h-8 flex-1 items-center justify-center border text-[11px]",
                  ink,
                  light ? "border-graphite-950" : "border-graphite-400",
                )}
              >
                {t}
              </span>
              {i < 2 ? <span className={cn("h-px w-3", line)} /> : null}
            </span>
          ))}
        </div>
      );
    case 5:
      return (
        <div className={cn(frame, "flex flex-col justify-between")}>
          <span className={cn("type-label", soft)}>Reasoning ▸</span>
          <div className={cn("h-1.5 w-3/4", line)} />
        </div>
      );
    case 6:
      return (
        <div
          className={cn(
            frame,
            "type-mono flex flex-col justify-between text-[11px]",
          )}
        >
          <span className={soft}>tool · read_file</span>
          <span className={ink}>input → result</span>
        </div>
      );
    default:
      return (
        <div className={cn(frame, "flex items-center gap-3")}>
          <span
            className={cn(
              "h-10 w-8 border-[1.5px]",
              light ? "border-graphite-950" : "border-volt",
            )}
          />
          <span className={cn("type-mono text-[11px]", ink)}>report.pdf</span>
        </div>
      );
  }
}
