import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the Carbn team on on-prem AI, inference and the engineering behind it.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the engineering team"
        lede="Writing on on-prem AI, inference, infrastructure and the engineering behind Carbn."
      />
      <Section>
        {posts.length === 0 ? (
          <p className="text-body-lg text-graphite-300">No posts yet.</p>
        ) : (
          <RevealGroup className="border-t">
            {posts.map((post) => (
              <RevealItem key={post.slug} className="border-b">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 py-8 transition-colors duration-200 ease-carbn hover:bg-graphite-900 md:grid-cols-12 md:gap-8 md:px-4 md:py-10"
                >
                  <div className="md:col-span-3">
                    <time
                      dateTime={post.date}
                      className="type-mono text-graphite-300"
                    >
                      {formatDate(post.date)}
                    </time>
                    <p className="type-mono mt-1 text-graphite-400">
                      {post.readTime}
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="type-heading text-h2 text-graphite-50 transition-colors duration-200 ease-carbn group-hover:text-volt">
                      {post.title}
                    </h2>
                    <p className="measure mt-3 text-body-lg text-graphite-300">
                      {post.excerpt}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <li
                          key={t}
                          className="type-label border-[1.5px] border-graphite-500 px-2 py-1 text-graphite-300"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-body-sm text-graphite-400">
                      By {post.author}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="hidden size-6 stroke-[1.5] text-graphite-400 transition-[translate,color] duration-200 ease-carbn group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-volt md:col-span-1 md:block md:justify-self-end"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
      <CtaBand
        eyebrow="Stay in the loop"
        title="Follow the build in the open"
        body="New notes land here as Carbn moves from design to code. Follow along on GitHub, or tell us what you would like us to write about."
      />
    </>
  );
}
