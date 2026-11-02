import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Cell, Cells, toneFor } from "@/components/ui/cells";
import { Eyebrow, Index } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { StickySplit } from "@/components/ui/sticky-split";
import { scope } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Security design",
  description:
    "How Carbn is designed to run: on your servers, in connected or air-gapped networks, with no data leaving the building.",
};

const commitments = [
  {
    title: "No data leaves the network",
    body: "Prompts, files, conversation history, generated documents, workflow data and bot activity are processed and stored on your servers.",
  },
  {
    title: "No hosted dependencies at run time",
    body: "No part of Carbn relies on an external service to operate, including the chat interface's conversation storage.",
  },
  {
    title: "Isolation",
    body: "The platform is deployed within your own infrastructure boundary and under your own access controls.",
  },
  {
    title: "Controlled access",
    body: "CarbnPlatform authenticates users through SSO and restricts access by team.",
  },
  {
    title: "Human approval for consequential actions",
    body: "Tool calls in CarbnChat and actions by Carbn Connect bots can require a person's approval before they take effect.",
  },
];

const needs = [
  {
    title: "Isolation",
    body: "A clear account of every component, where it runs and what it can reach.",
  },
  {
    title: "Audit",
    body: "A record of who used the platform, which models served them and what actions bots and tools took.",
  },
  {
    title: "Update path",
    body: "A defined way to receive and apply updates to the engine, modules and models, including on air-gapped sites.",
  },
];

