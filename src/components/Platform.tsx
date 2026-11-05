import { ArrowUpRight } from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";

export default function Platform() {
  return <>
    <section className="home-manifesto" aria-label="Our approach"><div className="shell"><p>We bring together the AI platform, hands-on deployment and a shared direction <span>to transform how your business works.</span></p></div></section>
    <section className="section platform-section" id="platform" aria-labelledby="platform-title">
      <div className="platform-grain" aria-hidden="true" />
      <div className="shell platform-layout">
        <div className="section-heading platform-heading"><p className="eyebrow">Century AI OS</p><h2 id="platform-title">One foundation.<br />A more connected business.</h2><p>Give your people, agents and applications a shared layer of knowledge, tools and control.</p><a className="btn btn-light" href="/ai-os/">Explore the AI OS<ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <div className="app-capture-grid app-platform-captures"><AppScreenshot capture="models" /><AppScreenshot capture="files" /></div>
      </div>
    </section>
  </>;
}

