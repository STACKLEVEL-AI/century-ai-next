import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export type Feature = { title: string; description: string; icon?: ReactNode; eyebrow?: string };
export type RelatedLink = { href: string; title: string; description?: string; eyebrow?: string };

export function SectionHeading({ eyebrow, title, description, center = false }: { eyebrow: string; title: ReactNode; description?: ReactNode; center?: boolean }) {
  return <div className={`section-heading${center ? " section-heading-center" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 | 4 }) {
  return <div className={`feature-grid feature-grid-${columns}`}>{items.map((item, i) => <article className="feature-card" key={item.title}><div className="feature-card-icon">{item.icon || <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}</div>{item.eyebrow && <p className="eyebrow">{item.eyebrow}</p>}<h3>{item.title}</h3><p>{item.description}</p></article>)}</div>;
}
export function CapabilityAccordion({ items, label = "Explore capabilities" }: { items: { title: string; description: string }[]; label?: string }) {
  return <div className="capability-accordion" aria-label={label}>{items.map((item, i) => <details key={item.title} open={i === 0}><summary><span className="accordion-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span>{item.title}</span><span className="accordion-toggle" aria-hidden="true">+</span></summary><p>{item.description}</p></details>)}</div>;
}
export function RelatedPages({ links, title = "Keep exploring Century." }: { links: RelatedLink[]; title?: string }) {
  return <section className="section related-section"><div className="shell"><SectionHeading eyebrow="Connected by design" title={title} /><div className="related-grid">{links.map(link => <a className="related-card" href={link.href} key={link.href}>{link.eyebrow && <p className="eyebrow">{link.eyebrow}</p>}<div><h3>{link.title}</h3><ArrowUpRight size={24} aria-hidden="true" /></div>{link.description && <p>{link.description}</p>}</a>)}</div></div></section>;
}
