import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CarbnLogo } from "@/components/brand/carbn-logo";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

type Action = { label: string; href: string; external?: boolean };

/**
 * The closing call to action, identical on every page: the top band of a
 * single sheet with the site footer, sharing its edges and its col 9 rule.
 * Only the content changes. Light-background rules apply on Volt: Graphite 950
 * text, ink buttons, and the logo in its graphite colourway with its clear space.
 */
export function CtaBand({
  eyebrow = "In design",
  title = "Follow along as we build",
  body = "Carbn is being designed and built in the open. Reach out if you want to deploy Carbn on your own infrastructure, or to get involved early.",
  action = { label: "Contact us", href: "/contact" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  action?: Action;
}) {
  return (
    <section data-cta className="shell section-y pb-0!">
      <Reveal className="grid bg-volt text-graphite-950 lg:grid-cols-12">
        <div className="px-6 py-12 md:p-12 lg:col-span-8 lg:p-8 lg:py-20">
          <p className="type-label mb-5">{eyebrow}</p>
          <h2 className="type-heading max-w-[20ch] text-h1">{title}</h2>
          <p className="measure mt-5 text-body-lg">{body}</p>

          <div className="mt-10 flex flex-col items-start gap-5">
            <Button asChild variant="ink">
              {action.external ? (
                <a href={action.href} target="_blank" rel="noreferrer">
                  {action.label}
                  <ArrowRight aria-hidden />
                </a>
              ) : (
                <Link href={action.href}>
                  {action.label}
                  <ArrowRight aria-hidden />
                </Link>
              )}
            </Button>
            <p className="type-mono">
              Or follow the build on{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px]"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>

        {/* p-[75px] is clear space x for a 200px mark. */}
        <div className="hidden items-center justify-center border-l border-graphite-950 lg:col-span-4 lg:flex">
          <div className="p-[75px]">
            <CarbnLogo
              form="mark"
              colorway="graphite"
              className="h-[200px] w-auto"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
