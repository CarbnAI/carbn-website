import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      updated="28 October 2026"
      sections={[
        {
          title: "Agreement",
          body: "By using this website, you agree to these terms and our privacy policy.",
        },
        {
          title: "Use of the website",
          items: [
            "Do not misuse, disrupt or attempt to breach the security of this website.",
            "Comply with applicable laws and third-party rights.",
          ],
        },
        {
          title: "Intellectual property",
          body: "We retain all rights to our content and branding. Open-source Carbn code is governed by the licence published with it. You may not otherwise copy or redistribute our content except as permitted by law or with our written consent.",
        },
        {
          title: "Termination",
          body: "We may suspend or restrict access to this website for violations of these terms or risks to the service.",
        },
        {
          title: "Disclaimers",
          body: "This website is provided as is, without warranties. Carbn products described here are in design and may change. To the extent permitted by law, we disclaim implied warranties and limit liability.",
        },
        {
          title: "Contact",
          body: `For questions about these terms, email ${site.email}.`,
        },
      ]}
    />
  );
}
