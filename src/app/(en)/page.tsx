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
import { PAGE_DESCRIPTION, PAGE_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALE } from "@/lib/locale";
import { locales, localizedPath } from "@/lib/i18n";
import "@/app/home.css";

export const metadata: Metadata = homeMetadata(PAGE_TITLE, PAGE_DESCRIPTION);

const websiteUrl = SITE_URL + "/";
const websiteId = `${websiteUrl}#website`;
const pageUrl = `${SITE_URL}${localizedPath("/", LOCALE)}`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: websiteUrl,
      name: SITE_NAME,
      inLanguage: locales,
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: LOCALE,
      isPartOf: { "@id": websiteId },
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
