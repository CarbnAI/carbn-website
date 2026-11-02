import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="28 October 2026"
      sections={[
        {
          title: "What we collect",
          items: [
            "Contact form: your name, email address, optional phone number, subject and message.",
            "Usage: pages visited and basic device information, where analytics apply.",
          ],
        },
        {
          title: "Who processes it",
          body: "Contact form submissions are delivered to us through EmailJS, a third-party email service. EmailJS processes the details you submit only to deliver your message to the Carbn team.",
        },
        {
          title: "How we use it",
          items: [
            "Reply to your message and follow up on your request.",
            "Improve the performance and reliability of this website.",
          ],
        },
        {
          title: "Carbn software",
          body: "This policy covers this website only. Carbn software is designed to run on your own servers, and no prompts, files or outputs are sent to Carbn.",
        },
        {
          title: "Your choices",
          items: [
            "Request access to, correction of, or deletion of your data.",
            "Opt out of non-essential analytics where applicable.",
          ],
        },
        {
          title: "Contact",
          body: `For privacy questions, email ${site.email}.`,
        },
      ]}
    />
  );
}
