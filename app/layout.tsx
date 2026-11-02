import type { Metadata, Viewport } from "next";
import { Archivo, Azeret_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Carbn · ${site.tagline}`,
    template: "%s · Carbn",
  },
  description: site.description,
  applicationName: "Carbn",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Carbn",
    title: `Carbn · ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Carbn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Carbn · ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${azeret.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
