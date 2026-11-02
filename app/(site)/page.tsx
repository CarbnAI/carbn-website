import { ArrowRight, Check, Minus } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ModuleCard } from "@/components/product/module-card";
import { Button } from "@/components/ui/button";
import { Cell, Cells, toneFor } from "@/components/ui/cells";
import { Eyebrow, Index } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { StickySplit } from "@/components/ui/sticky-split";
import { PinnedLayerExplorer } from "@/components/visuals/layer-explorer";
import { RouterDiagram } from "@/components/visuals/router-diagram";
import { StackSchematic } from "@/components/visuals/stack-schematic";
import {
  audience,
  buildSequence,
  options,
  positioning,
  scope,
  whyOnPrem,
} from "@/lib/content/company";
import { engineProduct, modules } from "@/lib/content/products";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="shell py-6 md:py-8">
        <div className="grid border lg:grid-cols-12">
          <div className="flex flex-col justify-center p-6 py-12 md:p-8 md:py-16 lg:col-span-7">
            <Eyebrow className="mb-8">In design · building in the open</Eyebrow>
            <h1 className="type-display text-display-1 text-graphite-50">
              <span className="lg:block">Your entire AI stack.</span>{" "}
              <span className="text-volt lg:block">Your own hardware.</span>
            </h1>
            <p className="measure mt-8 text-body-lg text-graphite-300">
              Carbn brings what hosted AI vendors deliver (chat, workflows and
              integrations) to the servers you already own. Your data stays on
              your network, and there is no per-token cost.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">
                  Contact us
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/products">Explore the stack</Link>
              </Button>
            </div>
          </div>
          <div className="min-w-0 border-t bg-graphite-900 lg:col-span-5 lg:border-t-0 lg:border-l">
            <StackSchematic />
          </div>
        </div>
      </section>

      {/* The problem */}
      <Section>
        <StickySplit
          aside={
            <>
              <Eyebrow className="mb-4">The problem</Eyebrow>
              <h2 className="type-heading text-h1 text-graphite-50">
                Three options today, and each leaves a gap
              </h2>
              <p className="measure mt-5 text-body-lg text-graphite-300">
                Many organisations need a real AI capability but cannot send
                their data to an external service. The closest fit leaves the
                platform team to choose an engine, test models, connect a chat
                interface, add authentication, build integrations and keep it
                all updated. The result is often a system only one person can
                run.
              </p>
            </>
          }
          items={[
            ...options.map((o) => ({
              title: o.name,
              body: o.provides,
              note: { label: "Leaves unsolved", text: o.gap },
            })),
            {
              title: "Carbn",
              tag: "The whole machine",
              body: "The completeness of a hosted vendor with the control of your own hardware, delivered as one system rather than a collection of parts.",
              note: { label: "In short", text: positioning },
            },
          ]}
          highlight={3}
        />
      </Section>

      {/* Why on-prem */}
      <Section>
        <SectionHeader
          eyebrow="Why on-prem AI"
          title="AI that never leaves your infrastructure"
          intro="Government entities, regulated industries, security-conscious teams and companies with existing server capacity need AI that stays inside the building."
        />
        <Cells cols={4}>
          {whyOnPrem.map((item, i) => (
            <Cell
              n={i + 1}
              total={whyOnPrem.length}
              key={item.title}
              title={item.title}
              tone={toneFor(i, 0)}
            >
              {item.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      {/* Architecture */}
      <Section>
        <PinnedLayerExplorer
          header={
            <SectionHeader
              className="md:mb-10"
              eyebrow="The whole machine"
              title="An engine, a set of modules and a platform"
              intro="Everything runs on your own servers, and each layer can be adopted on its own."
              aside={
                <Link
                  href="/products"
                  className="link inline-flex items-center gap-2"
                >
                  See the full architecture
                  <ArrowRight
                    className="size-[18px] stroke-[1.5]"
                    aria-hidden
                  />
                </Link>
              }
            />
          }
        />
      </Section>

      {/* Engine */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-4">
              CarbnEngine · {engineProduct.stage}
            </Eyebrow>
            <h2 className="type-heading text-h1 text-graphite-50">
              One engine for whatever hardware is in the rack
            </h2>
            <p className="measure mt-6 text-body-lg text-graphite-300">
              The core inference engine and the foundation everything else
              depends on. CarbnEngine runs open models on the hardware you
              already own, and it is the default engine behind every Carbn
              module.
            </p>
            <dl className="mt-10 border-t">
              {[
                [
                  "Primary backend",
                  "Modular MAX and Mojo: one codebase across different processors.",
                ],
                [
                  "Secondary backend",
                  "vLLM, for models or hardware MAX does not yet support, and for side-by-side comparison.",
                ],
                [
                  "One interface",
                  "An OpenAI-compatible API every module calls, whichever backend serves the request.",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-2 border-b py-4 sm:grid-cols-3 sm:gap-6"
                >
                  <dt className="type-label pt-1 text-graphite-400">{k}</dt>
                  <dd className="text-body text-graphite-50 sm:col-span-2">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/products/carbn-engine"
              className="link mt-8 inline-flex items-center gap-2"
            >
              Explore CarbnEngine
              <ArrowRight className="size-[18px] stroke-[1.5]" aria-hidden />
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <RouterDiagram />
          </Reveal>
        </div>
      </Section>

      {/* Modules */}
      <Section id="modules">
        <SectionHeader
          eyebrow="Open-source modules"
          title="Four modules on one engine"
          intro="Each module lives in its own repository, is released when it is ready, and runs on CarbnEngine by default. CarbnBenchmarks comes first: it proves which models fit before anything else is deployed."
        />
        <RevealGroup className="grid border-t border-l md:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <ModuleCard
              key={m.slug}
              product={m}
              n={i + 1}
              total={modules.length}
            />
          ))}
        </RevealGroup>
      </Section>

      {/* Scope */}
      <Section>
        <SectionHeader
          eyebrow="Clear about limits"
          title="What Carbn does, and what it does not"
          intro="Carbn runs inference. It does not train models. Knowing the boundary lets you plan around it."
        />
        <Reveal>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y">
                <th
                  scope="col"
                  className="type-label w-1/2 py-4 pr-6 text-graphite-400"
                >
                  Carbn does
                </th>
                <th
                  scope="col"
                  className="type-label w-1/2 border-l py-4 pl-6 text-graphite-400"
                >
                  Carbn does not
                </th>
              </tr>
            </thead>
            <tbody>
              {scope.map((row) => (
                <tr key={row.does} className="border-b">
                  <td className="py-5 pr-6 align-top">
                    <span className="flex gap-3 text-body text-graphite-50">
                      <Check
                        className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-volt"
                        aria-hidden
                      />
                      {row.does}
                    </span>
                  </td>
                  <td className="border-l py-5 pl-6 align-top">
                    <span className="flex gap-3 text-body text-graphite-300">
                      <Minus
                        className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-graphite-400"
                        aria-hidden
                      />
                      {row.doesNot}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* Audience */}
      <Section>
        <SectionHeader
          eyebrow="Who Carbn is for"
          title="Built for the people who will run it"
          intro="For platform and infrastructure engineering leads at organisations whose data cannot leave the building, and the people they answer to."
        />
        <Cells cols={4}>
          {audience.map((a, i) => (
            <Cell
              n={i + 1}
              total={audience.length}
              key={a.title}
              title={a.title}
              tone={toneFor(i, undefined, 0)}
              tag={i === 0 ? "Primary" : undefined}
            >
              {a.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      {/* Build sequence */}
      <Section>
        <SectionHeader
          eyebrow="Build sequence"
          title="The engine first, then the module that proves it"
          intro="Carbn is in design. The build order follows a fixed set of priorities, and each module ships when it is ready."
          aside={
            <Link
              href="/about#roadmap"
              className="link inline-flex items-center gap-2"
            >
              Read the full sequence
              <ArrowRight className="size-[18px] stroke-[1.5]" aria-hidden />
            </Link>
          }
        />
        <RevealGroup className="grid border-t border-l sm:grid-cols-2 lg:grid-cols-4">
          {buildSequence.map((s, i) => (
            <RevealItem
              key={s.title}
              className={
                i === 0
                  ? "flex min-h-[132px] flex-col justify-between border-r border-b bg-volt p-5 text-graphite-950"
                  : "flex min-h-[132px] flex-col justify-between border-r border-b p-5"
              }
            >
              <div className="flex items-center justify-between">
                <Index
                  n={i + 1}
                  total={buildSequence.length}
                  className={i === 0 ? "text-graphite-950" : undefined}
                />
                <span
                  className={
                    i === 0
                      ? "type-label text-graphite-950"
                      : "type-label text-graphite-400"
                  }
                >
                  {i === 0 ? "First" : "Planned"}
                </span>
              </div>
              <p
                className={
                  i === 0
                    ? "type-heading mt-6 text-h4"
                    : "type-heading mt-6 text-h4 text-graphite-50"
                }
              >
                {s.title}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand />
    </>
  );
}
