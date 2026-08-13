import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Citely",
  description: "Search split in two, and most tools never noticed.",
  openGraph: {
    title: "Citely",
    description: "Search split in two, and most tools never noticed.",
    siteName: "Citely",
    locale: "en_US",
    type: "website",
    url: "https://citely.flyrank.io",
    images: [
      {
        url: "https://citely.flyrank.io/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citely",
    description: "Search split in two, and most tools never noticed.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function Home() {
  return (
    <section className="min-h-screen">
      <LandingNav />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorksSection />
        <ModulesSection />
        <CtaSection />
      </main>
      <Footer />
    </section>
  );
}
