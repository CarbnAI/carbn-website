import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export function Section({
  className,
  children,
  id,
  rule = true,
  ...props
}: React.HTMLAttributes<HTMLElement> & { rule?: boolean }) {
  return (
    <section
      id={id}
      className={cn("section-y", rule && "border-t", className)}
      {...props}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
  aside,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-8",
        className,
      )}
    >
      <div className="lg:col-span-7">
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <h2 className="type-heading text-h1 text-graphite-50">{title}</h2>
        {intro ? (
          <p className="measure mt-4 text-body-lg text-graphite-300">{intro}</p>
        ) : null}
      </div>
      {aside ? (
        <div className="lg:col-span-5 lg:justify-self-end">{aside}</div>
      ) : null}
    </div>
  );
}
