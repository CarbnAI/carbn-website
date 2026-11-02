import { cn } from "@/lib/utils";

type State = "live" | "degraded" | "fault" | "idle";

// §4.1 status labels. The 45° cut appears only here. Always paired with text.
export function Status({
  state,
  children,
  className,
}: {
  state: State;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center gap-2 border-[1.5px] px-2 py-1",
        state === "live" && "border-volt bg-volt text-graphite-950",
        state === "degraded" &&
          "stripes-45 border-volt bg-volt text-graphite-950",
        state === "fault" && "border-fault bg-fault text-white",
        state === "idle" && "border-graphite-400 text-graphite-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "cut-45 size-2",
          state === "idle"
            ? "bg-graphite-400"
            : state === "fault"
              ? "bg-white"
              : "bg-graphite-950",
        )}
      />
      {children}
    </span>
  );
}
