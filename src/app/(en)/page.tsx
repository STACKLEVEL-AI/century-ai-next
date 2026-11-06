import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Scenarios from "@/components/Scenarios";
import Platform from "@/components/Platform";
import HomeApproach from "@/components/HomeApproach";
import HomeIndustries from "@/components/HomeIndustries";
import HomeTeam from "@/components/HomeTeam";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALE } from "@/lib/locale";
import { alternateOpenGraphLocales, languageAlternates, locales, localizedPath, openGraphLocale, socialImagePath } from "@/lib/i18n";
import "@/app/home.css";

const ogImage = {
  url: `${SITE_URL}${socialImagePath(LOCALE)}`,
  width: 1200,
  height: 630,
  alt: "Century — Accelerate AI transformation across your business",
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: localizedPath("/", LOCALE), languages: languageAlternates("/", SITE_URL) },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}${localizedPath("/", LOCALE)}`,
    locale: openGraphLocale(LOCALE),
    alternateLocale: alternateOpenGraphLocales(LOCALE),
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
      inLanguage: locales,
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${localizedPath("/", LOCALE)}#webpage`,
      url: `${SITE_URL}${localizedPath("/", LOCALE)}`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: LOCALE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ],
};

export default function Home() {
  return (
    <div className="century-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Scenarios />
        <Platform />
        <HomeApproach />
        <HomeIndustries />
        <HomeTeam />
      </main>
      <div id="contact"><Footer /></div>
    </div>
  );
}

