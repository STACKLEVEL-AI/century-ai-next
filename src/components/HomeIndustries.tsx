"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, HeartPulse, Landmark, Plane, PlugZap, Radio, ShieldCheck, ShoppingBag } from "lucide-react";
import { industryLinks } from "@/lib/navigation";
import styles from "./HomeIndustries.module.css";

const sectors = [
  { slug: "banking", title: "Banking", headline: "Clarity for complex banking workflows.", description: "Bring policies, documents and service context together for the people making decisions.", icon: Landmark },
  { slug: "telecommunication", title: "Telecommunications", headline: "Keep the customer context connected.", description: "Help service teams work with verified information, consistent answers and complete handovers.", icon: Radio },
  { slug: "healthcare", title: "Healthcare", headline: "Support the work around better care.", description: "Make administrative knowledge and document preparation easier for authorised teams to review.", icon: HeartPulse },
  { slug: "utilities", title: "Utilities", headline: "Connect requests with operational knowledge.", description: "Prepare service cases, document checklists and field handovers from approved information.", icon: PlugZap },
  { slug: "insurance", title: "Insurance", headline: "Move paperwork forward. Keep judgment human.", description: "Organise submissions, policy knowledge and claims documentation for accountable review.", icon: ShieldCheck },
  { slug: "retail", title: "Retail", headline: "Help everyday retail work together.", description: "Support customers, stores and supplier operations with knowledge that teams can check.", icon: ShoppingBag },
  { slug: "airlines", title: "Airlines", headline: "Keep teams informed when plans change.", description: "Prepare consistent service responses and complete handovers from verified travel information.", icon: Plane },
];

const photos = [
  { src: "/media/industry.webp", width: 1200, height: 670 },
  { src: "/media/industries/telecommunication/hero-1280.webp", width: 1280, height: 714 },
  { src: "/media/industries/healthcare/hero-1280.webp", width: 1280, height: 714 },
  { src: "/media/industries/utilities/hero-1280.webp", width: 1280, height: 714 },
  { src: "/media/insurance/hero-1600.webp", width: 1600, height: 893 },
  { src: "/media/industries/retail/hero-1280.webp", width: 1280, height: 714 },
  { src: "/media/support.webp", width: 1200, height: 675 },
];

export default function HomeIndustries() {
  const [selected, setSelected] = useState(0);
  const [tabletTabs, setTabletTabs] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 641px) and (max-width: 900px)");
    const update = () => setTabletTabs(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % sectors.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + sectors.length - 1) % sectors.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sectors.length - 1;
    else return;

    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus({ preventScroll: true });
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const active = sectors[selected];
  const Icon = active.icon;
  const photo = photos[selected];

  return (
    <section id="industries" className={styles.industries} aria-labelledby="industries-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Across your industry</p>
            <h2 id="industries-title">Built around<br />your industry.</h2>
          </div>
          <p className={styles.intro}>Explore starting points for your sector. Data, integrations and review responsibilities are agreed around each workflow.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.tabs} role="tablist" aria-label="Explore industries" aria-orientation={tabletTabs ? "horizontal" : "vertical"}>
            {sectors.map((sector, index) => (
              <button
                className={styles.tab}
                key={sector.slug}
                ref={node => { tabs.current[index] = node; }}
                type="button"
                role="tab"
                id={`sector-tab-${index}`}
                aria-selected={selected === index}
                aria-controls="sector-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={event => onKeyDown(event, index)}
              >
                <span>{sector.title}</span><ArrowUpRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="sector-panel" className={styles.panel} role="tabpanel" aria-labelledby={`sector-tab-${selected}`} tabIndex={0}>
            <img
              className={styles.photo}
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
            <Icon className={styles.icon} size={50} strokeWidth={0.8} aria-hidden="true" />
            <p className={styles.panelEyebrow}>{active.title}</p>
            <h3>{active.headline}</h3>
            <p className={styles.description}>{active.description}</p>
            <a className={styles.cta} href={industryLinks[selected].href}>
              Explore {active.title.toLowerCase()}<ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <noscript>
          <nav className={`${styles.fallback} home-industry-fallback`} aria-label="Industry pages">
            {industryLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}
          </nav>
        </noscript>
      </div>
    </section>
  );
}

