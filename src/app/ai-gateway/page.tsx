import { Activity, ArrowUpRight, GitBranch, Network, ShieldCheck, SlidersHorizontal, Wallet } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages, SectionHeading } from "@/components/site/Sections";
import ProductIntro from "@/components/products/ProductIntro";
import AppScreenshot from "@/components/AppScreenshot";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century AI Gateway", "Explore model choices, response details and AI operating responsibilities through real views from the Century application.", "/ai-gateway");

const controls = [
  { title: "Connectivity", description: "Identify the applications and model interfaces in scope. Review how they connect and the information they exchange.", icon: Network },
  { title: "Usage & budgets", description: "Agree how usage is attributed and reviewed, so teams can discuss cost alongside useful outcomes.", icon: Wallet },
  { title: "Model access", description: "Match access to the person, the task and the information involved in each workflow.", icon: SlidersHorizontal },
  { title: "Routing decisions", description: "Consider quality, response time, cost and what happens when a provider is unavailable.", icon: GitBranch },
  { title: "Data boundaries", description: "Agree what may leave your environment. Review external processing and retention before rollout.", icon: ShieldCheck },
  { title: "Operating visibility", description: "Define the records, review process and owners needed to investigate exceptions and changes in usage.", icon: Activity },
];

export default function GatewayPage() {
  return <PageFrame headerVariant="overlay"><div className="product-page product-page-gateway">
    <ProductIntro eyebrow="Century AI Gateway" dark className="product-gateway-intro"
      title={<>Model choices.<br />A clearer view.</>}
      description="Bring model access, response details and operating responsibilities into the same conversation. Start with the information your team can inspect."
      secondary={{ href: "#gateway-example", label: "See inside Century" }}
      visual={<div className="product-gateway-visual"><AppScreenshot capture="models" priority /><p className="product-visual-note"><span aria-hidden="true" />An actual view from the Century workspace</p></div>} />

    <section className="product-section product-gateway-response" id="gateway-example"><div className="shell product-response-layout"><div><SectionHeading eyebrow="Beyond the answer" title={<>The response.<br />And the detail behind it.</>} description="Inspect the token counts and timing information attached to an answer. Keep the context for evaluating model choices close to the work." /></div><AppScreenshot capture="response" /></div></section>

    <section className="product-section product-muted"><div className="shell"><div className="product-heading-row"><SectionHeading eyebrow="A common control point" title={<>Turn scattered usage<br />into an operating picture.</>} /><p>Build the gateway around your environment. Start with the providers, interfaces and policies your team needs.</p></div><div className="product-capabilities product-capabilities-three">{controls.map(({ title, description, icon: Icon }, index) => <article key={title}><div className="product-capability-top"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="product-section"><div className="shell product-accordion-layout"><SectionHeading eyebrow="From visibility to decisions" title={<>Know what is used.<br />Decide what comes next.</>} description="A clear owner, an agreed scope and reviewable evidence make AI use easier to understand and improve." /><ol className="product-principles">{[
      { title: "Understand the pattern.", text: "Review usage in the context of the teams and workflows it supports, rather than as isolated accounts." },
      { title: "Compare the trade-offs.", text: "Discuss model suitability, response quality and cost using a shared set of definitions." },
      { title: "Keep the rules clear.", text: "Make access, data handling and escalation responsibilities explicit as the implementation grows." },
    ].map((item, index) => <li key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div></section>

    <div className="product-scope-band"><div className="shell"><p>Integrations, access policies and reporting are scoped around your environment.</p><a className="product-text-link" href="/deployment/">Plan the implementation<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
    <RelatedPages links={[{ href: "/ai-os/", title: "The shared foundation", description: "Connect knowledge, workflows and oversight." }, { href: "/agents/", title: "Assistance with context", description: "Put approved knowledge to work for your team." }, { href: "/systems/", title: "A workspace that fits", description: "Design around a focused business process." }]} />
  </div></PageFrame>;
}
