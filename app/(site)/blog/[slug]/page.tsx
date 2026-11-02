import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MarkdownRenderer } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // The page header already shows the title; drop a leading "# Title" line.
  const body = post.content.replace(/^\s*#\s+.*\n/, "");
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b">
          <div className="shell relative pt-12 pb-14 md:pt-20 md:pb-20">
            <Link
              href="/blog"
              className="type-label inline-flex items-center gap-2 text-graphite-300 hover:text-graphite-50"
            >
              <ArrowLeft className="size-3.5 stroke-[1.5]" aria-hidden /> All
              posts
            </Link>
            <h1 className="type-display mt-10 max-w-[20ch] text-display-2 text-graphite-50">
              {post.title}
            </h1>
            <p className="measure mt-6 text-body-lg text-graphite-300">
              {post.excerpt}
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t pt-6">
              {[
                ["Author", post.author],
                [
                  "Published",
                  <time key="d" dateTime={post.date}>
                    {date}
                  </time>,
                ],
                ["Reading time", post.readTime],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="type-label text-graphite-400">{k}</dt>
                  <dd className="type-mono mt-1 text-graphite-50">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>
        <div className="shell section-y grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <Eyebrow className="mb-4">Tags</Eyebrow>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="type-label border-[1.5px] border-graphite-500 px-2 py-1 text-graphite-300"
                >
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <div className="min-w-0 lg:col-span-9">
            <MarkdownRenderer content={body} />
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
