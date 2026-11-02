import { Check, Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Carbn about running AI on your own servers.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to run"
        lede="Have a question, or planning to bring AI in-house? Send us a message and we will get back to you within 24 hours."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <h2 className="type-heading mb-8 text-h2 text-graphite-50">
              Send us a message
            </h2>
            <ContactForm />
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <Eyebrow className="mb-4">Get in touch</Eyebrow>
            <dl className="border-t">
              {[
                {
                  Icon: Mail,
                  k: "Email",
                  v: (
                    <a href={`mailto:${site.email}`} className="link">
                      {site.email}
                    </a>
                  ),
                  sub: "We respond within 24 hours",
                },
                {
                  Icon: MapPin,
                  k: "Location",
                  v: site.location,
                  sub: "Serving organisations globally",
                },
                {
                  Icon: Clock,
                  k: "Business hours",
                  v: "Sunday to Thursday",
                  sub: "9:00 to 18:00 (GMT+3)",
                },
              ].map(({ Icon, k, v, sub }) => (
                <div key={k} className="flex gap-4 border-b py-5">
                  <Icon
                    className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-graphite-400"
                    aria-hidden
                  />
                  <div>
                    <dt className="type-label text-graphite-400">{k}</dt>
                    <dd className="mt-2 text-body text-graphite-50">{v}</dd>
                    <dd className="mt-1 text-body-sm text-graphite-300">
                      {sub}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-12 border-[1.5px] border-graphite-500 bg-graphite-900 p-6">
              <Eyebrow className="mb-4">Why Carbn</Eyebrow>
              <ul className="space-y-3">
                {[
                  "On-prem AI with full data privacy",
                  "Open-source engine and modules, by design",
                  "Runs on the hardware you already own",
                  "Connected and air-gapped deployments",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-body text-graphite-50">
                    <Check
                      className="mt-1 size-[18px] shrink-0 stroke-[1.5] text-volt"
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
    </>
  );
}
