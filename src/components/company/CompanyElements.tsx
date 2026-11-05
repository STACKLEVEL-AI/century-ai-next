import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import TelegramLink from "@/components/TelegramLink";
import { EGOR_PROFILE_URL, TELEGRAM_URL, VADIM_PROFILE_URL } from "@/lib/site";

export function CompanyMasthead({ eyebrow, title, description, link }: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  link?: { href: string; label: string };
}) {
  return <header className="co-masthead"><div className="shell"><p className="co-eyebrow">{eyebrow}</p><div className="co-masthead-grid"><h1>{title}</h1><div className="co-masthead-intro"><p>{description}</p>{link && <a className="co-text-link" href={link.href}>{link.label}<ArrowDown size={17} aria-hidden="true" /></a>}</div></div></div></header>;
}

export function CompanyPhoto({ src, alt, caption, priority = false, className = "" }: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return <figure className={`co-photo ${className}`}><div className="co-photo-frame"><Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 94vw" priority={priority} /></div>{caption && <figcaption>{caption}</figcaption>}</figure>;
}

export function CompanyHeading({ eyebrow, title, description }: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return <div className="co-heading"><p className="co-eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function CompanyCTA({ eyebrow = "A useful next step", title = <>Good work starts<br />with a conversation</>, description = "Bring a process, a question or an idea. Explore a useful starting point with Vitali", label = "Message Vitali on Telegram" }: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  label?: string;
}) {
  return <section className="co-cta"><div className="shell co-cta-grid"><div><p className="co-eyebrow">{eyebrow}</p><h2>{title}</h2></div><div className="co-cta-copy"><p>{description}</p><TelegramLink className="btn btn-light">{label}</TelegramLink></div></div></section>;
}

const founders = [
  { name: "Vitali Bakhmat", role: "Co-founder · CEO", description: "Business development and customer partnerships", image: "/founders/vitali-bakhmat.webp", width: 320, height: 400, href: TELEGRAM_URL, link: "Message Vitali on Telegram" },
  { name: "Vadim Vladymtsev", role: "Co-founder · CTO", description: "Enterprise AI architecture and engineering", image: "/founders/vadim-vladymtsev.webp", width: 320, height: 213, href: VADIM_PROFILE_URL, link: "vadimohka.com" },
  { name: "Egor Krychev", role: "Co-founder · CAIO", description: "AI automation, agents and business processes", image: "/founders/egor-krychev.webp", width: 320, height: 320, href: EGOR_PROFILE_URL, link: "LinkedIn" },
];

export function CompanyTeam({ compact = false }: { compact?: boolean }) {
  return <div className={`co-team-grid${compact ? " co-team-compact" : ""}`}>{founders.map((person) => <article className="co-person" key={person.name}><div className="co-person-photo"><Image src={person.image} alt={person.name} width={person.width} height={person.height} sizes="(max-width: 700px) 90vw, 30vw" /></div><div className="co-person-copy"><p className="co-person-role">{person.role}</p><h3>{person.name}</h3><p>{person.description}</p><a className="co-text-link" href={person.href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">{person.link}<ArrowUpRight size={16} aria-hidden="true" /></a></div></article>)}</div>;
}

export function CompanyAccordion({ items, label, firstOpen = false }: {
  items: { title: string; description: string }[];
  label: string;
  firstOpen?: boolean;
}) {
  return <div className="co-accordion" role="group" aria-label={label}>{items.map((item, i) => <details key={item.title} open={firstOpen && i === 0}><summary><span className="co-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span>{item.title}</span><Plus size={20} strokeWidth={1.25} aria-hidden="true" /></summary><p>{item.description}</p></details>)}</div>;
}
