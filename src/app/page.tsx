import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HooksSection from "@/components/HooksSection";
import Narrative from "@/components/Narrative";
import Platform from "@/components/Platform";
import Scenarios from "@/components/Scenarios";
import BlackPlatform from "@/components/BlackPlatform";
import Brain from "@/components/Brain";
import Trust from "@/components/Trust";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Drawers from "@/components/Drawers";
import ScrollToTop from "@/components/ScrollToTop";
import SectionNavigator from "@/components/SectionNavigator";

export default function Home() {
  return (
    <>
      <Header />
      <SectionNavigator />
      <main>
        <Hero data-section="0" />
        <HooksSection data-section="1" />
        <Narrative data-section="2" />
        <Platform data-section="3" />
        <Scenarios data-section="4" />
        <BlackPlatform data-section="5" />
        <Brain data-section="6" />
        <Trust data-section="7" />
        <Contact data-section="8" />
      </main>
      <Footer data-section="9" />
      <Drawers />
      <ScrollToTop />
    </>
  );
}
