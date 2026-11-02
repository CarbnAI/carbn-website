import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CarbnLogo } from "@/components/brand/carbn-logo";
import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "Products",
    links: [
      { title: "CarbnEngine", href: "/products/carbn-engine" },
      { title: "CarbnBenchmarks", href: "/products/carbn-benchmarks" },
      { title: "CarbnChat", href: "/products/carbn-chat" },
      { title: "CarbnWorkflows", href: "/products/carbn-workflows" },
      { title: "Carbn Connect", href: "/products/carbn-connect" },
    ],
  },
  {
    title: "Platform",
    links: [
      { title: "CarbnPlatform", href: "/platform" },
      { title: "Security design", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "/contact" },
    ],
  },
];

const social =
  "inline-flex size-11 items-center justify-center border border-graphite-500 text-graphite-300 transition-colors duration-200 ease-carbn hover:border-graphite-50 hover:text-graphite-50";

const legal =
  "type-mono inline-flex min-h-11 items-center whitespace-nowrap text-graphite-300 hover:text-graphite-50";

const cell = "p-6 lg:p-8";

/**
 * A drawing title block: every element sits in a hairline cell, and the rules
 * at cols 4 and 8 run through all three rows. After the CTA band it butts
 * against the Volt band to form one sheet. The wordmark fills its cell, and the
 * cell padding is its clear space x (12/110 of its width). The mark in the
 * first cell carries the name.
 */
export function SiteFooter() {
  return (
    <footer className="shell pb-[clamp(16px,10.46px+1.538vw,32px)]">
      <div className="border border-graphite-500 bg-graphite-900 after-cta:border-t-0">
        <div className="grid grid-cols-2 lg:grid-cols-12">
          <div
            className={cn(
              cell,
              "col-span-2 flex flex-col justify-between gap-6 lg:col-span-4",
            )}
          >
            <CarbnLogo
              form="mark"
              colorway="volt-on-dark"
              className="size-12"
            />
            <Eyebrow className="text-graphite-400">
              In design · building in the open
            </Eyebrow>
          </div>

          {columns.map((col, i) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className={cn(
                cell,
                "border-t lg:col-span-2 lg:border-t-0 lg:border-l",
                i === 1 && "border-l",
                i === 2 && "col-span-2",
              )}
            >
              <Eyebrow className="mb-4 text-graphite-400">{col.title}</Eyebrow>
              <ul className={cn(i === 2 && "flex gap-x-6 lg:block")}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="type-ui inline-flex min-h-10 items-center text-[15px] text-graphite-200 transition-colors duration-200 ease-carbn hover:text-graphite-50"
                    >
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div
            className={cn(
              cell,
              "col-span-2 border-t lg:border-t-0 lg:border-l",
            )}
          >
            <Eyebrow className="mb-4 text-graphite-400">Contact</Eyebrow>
            <a
              href={`mailto:${site.email}`}
              className="link inline-block text-[14px]"
            >
              {site.email}
            </a>
            <p className="mt-3 text-body-sm text-graphite-300">
              {site.location}
            </p>
          </div>
        </div>

        <div className="grid border-t lg:grid-cols-12">
          <div className={cn(cell, "flex flex-col justify-end lg:col-span-4")}>
            <p className="type-heading max-w-[19ch] text-h2 text-graphite-50">
              {site.tagline}
            </p>
          </div>
          <div className="border-t p-[10%] lg:col-span-8 lg:border-t-0 lg:border-l lg:p-[7%]">
            <CarbnLogo
              form="wordmark"
              colorway="reversed"
              aria-hidden
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="grid border-t lg:grid-cols-12">
          <p className={cn(cell, "type-mono text-graphite-300 lg:col-span-4")}>
            © {new Date().getFullYear()} Carbn
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 border-t px-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:px-8">
            <li>
              <Link href="/privacy" className={legal}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={legal}>
                Terms of service
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-3 border-t p-6 lg:col-span-4 lg:justify-end lg:border-t-0 lg:border-l lg:px-8 lg:py-4">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Carbn on LinkedIn"
              className={social}
            >
              <LinkedInLogoIcon className="size-[18px]" aria-hidden />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Carbn on GitHub"
              className={social}
            >
              <GitHubLogoIcon className="size-[18px]" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
