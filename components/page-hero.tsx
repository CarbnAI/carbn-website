import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

/** Sub-page hero. Its title is the page's single Display line. */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  children,
  className,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="grid-motif pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        className={cn(
          "shell relative grid gap-12 pt-16 pb-14 md:pt-24 md:pb-20",
          children && "lg:grid-cols-12 lg:items-center lg:gap-8",
        )}
      >
        <div className={cn(children && "lg:col-span-6")}>
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h1 className="type-display text-display-2 max-w-[16ch] text-graphite-50">
            {title}
          </h1>
          {lede ? (
            <p className="measure mt-6 text-body-lg text-graphite-300">
              {lede}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {actions}
            </div>
          ) : null}
        </div>
        {children ? <div className="lg:col-span-6">{children}</div> : null}
      </div>
    </section>
  );
}
