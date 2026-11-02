export const site = {
  name: "Carbn",
  tagline: "Your entire AI stack. Your own hardware.",
  description:
    "Carbn is a complete AI system that runs on the servers you already own: an inference engine, open-source modules and an integrated platform. Your data never leaves your network, and there is no per-token cost.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://carbn.com",
  email: "contact@carbn.com",
  location: "Amman, Jordan",
  github: "https://github.com/CarbnAI",
  linkedin: "https://linkedin.com/company/carbn",
} as const;

export const mainNav = [
  { title: "Products", href: "/products" },
  { title: "Platform", href: "/platform" },
  { title: "Security", href: "/security" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
] as const;
