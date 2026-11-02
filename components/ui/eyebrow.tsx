import { cn } from "@/lib/utils";

/** Small uppercase label: Archivo width 125, 11px, +0.10em. */
export function Eyebrow({
  className,
  children,
  as: Tag = "p",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={cn("type-label text-graphite-300", className)}>
      {children}
    </Tag>
  );
}

/** Index counter such as "01 / 06", in Azeret Mono. */
export function Index({
  n,
  total,
  className,
}: {
  n: number;
  total?: number;
  className?: string;
}) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <span className={cn("type-mono text-graphite-400", className)}>
      {pad(n)}
      {total ? ` / ${pad(total)}` : null}
    </span>
  );
}

/** Outlined label for non-status annotations such as "Illustrative". No 45° cut: that is reserved for status. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center border-[1.5px] border-graphite-500 px-2 py-1 text-graphite-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
