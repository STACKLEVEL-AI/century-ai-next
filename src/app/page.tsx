import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Scenarios from "@/components/Scenarios";
import Brain from "@/components/Brain";
import Platform from "@/components/Platform";
import Trust from "@/components/Trust";
import Narrative from "@/components/Narrative";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";

const ogImage = {
  url: `${SITE_URL}/og/century-ai-eu.png`,
  width: 1200,
  height: 630,
  alt: "Century — Enterprise AI. Under your control.",
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [ogImage],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Scenarios />
        <Brain />
        <Platform />
        <Trust />
        <Narrative />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
