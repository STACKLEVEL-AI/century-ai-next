"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { industryLinks } from "@/lib/navigation";
import styles from "./HomeIndustries.module.css";

const sectors = [
  { slug: "banking", title: "Banking", headline: "Clarity for complex banking workflows.", description: "Bring policies, documents and service context together for the people making decisions.", width: 1926, height: 1075 },
  { slug: "telecommunication", title: "Telecommunications", headline: "Keep the customer context connected.", description: "Help service teams work with verified information, consistent answers and complete handovers.", width: 1651, height: 921 },
  { slug: "healthcare", title: "Healthcare", headline: "Support the work around better care.", description: "Make administrative knowledge and document preparation easier for authorised teams to review.", width: 1926, height: 1075 },
  { slug: "utilities", title: "Utilities", headline: "Connect requests with operational knowledge.", description: "Prepare service cases, document checklists and field handovers from approved information.", width: 2048, height: 1143 },
  { slug: "insurance", title: "Insurance", headline: "Move paperwork forward. Keep judgment human.", description: "Organise submissions, policy knowledge and claims documentation for accountable review.", width: 2560, height: 1429 },
  { slug: "retail", title: "Retail", headline: "Help everyday retail work together.", description: "Support customers, stores and supplier operations with knowledge that teams can check.", width: 1651, height: 921 },
  { slug: "airlines", title: "Airlines", headline: "Keep teams informed when plans change.", description: "Prepare consistent service responses and complete handovers from verified travel information.", width: 2048, height: 1143 },
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

    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus({ preventScroll: true });
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const active = sectors[selected];
  const imageBase = active.slug === "insurance" ? "/media/insurance" : `/media/industries/${active.slug}`;
  const previewWidth = active.slug === "insurance" ? 1600 : 1280;

  return (
    <section id="industries" className={styles.industries} aria-labelledby="industries-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Across your industry</p>
          <h2 id="industries-title">Built around<br />your industry.</h2>
          <p className={styles.intro}>Explore starting points for your sector. Data, integrations and review responsibilities are agreed around each workflow.</p>
        </header>

        <div className={styles.tabsViewport}>
          <div className={styles.tabs} role="tablist" aria-label="Explore industries" aria-orientation="horizontal">
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
                {sector.title}
              </button>
            ))}
          </div>
        </div>

        <div id="sector-panel" className={styles.panel} role="tabpanel" aria-labelledby={`sector-tab-${selected}`} tabIndex={0}>
          <picture className={styles.picture} key={active.slug}>
            <source media="(max-width: 700px)" srcSet={`${imageBase}/hero-mobile.webp`} />
            <img
              className={styles.photo}
              src={`${imageBase}/hero.webp`}
              srcSet={`${imageBase}/hero-${previewWidth}.webp ${previewWidth}w, ${imageBase}/hero.webp ${active.width}w`}
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1520px) calc(100vw - 80px), 1440px"
              alt=""
              width={active.width}
              height={active.height}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <h3 className={styles.sectorTitle}>{active.title}</h3>
          <div className={styles.panelCopy}>
            <p className={styles.headline}>{active.headline}</p>
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

