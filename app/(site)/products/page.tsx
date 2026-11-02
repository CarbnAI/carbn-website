import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ModuleCard } from "@/components/product/module-card";
import { Button } from "@/components/ui/button";
import { Cell, Cells, toneFor } from "@/components/ui/cells";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { LayerExplorer } from "@/components/visuals/layer-explorer";
import { RouterDiagram } from "@/components/visuals/router-diagram";
import { StackSchematic } from "@/components/visuals/stack-schematic";
import { engineProduct, modules } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "One inference engine, a set of open-source modules and an integrated platform: the whole AI stack, on the servers you already own.",
};

const rules = [
  {
    title: "Modules depend on the engine interface, not on a backend",
    body: "A module never knows whether MAX or vLLM served a request.",
  },
  {
    title: "The engine is replaceable for the open-source modules",
    body: "External parties can run the modules on their own inference engine, though they run on CarbnEngine by default.",
  },
  {
    title: "CarbnPlatform runs only on CarbnEngine",
    body: "The paid product is a single, supported system with one known engine underneath it.",
  },
];

const freedoms = [
  {
    title: "Ship modules one at a time",
    body: "A module is released when it is ready, without waiting for the others.",
  },
  {
    title: "Change a module without touching the rest",
    body: "Each module can be modified on its own, with no change to the engine or to other modules.",
  },
  {
    title: "Replace a module",
    body: "If a better approach emerges, a module can be replaced entirely.",
  },
  {
    title: "Add new modules",
    body: "New modules can be built on top of the current ones, using the same engine interface.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="The whole machine, built to fit your rack"
        lede="A modular ecosystem for on-prem AI: one inference engine, a set of open-source modules and an integrated platform for enterprises. Everything runs on your own servers."
        actions={
          <>
            <Button asChild>
              <Link href="#modules">
                See the modules
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/platform">CarbnPlatform</Link>
            </Button>
          </>
        }
      >
        <StackSchematic />
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Architecture"
          title="One engine, interchangeable modules, one platform"
          intro="Carbn is decentralised by design. The engine, each module and the platform are separate codebases, developed and released on their own. What holds them together is the CarbnEngine inference API."
        />
        <Reveal>
          <LayerExplorer />
        </Reveal>
        <div className="mt-12 md:mt-16">
          <Cells cols={3}>
            {rules.map((r, i) => (
              <Cell
                n={i + 1}
                total={rules.length}
                key={r.title}
                title={r.title}
                tone={toneFor(i, undefined, 2)}
              >
                {r.body}
              </Cell>
            ))}
          </Cells>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-4">
              Core project · {engineProduct.stage}
            </Eyebrow>
            <h2 className="type-heading text-h1 text-graphite-50">
              CarbnEngine
            </h2>
            <p className="measure mt-6 text-body-lg text-graphite-300">
              {engineProduct.what[0]}
            </p>
            <ul className="mt-8 border-t">
              {[
                "Hardware-flexible local inference",
                "Default engine for every module",
                "Open source and swappable",
              ].map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 border-b py-4 text-body text-graphite-50"
                >
                  <Check
                    className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-volt"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button asChild variant="secondary">
                <Link href="/products/carbn-engine">
                  Explore CarbnEngine
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <RouterDiagram />
          </Reveal>
        </div>
      </Section>

      <Section id="modules">
        <SectionHeader
          eyebrow="Open-source modules"
          title="Each solves one problem, all run on CarbnEngine"
          intro="All modules are open source and run on CarbnEngine out of the box. Self-host the engine and any module, on its own or together."
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

      <Section id="add-ons">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-4">Add-ons · Planned</Eyebrow>
            <h2 className="type-heading text-h1 text-graphite-50">
              Extend Carbn without diluting the core
            </h2>
            <p className="measure mt-6 text-body-lg text-graphite-300">
              Add-ons extend Carbn with capabilities some customers need and
              others do not. They are available natively, but built and released
              separately from the engine and the core modules, so the core stays
              small, stable and at full quality.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="border-[1.5px] border-graphite-500 bg-graphite-900 p-6 md:p-8">
              <p className="type-label text-graphite-400">Planned add-on</p>
              <h3 className="type-heading mt-3 text-h3 text-graphite-50">
                Agent control surface
              </h3>
              <p className="mt-3 text-body text-graphite-300">
                Start, supervise and steer agents powered by models on
                CarbnEngine from any device, while the agents and the code they
                work on stay inside your network.
              </p>
              <ul className="mt-6 border-t">
                {[
                  "Uses the same inference API as every module",
                  "Enabled or disabled without affecting the core",
                  "No data leaves your network",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 border-b py-3 text-body-sm text-graphite-50"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 stroke-[1.5] text-volt"
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Independent parts"
          title="Four freedoms of a decentralised design"
          intro="Carbn does not have to ship every module at once, and you do not have to adopt every module at once."
        />
        <Cells cols={4}>
          {freedoms.map((f, i) => (
            <Cell
              n={i + 1}
              total={freedoms.length}
              key={f.title}
              title={f.title}
              tone={toneFor(i)}
            >
              {f.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      <Section>
        <Reveal className="grid gap-8 border-[1.5px] border-graphite-500 p-6 md:grid-cols-12 md:items-end md:p-12">
          <div className="md:col-span-8">
            <Eyebrow className="mb-4">CarbnPlatform · Paid · In design</Eyebrow>
            <h2 className="type-heading text-h1 text-graphite-50">
              Every module, as one supported product
            </h2>
            <p className="measure mt-5 text-body-lg text-graphite-300">
              SSO and teams, integrations, dashboards, a setup interface and
              model management for connected and air-gapped sites. Deployed
              locally, but managed as one product rather than parts to wire
              together.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button asChild>
              <Link href="/platform">
                Explore CarbnPlatform
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
