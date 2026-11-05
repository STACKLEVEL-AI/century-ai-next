import type { Metadata } from "next";
import { homeMetadata } from "@/lib/metadata";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Scenarios from "@/components/Scenarios";
import Platform from "@/components/Platform";
import HomeApproach from "@/components/HomeApproach";
import HomeIndustries from "@/components/HomeIndustries";
import HomeTeam from "@/components/HomeTeam";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, SITE_NAME, SITE_URL, SITE_LANGUAGE } from "@/lib/site";
import "@/app/home.css";

export const metadata: Metadata = homeMetadata(PAGE_TITLE, PAGE_DESCRIPTION);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: SITE_LANGUAGE,
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
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

