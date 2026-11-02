import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";

export type LegalSection = { title: string; body?: string; items?: string[] };

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={`Last updated ${updated}.`}
      />
      <Section>
        <ol className="measure border-t">
          {sections.map((s, i) => (
            <li
              key={s.title}
              className="grid gap-3 border-b py-8 sm:grid-cols-[4rem_1fr]"
            >
              <span className="type-mono pt-1 text-graphite-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="type-heading text-h3 text-graphite-50">
                  {s.title}
                </h2>
                {s.body ? (
                  <p className="mt-3 text-body text-graphite-300">{s.body}</p>
                ) : null}
                {s.items ? (
                  <ul className="mt-3 list-[square] space-y-2 pl-5 text-body text-graphite-300 marker:text-graphite-400">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
