import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Cell, Cells, toneFor } from "@/components/ui/cells";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { StickySplit } from "@/components/ui/sticky-split";
import { ProductVisual } from "@/components/visuals/product-visuals";
import { EngineComponents } from "./engine-components";
import { MeasureGlyph, RenderingSpecimen } from "./spec-glyphs";
import {
  getProduct,
  productHref,
  products,
  type ProductSection,
  type ProductSlug,
} from "@/lib/content/products";
import { site } from "@/lib/site";

function SpecGrid({
  rows,
  highlight,
  render,
  footer,
}: {
  rows: [string, string][];
  highlight: number;
  render: (i: number, light: boolean) => React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <RevealGroup className="grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4">
      {rows.map(([name, body], i) => {
        const volt = i === highlight;
        return (
          <RevealItem
            key={name}
            className={
              volt
                ? "group flex min-w-0 flex-col border-r border-b bg-volt p-6 text-graphite-950"
                : "group flex min-w-0 flex-col border-r border-b p-6 transition-colors duration-200 ease-carbn hover:bg-graphite-900"
            }
          >
            <div
              className={
                volt
                  ? "text-graphite-950"
                  : "text-graphite-400 transition-colors duration-200 ease-carbn group-hover:text-volt"
              }
            >
              {render(i, volt)}
            </div>
            <span
              className={
                volt
                  ? "type-mono mt-8 text-graphite-950"
                  : "type-mono mt-8 text-graphite-400"
              }
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={
                volt
                  ? "type-heading mt-2 text-h5"
                  : "type-heading mt-2 text-h5 text-graphite-50"
              }
            >
              {name}
            </h3>
            <p
              className={
                volt ? "mt-2 text-body" : "mt-2 text-body text-graphite-300"
              }
            >
              {body}
            </p>
          </RevealItem>
        );
      })}
      {footer}
    </RevealGroup>
  );
}

