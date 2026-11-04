"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, HeartPulse, Landmark, Plane, PlugZap, Radio, ShieldCheck, ShoppingBag } from "lucide-react";
import { industryLinks } from "@/lib/navigation";
const sectors = [
  { title: "Banking", headline: "Clarity for complex banking workflows.", description: "Bring policies, documents and service context together for the people making decisions.", icon: Landmark },
  { title: "Telecommunications", headline: "Keep the customer context connected.", description: "Help service teams work with verified information, consistent answers and complete handovers.", icon: Radio },
  { title: "Healthcare", headline: "Support the work around better care.", description: "Make administrative knowledge and document preparation easier for authorised teams to review.", icon: HeartPulse },
  { title: "Utilities", headline: "Connect requests with operational knowledge.", description: "Prepare service cases, document checklists and field handovers from approved information.", icon: PlugZap },
  { title: "Insurance", headline: "Move paperwork forward. Keep judgment human.", description: "Organise submissions, policy knowledge and claims documentation for accountable review.", icon: ShieldCheck },
  { title: "Retail", headline: "Help everyday retail work together.", description: "Support customers, stores and supplier operations with knowledge that teams can check.", icon: ShoppingBag },
  { title: "Airlines", headline: "Keep teams informed when plans change.", description: "Prepare consistent service responses and complete handovers from verified travel information.", icon: Plane },
];
export default function HomeIndustries() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % sectors.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + sectors.length - 1) % sectors.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sectors.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  }
  const active = sectors[selected]; const Icon = active.icon;
  const photos = ["industry", "workflows", "deployment", "workflows", "industry", "knowledge", "support"];
  return <section className="section home-industries" aria-labelledby="industries-title"><div className="shell">
    <div className="section-heading section-heading-row"><div><p className="eyebrow">Across your industry</p><h2 id="industries-title">Built around<br />your industry.</h2></div><p>Explore starting points for your sector. Data, integrations and review responsibilities are agreed around each workflow.</p></div>
    <div className="home-industry-layout"><div className="home-industry-tabs" role="tablist" aria-label="Explore industries" aria-orientation="vertical">{sectors.map((sector,index)=><button key={sector.title} ref={node=>{tabs.current[index]=node;}} type="button" role="tab" id={`sector-tab-${index}`} aria-selected={selected===index} aria-controls="sector-panel" tabIndex={selected===index?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>onKeyDown(event,index)}>{sector.title}<ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
      <div id="sector-panel" className="home-industry-panel" role="tabpanel" aria-labelledby={`sector-tab-${selected}`} tabIndex={0}><img className="home-industry-photo" src={`/media/${photos[selected]}.webp`} alt="" width={1200} height={675} loading="lazy" /><Icon className="home-industry-icon" size={95} strokeWidth={.8} aria-hidden="true" /><p className="eyebrow">{active.title}</p><h3>{active.headline}</h3><p>{active.description}</p><a className="text-link" href={industryLinks[selected].href}>Explore {active.title.toLowerCase()}<ArrowUpRight size={19} aria-hidden="true" /></a></div>
    </div>
    <noscript><div className="home-industry-fallback">{industryLinks.map(link=><a href={link.href} key={link.href}>{link.title}</a>)}</div></noscript>
  </div></section>;
}
