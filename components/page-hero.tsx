import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

/**
 * Sub-page hero, framed as a sheet with the same rule and padding as the
 * footer. Its title is the page's single Display line.
 */
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
  const copy = (
    <>
      {lede ? (
        <p className="measure mt-6 text-body-lg text-graphite-300">{lede}</p>
      ) : null}
      {actions ? (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div>
      ) : null}
    </>
  );

  return (
    <section className={cn("shell py-6 md:py-8", className)}>
      <div className="grid border lg:grid-cols-12">
        <div
          className={cn(
            "flex flex-col justify-center p-6 py-12 md:p-8 md:py-16 lg:py-20",
            children ? "lg:col-span-6" : "lg:col-span-7",
          )}
        >
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h1 className="type-display text-display-2 max-w-[16ch] text-graphite-50">
            {title}
          </h1>
          {children ? copy : null}
        </div>
        {children ? (
          // The visual's figure becomes the cell, so its own frame is dropped.
          <div className="min-w-0 border-t bg-graphite-900 lg:col-span-6 lg:border-t-0 lg:border-l [&>*]:h-full [&_figcaption+*]:flex-1 [&_figure]:flex [&_figure]:h-full [&_figure]:flex-col [&_figure]:border-0 [&_figure]:bg-transparent">
            {children}
          </div>
        ) : (
          <div className="flex flex-col justify-end border-t bg-graphite-900 p-6 md:p-8 lg:col-span-5 lg:border-t-0 lg:border-l [&>:first-child]:mt-0">
            {copy}
          </div>
        )}
      </div>
    </section>
  );
}
