"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import * as Nav from "@radix-ui/react-navigation-menu";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CarbnLogo } from "@/components/brand/carbn-logo";
import { Button } from "@/components/ui/button";
import { engineProduct, modules, productHref } from "@/lib/content/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const company = [
  {
    title: "About",
    href: "/about",
    body: "Mission, principles, the build sequence and the founders.",
  },
  {
    title: "Security design",
    href: "/security",
    body: "How Carbn is designed to run, connected or air-gapped.",
  },
  { title: "Blog", href: "/blog", body: "Notes from the engineering team." },
  { title: "Contact", href: "/contact", body: "Tell us what you need to run." },
];

const topLink =
  "type-ui inline-flex h-11 items-center gap-1.5 px-3 text-[14px] text-graphite-300 transition-colors duration-200 ease-carbn hover:text-graphite-50 data-[state=open]:text-graphite-50";

/** A menu option: a Volt rule draws in on its left edge and the arrow slides. */
function MenuLink({
  href,
  title,
  meta,
  children,
  className,
}: {
  href: string;
  title: string;
  meta?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Nav.Link asChild>
      <Link
        href={href}
        className={cn(
          "group/item relative flex h-full flex-col p-5 transition-colors duration-200 ease-carbn hover:bg-graphite-900 focus-visible:bg-graphite-900",
          className,
        )}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-volt transition-transform duration-200 ease-carbn group-hover/item:scale-y-100 group-focus-visible/item:scale-y-100"
        />
        {meta ? (
          <span className="type-label text-graphite-400">{meta}</span>
        ) : null}
        <span
          className={cn(
            "flex items-center justify-between gap-3",
            meta && "mt-2",
          )}
        >
          <span className="type-heading text-h5 text-graphite-50">{title}</span>
          <ArrowRight
            aria-hidden
            className="size-4 shrink-0 stroke-[1.5] text-graphite-400 transition-[translate,color] duration-200 ease-carbn group-hover/item:translate-x-1 group-hover/item:text-volt"
          />
        </span>
        {children ? (
          <span className="mt-2 text-body-sm text-graphite-300">
            {children}
          </span>
        ) : null}
      </Link>
    </Nav.Link>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <Nav.Root
      aria-label="Main"
      className="hidden lg:block"
      delayDuration={120}
      skipDelayDuration={400}
    >
      <Nav.List className="flex items-center">
        <Nav.Item>
          <Nav.Trigger
            className={cn(
              topLink,
              isActive(pathname, "/products") && "text-graphite-50",
            )}
          >
            Products
            <ChevronDown
              aria-hidden
              className="size-3.5 stroke-[1.5] transition-transform duration-200 ease-carbn in-data-[state=open]:rotate-180"
            />
          </Nav.Trigger>
          <Nav.Content className="nav-content">
            <div className="grid grid-cols-12">
              <div className="col-span-4 border-r">
                <MenuLink
                  href={productHref(engineProduct.slug)}
                  title={engineProduct.name}
                  meta={`Core project · ${engineProduct.stage}`}
                  className="bg-graphite-900/60"
                >
                  {engineProduct.summary}
                  <span className="type-mono mt-6 block border-t pt-4 text-graphite-400">
                    MAX + Mojo · vLLM fallback
                  </span>
                </MenuLink>
              </div>
              <ul className="col-span-8 grid grid-cols-2">
                {modules.map((m, i) => (
                  <li
                    key={m.slug}
                    className={cn(
                      i % 2 === 0 && "border-r",
                      i < 2 && "border-b",
                    )}
                  >
                    <MenuLink
                      href={productHref(m.slug)}
                      title={m.name}
                      meta={`${String(i + 1).padStart(2, "0")} · ${i === 0 ? "Flagship module" : "Module"}`}
                    >
                      {m.summary}
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-12 border-t">
              <Nav.Link asChild>
                <Link
                  href="/products"
                  className="type-ui col-span-4 flex items-center gap-2 border-r px-5 py-4 text-[14px] text-graphite-300 hover:text-graphite-50"
                >
                  All products and architecture
                  <ArrowRight className="size-4 stroke-[1.5]" aria-hidden />
                </Link>
              </Nav.Link>
              <Nav.Link asChild>
                <Link
                  href="/platform"
                  className="group/plat col-span-8 flex items-center justify-between gap-4 px-5 py-4 hover:bg-graphite-900"
                >
                  <span className="text-body-sm text-graphite-300">
                    <span className="font-semibold text-graphite-50">
                      CarbnPlatform
                    </span>{" "}
                    · every module as one supported product
                  </span>
                  <span className="type-label text-graphite-400 group-hover/plat:text-volt">
                    Paid · In design
                  </span>
                </Link>
              </Nav.Link>
            </div>
          </Nav.Content>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link asChild active={isActive(pathname, "/platform")}>
            <Link
              href="/platform"
              className={cn(
                topLink,
                isActive(pathname, "/platform") &&
                  "text-graphite-50 underline decoration-volt decoration-[1.5px] underline-offset-[8px]",
              )}
            >
              Platform
            </Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Trigger
            className={cn(
              topLink,
              ["/about", "/security", "/blog"].some((h) =>
                isActive(pathname, h),
              ) && "text-graphite-50",
            )}
          >
            Company
            <ChevronDown
              aria-hidden
              className="size-3.5 stroke-[1.5] transition-transform duration-200 ease-carbn in-data-[state=open]:rotate-180"
            />
          </Nav.Trigger>
          <Nav.Content className="nav-content">
            <div className="grid grid-cols-12">
              <div className="col-span-4 flex flex-col justify-between border-r bg-graphite-900/60 p-5">
                <div>
                  <span className="type-label text-graphite-400">
                    Carbn · {site.location}
                  </span>
                  <p className="type-heading mt-3 text-h4 text-graphite-50">
                    {site.tagline}
                  </p>
                </div>
                <p className="type-mono mt-8 text-graphite-400">
                  In design · building in the open
                </p>
              </div>
              <ul className="col-span-8 grid grid-cols-2">
                {company.map((c, i) => (
                  <li
                    key={c.href}
                    className={cn(
                      i % 2 === 0 && "border-r",
                      i < 2 && "border-b",
                    )}
                  >
                    <MenuLink href={c.href} title={c.title}>
                      {c.body}
                    </MenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </Nav.Content>
        </Nav.Item>
      </Nav.List>

      <div className="absolute inset-x-0 top-full flex justify-center">
        <Nav.Viewport className="nav-viewport" />
      </div>
    </Nav.Root>
  );
}

const mobileGroups = [
  {
    title: "Products",
    links: [
      { title: "CarbnEngine", href: "/products/carbn-engine" },
      ...modules.map((m) => ({ title: m.name, href: productHref(m.slug) })),
      { title: "CarbnPlatform", href: "/platform" },
      { title: "All products", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: company.map(({ title, href }) => ({ title, href })),
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  let n = 0;

  return (
    <header className="sticky top-0 z-50 border-b bg-graphite-950">
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" aria-label="Carbn home" className="-m-2 p-2">
          <CarbnLogo
            form="lockup"
            colorway="volt-on-dark"
            className="h-8 w-auto"
          />
        </Link>

        <DesktopNav pathname={pathname} />

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="secondary">
            <a href={site.github} target="_blank" rel="noreferrer">
              <GitHubLogoIcon aria-hidden />
              GitHub
            </a>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center border-[1.5px] border-graphite-50 lg:hidden"
            >
              <Menu className="size-[18px] stroke-[1.5]" aria-hidden />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content
              aria-describedby={undefined}
              className="menu-panel fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-graphite-950 lg:hidden"
            >
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <div className="shell flex h-16 shrink-0 items-center justify-between border-b md:h-[72px]">
                <Link href="/" aria-label="Carbn home" className="-m-2 p-2">
                  <CarbnLogo
                    form="lockup"
                    colorway="volt-on-dark"
                    className="h-8 w-auto"
                  />
                </Link>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center border-[1.5px] border-graphite-50"
                  >
                    <X className="size-[18px] stroke-[1.5]" aria-hidden />
                  </button>
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile" className="shell flex-1 space-y-10 py-8">
                {mobileGroups.map((group) => (
                  <div key={group.title}>
                    <p
                      className="type-label menu-item mb-3 text-graphite-400"
                      style={{ "--i": n++ } as React.CSSProperties}
                    >
                      {group.title}
                    </p>
                    <ul className="border-t">
                      {group.links.map((item) => (
                        <li
                          key={item.href}
                          className="menu-item border-b"
                          style={{ "--i": n++ } as React.CSSProperties}
                        >
                          <Link
                            href={item.href}
                            aria-current={
                              isActive(pathname, item.href) ? "page" : undefined
                            }
                            className="type-heading flex min-h-12 items-center justify-between py-3 text-h4 text-graphite-50 aria-[current=page]:text-volt"
                          >
                            {item.title}
                            <ArrowUpRight
                              className="size-5 stroke-[1.5] text-graphite-400"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
              <div className="shell grid gap-3 border-t py-6 sm:grid-cols-2">
                <Button asChild>
                  <Link href="/contact">Contact us</Link>
                </Button>
                <Button asChild variant="secondary">
                  <a href={site.github} target="_blank" rel="noreferrer">
                    <GitHubLogoIcon aria-hidden />
                    GitHub
                  </a>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