function ExtraSection({ section }: { section: ProductSection }) {
  if (section.kind === "components") {
    return (
      <Section>
        <EngineComponents
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
          rows={section.rows}
        />
      </Section>
    );
  }

  if (section.kind === "measures" || section.kind === "rendering") {
    const measures = section.kind === "measures";
    return (
      <Section>
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
        />
        <SpecGrid
          rows={section.rows}
          highlight={measures ? 2 : section.rows.length - 1}
          render={(i, light) =>
            measures ? (
              <MeasureGlyph index={i} />
            ) : (
              <RenderingSpecimen index={i} light={light} />
            )
          }
          footer={
            measures ? (
              <RevealItem className="flex flex-col justify-end border-r border-b bg-graphite-50 p-6 text-graphite-950">
                <p className="type-label text-graphite-600">No figures here</p>
                <p className="type-heading mt-2 text-h5">
                  The shapes are illustrative. The numbers come from your own
                  hardware.
                </p>
              </RevealItem>
            ) : null
          }
        />
      </Section>
    );
  }

  if (section.kind === "steps") {
    return (
      <Section>
        <StickySplit
          aside={
            <>
              <Eyebrow className="mb-4">{section.eyebrow}</Eyebrow>
              <h2 className="type-heading text-h1 text-graphite-50">
                {section.title}
              </h2>
              {section.intro ? (
                <p className="measure mt-5 text-body-lg text-graphite-300">
                  {section.intro}
                </p>
              ) : null}
            </>
          }
          items={section.items}
          highlight={section.items.length - 1}
        />
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        intro={section.intro}
      />
      {section.kind === "cells" ? (
        <Cells
          cols={
            section.items.length === 4 ? 4 : section.items.length === 2 ? 2 : 3
          }
        >
          {section.items.map((item, i) => (
            <Cell
              n={i + 1}
              total={section.items.length}
              key={item.title}
              title={item.title}
              tone={toneFor(i, section.highlight)}
            >
              {item.body}
            </Cell>
          ))}
        </Cells>
      ) : null}

      {section.kind === "table" ? (
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-y">
                <th
                  scope="col"
                  className="type-label w-1/3 py-4 pr-6 text-graphite-400"
                >
                  {section.columns[0]}
                </th>
                <th scope="col" className="type-label py-4 text-graphite-400">
                  {section.columns[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map(([a, b]) => (
                <tr key={a} className="border-b">
                  <th
                    scope="row"
                    className="type-heading py-5 pr-6 align-top text-h5 text-graphite-50"
                  >
                    {a}
                  </th>
                  <td className="py-5 align-top text-body text-graphite-300">
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      ) : null}
    </Section>
  );
}

export function ProductPage({ slug }: { slug: ProductSlug }) {
  const product = getProduct(slug);
  const index = products.findIndex((p) => p.slug === slug);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];
  const isModule = product.kind === "Module";

  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Link
              href="/products"
              className="-my-3 inline-block py-3 hover:text-graphite-50"
            >
              Products
            </Link>{" "}
            / {product.stage}
          </>
        }
        title={product.name}
        lede={product.lede}
        actions={
          <>
            <Button asChild>
              <Link href="/contact">
                Contact us
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={site.github} target="_blank" rel="noreferrer">
                <GitHubLogoIcon aria-hidden />
                Follow on GitHub
              </a>
            </Button>
          </>
        }
      >
        <Reveal delay={0.1}>
          <ProductVisual slug={slug} />
        </Reveal>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="mb-4">Overview</Eyebrow>
            <h2 className="type-heading text-h1 text-graphite-50">
              What is {product.name}?
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <div className="measure space-y-5 text-body-lg text-graphite-300">
              {product.what.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Key features"
          title={product.featuresTitle}
          intro={product.featuresIntro}
        />
        <Cells cols={product.features.length % 4 === 0 ? 4 : 3}>
          {product.features.map((f, i) => (
            <Cell
              n={i + 1}
              total={product.features.length}
              key={f.title}
              title={f.title}
              tone={toneFor(i, product.featureHighlight)}
            >
              {f.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      {product.sections.map((s) => (
        <ExtraSection key={s.title} section={s} />
      ))}

      {isModule ? (
        <Section>
          <Reveal className="grid gap-8 border-[1.5px] border-graphite-500 p-6 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-8">
              <Eyebrow className="mb-3">Runs on CarbnEngine</Eyebrow>
              <p className="type-heading text-h3 text-graphite-50">
                {product.name} calls one inference API. It never needs to know
                whether MAX or vLLM served the request.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <Link
                href="/products/carbn-engine"
                className="link inline-flex items-center gap-2"
              >
                About CarbnEngine
                <ArrowRight className="size-[18px] stroke-[1.5]" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Section>
      ) : null}

      <nav aria-label="More products" className="border-t">
        <div className="shell grid sm:grid-cols-2">
          <Link
            href={productHref(prev.slug)}
            className="group flex flex-col gap-2 border-b py-8 transition-colors duration-200 ease-carbn hover:text-volt sm:border-r sm:border-b-0 sm:pr-8"
          >
            <span className="type-label inline-flex items-center gap-2 text-graphite-400">
              <ArrowLeft className="size-3.5 stroke-[1.5]" aria-hidden />{" "}
              Previous
            </span>
            <span className="type-heading text-h3">{prev.name}</span>
          </Link>
          <Link
            href={productHref(next.slug)}
            className="group flex flex-col items-end gap-2 py-8 text-right transition-colors duration-200 ease-carbn hover:text-volt sm:pl-8"
          >
            <span className="type-label inline-flex items-center gap-2 text-graphite-400">
              Next <ArrowRight className="size-3.5 stroke-[1.5]" aria-hidden />
            </span>
            <span className="type-heading text-h3">{next.name}</span>
          </Link>
        </div>
      </nav>

      <CtaBand
        eyebrow={product.stage}
        title={`${product.name} is in design`}
        body="Follow the project on GitHub, or get in touch if you want to deploy Carbn on your own infrastructure."
      />
    </>
  );
}