/** Network boundary sketch: connected sites pull from an approved source; air-gapped sites have no link out. */
function ModeDiagram({ offline }: { offline: boolean }) {
  return (
    <svg
      viewBox="0 0 320 96"
      className="mt-8 h-24 w-full max-w-[360px]"
      role="img"
      aria-label={
        offline
          ? "Your network with no external connection"
          : "Your network linked to an approved model source"
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="10" width="190" height="76" strokeDasharray="4 4" />
      {[22, 72, 122].map((x) => (
        <rect
          key={x}
          x={x}
          y="34"
          width="40"
          height="28"
          fill="currentColor"
          stroke="none"
          opacity={0.85}
        />
      ))}
      {offline ? null : (
        <>
          <path d="M192 48 H262" />
          <rect x="262" y="30" width="56" height="36" />
        </>
      )}
    </svg>
  );
}

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security design · How Carbn is designed to run"
        title="Built for data that cannot leave the building"
        lede="Carbn is in design. This page sets out the commitments the system is being built to meet. Organisations choose on-prem AI precisely to keep control of their data, so security is part of the design, not a feature added later."
      />

      <Section>
        <SectionHeader
          eyebrow="Deployment modes"
          title="Connected or air-gapped"
          intro="Carbn runs entirely on your own servers. Air-gapped sites with no internet access are a supported deployment, not an exception."
        />
        <RevealGroup className="grid border-t border-l md:grid-cols-2">
          {[
            {
              name: "Connected on-premises",
              how: "The model picker downloads and provisions models automatically.",
              where:
                "Organisations whose servers can reach approved model sources.",
            },
            {
              name: "Air-gapped",
              how: "Models are delivered pre-installed and loaded without internet access.",
              where: "Sites with no external network connection.",
            },
          ].map((m, i) => {
            const paper = i === 1;
            return (
              <RevealItem
                key={m.name}
                className={
                  paper
                    ? "border-r border-b bg-graphite-50 p-6 text-graphite-950 md:p-10"
                    : "border-r border-b p-6 md:p-10"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <Index
                    n={i + 1}
                    total={2}
                    className={paper ? "text-graphite-600" : undefined}
                  />
                  {paper ? (
                    <span className="type-label border-[1.5px] border-graphite-950 px-2 py-1">
                      Fully offline
                    </span>
                  ) : null}
                </div>
                <ModeDiagram offline={paper} />
                <h3
                  className={
                    paper
                      ? "type-heading mt-8 text-h2"
                      : "type-heading mt-8 text-h2 text-graphite-50"
                  }
                >
                  {m.name}
                </h3>
                <dl
                  className={
                    paper
                      ? "mt-8 border-t border-graphite-950"
                      : "mt-8 border-t"
                  }
                >
                  <div
                    className={
                      paper
                        ? "grid gap-2 border-b border-graphite-950 py-4 sm:grid-cols-3"
                        : "grid gap-2 border-b py-4 sm:grid-cols-3"
                    }
                  >
                    <dt
                      className={
                        paper
                          ? "type-label pt-1 text-graphite-600"
                          : "type-label pt-1 text-graphite-400"
                      }
                    >
                      How models arrive
                    </dt>
                    <dd
                      className={
                        paper
                          ? "text-body sm:col-span-2"
                          : "text-body text-graphite-50 sm:col-span-2"
                      }
                    >
                      {m.how}
                    </dd>
                  </div>
                  <div
                    className={
                      paper
                        ? "grid gap-2 border-b border-graphite-950 py-4 sm:grid-cols-3"
                        : "grid gap-2 border-b py-4 sm:grid-cols-3"
                    }
                  >
                    <dt
                      className={
                        paper
                          ? "type-label pt-1 text-graphite-600"
                          : "type-label pt-1 text-graphite-400"
                      }
                    >
                      Typical setting
                    </dt>
                    <dd
                      className={
                        paper
                          ? "text-body text-graphite-700 sm:col-span-2"
                          : "text-body text-graphite-300 sm:col-span-2"
                      }
                    >
                      {m.where}
                    </dd>
                  </div>
                </dl>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section>
        <StickySplit
          aside={
            <>
              <Eyebrow className="mb-4">Commitments</Eyebrow>
              <h2 className="type-heading text-h1 text-graphite-50">
                Five rules every part of Carbn is designed to follow
              </h2>
              <p className="measure mt-5 text-body-lg text-graphite-300">
                They apply to the engine, every module, every add-on and the
                platform, in connected and air-gapped deployments alike.
              </p>
            </>
          }
          items={commitments}
          highlight={0}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="For the security team"
          title="Evidence of rigour a CISO can verify"
          intro="Carbn's security audience asks for evidence in three areas. The design must answer each one with something you can check yourself."
        />
        <Cells cols={3}>
          {needs.map((n, i) => (
            <Cell
              key={n.title}
              n={i + 1}
              total={needs.length}
              title={n.title}
              tone={toneFor(i, undefined, 0)}
            >
              {n.body}
            </Cell>
          ))}
        </Cells>
        <Reveal className="mt-10 grid gap-6 border-l-[3px] border-graphite-500 pl-6 md:grid-cols-12 md:pl-10">
          <p className="text-body-lg text-graphite-300 md:col-span-7">
            Carbn&apos;s own code is open source, so security teams can inspect
            what runs inside their network. MAX, which CarbnEngine depends on,
            is source-available, and Carbn uses it unmodified. Every upstream
            release of MAX and vLLM is tested through CarbnBenchmarks on
            supported hardware before Carbn adopts it.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Scope boundaries"
          title="What Carbn does not do"
          intro="Carbn states plainly what it does not do, so you can plan around it."
        />
        <Reveal>
          <ul className="border-t">
            {scope.map((row) => (
              <li
                key={row.does}
                className="grid gap-3 border-b py-5 md:grid-cols-2 md:gap-8"
              >
                <span className="flex gap-3 text-body text-graphite-50">
                  <Check
                    className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-volt"
                    aria-hidden
                  />
                  <span>
                    <span className="sr-only">Does: </span>
                    {row.does}
                  </span>
                </span>
                <span className="flex gap-3 text-body text-graphite-300">
                  <Minus
                    className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-graphite-400"
                    aria-hidden
                  />
                  <span>
                    <span className="sr-only">Does not: </span>
                    {row.doesNot}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="type-heading mt-8 text-h4 text-graphite-50">
            Carbn runs inference. It does not train models.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        eyebrow="Security review"
        title="Bring us your security questions"
        body="If you are evaluating on-prem AI for a regulated or sensitive environment, we will walk your team through the design in as much detail as you need."
      />
    </>
  );
}
