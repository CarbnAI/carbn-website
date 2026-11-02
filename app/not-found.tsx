import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/status";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative overflow-hidden">
        <div
          aria-hidden
          className="grid-motif pointer-events-none absolute inset-0 opacity-60"
        />
        <div className="shell relative flex min-h-[70vh] flex-col justify-center py-24">
          <Status state="fault">Fault · 404</Status>
          <h1 className="type-display mt-8 max-w-[14ch] text-display-2 text-graphite-50">
            This page is not on the network.
          </h1>
          <p className="measure mt-6 text-body-lg text-graphite-300">
            The address may have changed, or the page never existed. The rest of
            the stack is where you left it.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">
                Back to home
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/products">See the products</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
