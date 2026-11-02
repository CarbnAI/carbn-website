import { Tag } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export type RouterNode = "caller" | "api" | "router" | "backends" | "hardware";

function Node({
  label,
  name,
  accent,
  dashed,
  focused,
  className,
}: {
  label: string;
  name: string;
  accent?: boolean;
  dashed?: boolean;
  focused?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-[1.5px] px-4 py-3 transition-colors duration-300 ease-out",
        focused ? "border-volt bg-volt" : "bg-graphite-950",
        !focused && (accent ? "border-volt" : "border-graphite-500"),
        dashed && !focused && "border-dashed",
        className,
      )}
    >
      <p
        className={cn(
          "type-label",
          focused ? "text-graphite-950" : "text-graphite-400",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "type-mono mt-1 text-[14px]",
          focused
            ? "text-graphite-950"
            : accent
              ? "text-volt"
              : "text-graphite-50",
        )}
      >
        {name}
      </p>
    </div>
  );
}

function Wire({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("mx-auto block h-6 w-px bg-graphite-500", className)}
    />
  );
}

/**
 * CarbnEngine request path: module → API → router → MAX or vLLM → hardware.
 * With `focus`, one node takes the Volt fill and the default accents drop away.
 */
export function RouterDiagram({
  className,
  focus,
}: {
  className?: string;
  focus?: RouterNode;
}) {
  const accents = !focus;
  return (
    <figure
      className={cn(
        "border-[1.5px] border-graphite-500 bg-graphite-900",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <span className="type-mono text-graphite-300">
          carbn-engine / request path
        </span>
        <Tag>Illustrative</Tag>
      </figcaption>
      <div className="p-4 md:p-6">
        <Node
          label="Caller"
          name="Any Carbn module"
          focused={focus === "caller"}
        />
        <Wire />
        <Node
          label="Unified inference API"
          name="OpenAI-compatible"
          focused={focus === "api"}
        />
        <Wire />
        <Node
          label="Backend router"
          name="per model × hardware"
          accent={accents}
          focused={focus === "router"}
        />
        <div
          aria-hidden
          className="mx-auto h-6 w-1/2 border-x border-t border-graphite-500"
        />
        <div className="grid grid-cols-2 gap-4">
          <Node
            label="Default"
            name="MAX + Mojo"
            accent={accents}
            focused={focus === "backends"}
          />
          <Node label="Fallback" name="vLLM" focused={focus === "backends"} />
        </div>
        <div
          aria-hidden
          className="mx-auto h-6 w-1/2 border-x border-b border-graphite-500"
        />
        <Wire className="h-4" />
        <Node
          label="Your hardware"
          name="Accelerators · CPUs · memory"
          dashed
          focused={focus === "hardware"}
        />
      </div>
    </figure>
  );
}
