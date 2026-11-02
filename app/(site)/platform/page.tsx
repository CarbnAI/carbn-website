import { ArrowRight, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Cell, Cells, toneFor } from "@/components/ui/cells";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "CarbnPlatform",
  description:
    "CarbnPlatform combines CarbnEngine and every module into one integrated, supported product, deployed on your own servers.",
};

const features = [
  {
    title: "SSO and teams",
    body: "Authentication through your organisation's identity provider, with multi-user access control across teams.",
  },
  {
    title: "Integrations",
    body: "Connectors for the tools teams already use, starting with Slack, Jira and ClickUp.",
  },
  {
    title: "Dashboards",
    body: "Visibility into usage, performance and system health across the deployment.",
  },
  {
    title: "Setup and configuration interface",
    body: "A management interface to deploy, configure and maintain the platform without manual setup.",
  },
  {
    title: "Model picker",
    body: "Choose which models to run, with automatic download and provisioning in connected environments, or pre-installed models for air-gapped systems.",
  },
  {
    title: "One engine underneath",
    body: "CarbnPlatform runs exclusively on CarbnEngine: one supported system with one known engine.",
  },
];

const comparison: [string, string, string][] = [
  ["Cost", "Free", "Paid"],
  ["Form", "Separate modules, each self-hosted", "One integrated product"],
  ["Engine", "CarbnEngine by default, replaceable", "CarbnEngine only"],
  [
    "Setup",
    "Configured by your team",
    "Managed setup and configuration interface",
  ],
  ["Users and access", "Not included", "SSO and teams"],
  ["Integrations", "Not included", "Slack, Jira, ClickUp and more"],
  ["Visibility", "Not included", "Usage, performance and health dashboards"],
  [
    "Model management",
    "Manual",
    "Model picker for connected and air-gapped sites",
  ],
  ["Support", "Community", "Supported commercial product"],
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="CarbnPlatform · Paid · In design"
        title="Every module, one supported product"
        lede="CarbnPlatform combines CarbnEngine and the Carbn modules into one integrated system. It is deployed on your own servers like the open-source parts, but it arrives managed as one product rather than as pieces to connect by hand."
        actions={
          <>
            <Button asChild>
              <Link href="/contact">
                Contact us
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="#compare">Compare with open source</Link>
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeader
          eyebrow="Enterprise features"
          title="What the platform adds"
          intro="CarbnPlatform removes the integration and maintenance work that falls on the platform engineering team when the parts are assembled by hand, which is the problem Carbn exists to solve."
        />
        <Cells cols={3}>
          {features.map((f, i) => (
            <Cell
              n={i + 1}
              total={features.length}
              key={f.title}
              title={f.title}
              tone={toneFor(i, 3)}
            >
              {f.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      <Section id="compare">
        <SectionHeader
          eyebrow="Open core"
          title="Open-source modules compared with CarbnPlatform"
          intro="The engine and the individual modules are free and open source. The integrated, supported product is paid."
        />
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-y">
                <th
                  scope="col"
                  className="type-label w-1/4 py-4 pr-6 text-graphite-400"
                >
                  <span className="sr-only">Feature</span>
                </th>
                <th
                  scope="col"
                  className="type-label w-[37.5%] border-l px-6 py-4 text-graphite-300"
                >
                  Open-source modules
                </th>
                <th
                  scope="col"
                  className="w-[37.5%] border-l-[3px] border-l-volt bg-graphite-900 px-6 py-4"
                >
                  <span className="type-label text-volt">CarbnPlatform</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([k, oss, plat]) => {
                const missing = oss === "Not included";
                return (
                  <tr key={k} className="border-b">
                    <th
                      scope="row"
                      className="type-heading py-5 pr-6 align-top text-h5 text-graphite-50"
                    >
                      {k}
                    </th>
                    <td className="border-l px-6 py-5 align-top text-body text-graphite-300">
                      <span className="flex gap-3">
                        {missing ? (
                          <Minus
                            className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-graphite-400"
                            aria-hidden
                          />
                        ) : null}
                        {oss}
                      </span>
                    </td>
                    <td className="border-l-[3px] border-l-volt bg-graphite-900 px-6 py-5 align-top text-body text-graphite-50">
                      {plat}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
        <p className="type-mono mt-6 text-graphite-400">
          Pricing will be set separately.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <Reveal className="border-t-[3px] border-graphite-500 pt-8">
            <Eyebrow className="mb-4">
              Why open source builds the business
            </Eyebrow>
            <dl className="space-y-6">
              {[
                [
                  "Trust",
                  "Security teams can inspect the code that runs inside their network.",
                ],
                [
                  "Adoption",
                  "Platform engineers can self-host the engine and any module for free, and evaluate Carbn on their own hardware before any commercial conversation.",
                ],
                [
                  "Community",
                  "An open project attracts contributors who extend and test Carbn across more hardware and use cases than one team could cover.",
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="type-heading text-h4 text-graphite-50">{k}</dt>
                  <dd className="mt-2 text-body text-graphite-300">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="border-t-[3px] border-volt pt-8" delay={0.1}>
            <Eyebrow className="mb-4">Why teams move to CarbnPlatform</Eyebrow>
            <p className="type-heading text-h2 text-graphite-50">
              The open-source modules give a capable team the parts.
              CarbnPlatform gives an organisation the finished system.
            </p>
            <p className="measure mt-6 text-body-lg text-graphite-300">
              One product, one engine, enterprise access control, integrations,
              dashboards, managed setup, model management for connected and
              air-gapped sites, and commercial support. The step from free to
              paid follows the point where Carbn needs to run at scale across
              many users and teams.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="CarbnPlatform · In design"
        title="Planning an on-prem AI rollout?"
        body="Tell us about your hardware, your teams and your constraints. We will tell you plainly where Carbn fits today and where it is heading."
      />
    </>
  );
}
