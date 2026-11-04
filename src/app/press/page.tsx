import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { CompanyCTA, CompanyHeading, CompanyMasthead, CompanyTeam } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Press & brand", "Century company information, founder profiles and a downloadable brand wordmark. Contact Vitali for press and company enquiries.", "/press");

export default function PressPage() {
  return (
    <PageFrame showContact={false}>
      <div className="co-page co-press">
        <CompanyMasthead eyebrow="Press & brand" title={<>A clear introduction<br />to Century.</>} description="Company information, people and brand materials in one place. For an interview or additional context, speak directly with Vitali." link={{ href: "#brand-materials", label: "Explore brand materials" }} />
        <section className="co-section co-press-overview">
          <div className="shell co-editorial-split">
            <CompanyHeading eyebrow="About the company" title={<>Century,<br />in a few words.</>} />
            <div className="co-prose"><p className="co-lead">Century works with businesses to make AI useful in their everyday operations.</p><p>Its focus is on connecting approved knowledge, supporting document workflows and giving teams practical control over how AI is used.</p><p>Projects begin with a specific process and an agreed outcome. Data sources, integrations, deployment requirements and review responsibilities are considered together.</p><a className="co-text-link" href="/about-us/">More about Century<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>
        <section className="co-section co-warm" id="brand-materials">
          <div className="shell">
            <div className="co-section-top"><CompanyHeading eyebrow="Brand materials" title={<>The Century<br />wordmark.</>} /><p>Our original Century wordmark, in black and white. Download the supplied vector artwork for a clear introduction to the company.</p></div>
            <div className="co-brand-grid">
              <a className="co-brand-asset" href="/brand/century-logo.svg" download="century-logo.svg"><div className="co-brand-specimen"><Image src="/brand/century-logo.svg" alt="Century black wordmark" width={442} height={116} /></div><div className="co-brand-download"><span>Black SVG<small>For light backgrounds</small></span><ArrowDown size={20} aria-hidden="true" /></div></a>
              <a className="co-brand-asset" href="/brand/century-logo-white.svg" download="century-logo-white.svg"><div className="co-brand-specimen co-brand-specimen-dark"><Image src="/brand/century-logo-white.svg" alt="Century white wordmark" width={442} height={116} /></div><div className="co-brand-download"><span>White SVG<small>For dark backgrounds</small></span><ArrowDown size={20} aria-hidden="true" /></div></a>
            </div>
            <div className="co-brand-guidance"><p>Keep the original proportions, colour and spelling. Allow clear space around the mark and use a simple background with enough contrast.</p><span>SVG · transparent background · vector format</span></div>
          </div>
        </section>
        <section className="co-section" id="founders">
          <div className="shell"><div className="co-section-top"><CompanyHeading eyebrow="Founder profiles" title={<>The people<br />behind Century.</>} /><p>Meet the founders and find their public profiles. For interviews and company enquiries, contact Vitali.</p></div><CompanyTeam compact /></div>
        </section>
        <CompanyCTA eyebrow="Press enquiries" title={<>Need a little<br />more context?</>} description="For questions about Century, interview requests or brand materials, message Vitali. Include the topic, publication or organisation, and any deadline so the conversation has a useful starting point." />
      </div>
    </PageFrame>
  );
}
