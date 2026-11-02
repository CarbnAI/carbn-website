import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Cell, Cells, toneFor } from "@/components/ui/cells";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { BuildTimeline } from "@/components/visuals/build-timeline";
import { StickySplit } from "@/components/ui/sticky-split";
import {
  buildSequence,
  mission,
  principles,
  priorities,
} from "@/lib/content/company";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Carbn is a startup from Amman, Jordan, building a complete AI capability that runs on the hardware organisations already own.",
};

const values = [
  {
    title: "Innovation",
    body: "We push the boundaries of what runs well on the hardware organisations already own.",
  },
  {
    title: "Integrity",
    body: "We hold ourselves to high standards of honesty and transparency, including about what Carbn does not do.",
  },
  {
    title: "Excellence",
    body: "We are dedicated to delivering superior quality in all our work.",
  },
  {
    title: "Customer-centricity",
    body: "We prioritise understanding and meeting the unique needs of the organisations we serve.",
  },
  {
    title: "Responsiveness",
    body: "We provide timely support and solutions to the needs and challenges our customers face.",
  },
  {
    title: "Reliability",
    body: "We build systems that perform consistently, so the team running them can depend on them.",
  },
];

const founders = [
  {
    name: "Yousef Musabeh",
    role: "Chief Executive Officer",
    image: "/yousef.jpg",
    bio: "Yousef leads Carbn's AI work as CEO. His expertise in AI engineering and MLOps is key to developing and refining CarbnEngine and the modules built on top of it, and to keeping Carbn's on-prem inference effective for the organisations that rely on it.",
    links: [
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/yousef-musabeh",
        Icon: LinkedInLogoIcon,
      },
      {
        label: "GitHub",
        href: "https://github.com/Yousinator",
        Icon: GitHubLogoIcon,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/yousinator0x01",
        Icon: InstagramLogoIcon,
      },
    ],
  },
  {
    name: "Saud Smadi",
    role: "Chief Technology Officer",
    image: "/saud.jpg",
    bio: "Saud is Carbn's CTO and head of infrastructure, responsible for the platform and deployment strategy. His depth in infrastructure engineering and DevOps shapes how CarbnEngine and CarbnPlatform are built and maintained, so Carbn deploys reliably on any organisation's hardware.",
    links: [
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/saud-smadi",
        Icon: LinkedInLogoIcon,
      },
      {
        label: "GitHub",
        href: "https://github.com/smadi0x86",
        Icon: GitHubLogoIcon,
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About · ${site.location}`}
        title="AI your organisation owns outright"
        lede="Carbn is a startup making on-prem AI practical for organisations whose data cannot leave the building. We are building the whole machine, so no team has to assemble AI from parts."
      />

      <Section>
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Eyebrow>Mission</Eyebrow>
          </div>
          <p className="type-heading text-h1 text-graphite-50 lg:col-span-9">
            {mission}
          </p>
        </Reveal>
        <div className="mt-16 grid gap-px border-t md:grid-cols-2">
          <Reveal className="pt-8 md:pr-8">
            <Eyebrow className="mb-4">Our mission</Eyebrow>
            <p className="text-body-lg text-graphite-300">
              To make on-prem AI inference easy for organisations, starting in
              Jordan and beyond, so they can run AI on their own terms.
            </p>
          </Reveal>
          <Reveal className="pt-8 md:border-l md:pl-8" delay={0.08}>
            <Eyebrow className="mb-4">Our vision</Eyebrow>
            <p className="text-body-lg text-graphite-300">
              To be the default way organisations run AI on their own
              infrastructure, setting the standard for private,
              hardware-flexible AI.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-4">Our story</Eyebrow>
            <h2 className="type-heading text-h1 text-graphite-50">
              It all began in 2023
            </h2>
            <div className="measure mt-6 space-y-5 text-body-lg text-graphite-300">
              <p>
                Carbn was founded by two first-year university students who saw
                a gap in the local and global market. As large language models
                became popular, organisations still had no easy way to run them
                on their own infrastructure.
              </p>
              <p>
                Driven to close that gap, they started Carbn to build on-prem AI
                tooling. What began as a university project has grown into a
                modular system for private, self-hosted AI: an engine, a set of
                modules and a platform.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <figure className="border-[1.5px] border-graphite-500 bg-graphite-900 p-3">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/founders.jpeg"
                  alt="Carbn's founders working together"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top grayscale contrast-[1.05]"
                  priority
                />
              </div>
              <figcaption className="type-mono flex justify-between px-1 pt-3 text-graphite-400">
                <span>The founders</span>
                <span>{site.location}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Design principles"
          title="Six rules every decision is checked against"
        />
        <Cells cols={3}>
          {principles.map((p, i) => (
            <Cell
              n={i + 1}
              total={principles.length}
              key={p.title}
              title={p.title}
              tone={toneFor(i, 0, 5)}
            >
              {p.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      <Section>
        <StickySplit
          aside={
            <>
              <Eyebrow className="mb-4">Priorities</Eyebrow>
              <h2 className="type-heading text-h1 text-graphite-50">
                When two goals compete, the higher one wins
              </h2>
              <p className="measure mt-5 text-body-lg text-graphite-300">
                Every decision in Carbn is ranked against the same four
                priorities.
              </p>
            </>
          }
          items={priorities}
          highlight={0}
        />
      </Section>

      <Section id="roadmap">
        <SectionHeader
          eyebrow="Build sequence"
          title="The engine first, then the module that proves it"
          intro="The build order follows Carbn's priorities. After the engine, modules are independent: each is released when it is ready, and the order reflects priority, not one combined release. No stage ships by lowering the quality of an earlier one."
        />
        <BuildTimeline items={buildSequence} />
      </Section>

      <Section>
        <SectionHeader eyebrow="Values" title="The values we hold" />
        <Cells cols={3}>
          {values.map((v, i) => (
            <Cell
              n={i + 1}
              total={values.length}
              key={v.title}
              title={v.title}
              tone={toneFor(i, undefined, 1)}
            >
              {v.body}
            </Cell>
          ))}
        </Cells>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Team"
          title="Meet the founders"
          intro="The two engineers who started Carbn."
        />
        <RevealGroup className="grid grid-cols-1 border-t border-l md:grid-cols-2">
          {founders.map((f) => (
            <RevealItem
              key={f.name}
              className="flex min-w-0 flex-col border-r border-b sm:flex-row"
            >
              <div className="relative aspect-square w-full shrink-0 border-b sm:aspect-auto sm:w-44 sm:border-r sm:border-b-0 lg:w-52">
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  sizes="(min-width: 640px) 208px, 100vw"
                  className="object-cover object-top grayscale"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="type-label text-graphite-400">{f.role}</p>
                <h3 className="type-heading mt-2 text-h3 text-graphite-50">
                  {f.name}
                </h3>
                <p className="mt-4 text-body text-graphite-300">{f.bio}</p>
                <ul className="mt-auto flex gap-2 pt-6">
                  {f.links.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${f.name} on ${label}`}
                        className="inline-flex size-11 items-center justify-center border-[1.5px] border-graphite-500 text-graphite-300 transition-colors duration-200 ease-carbn hover:border-graphite-50 hover:text-graphite-50"
                      >
                        <Icon className="size-[18px]" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand />
    </>
  );
}
