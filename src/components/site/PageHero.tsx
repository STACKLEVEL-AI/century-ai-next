import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import TelegramLink from "@/components/TelegramLink";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  secondary?: { href: string; label: string };
  hideActions?: boolean;
};

export default function PageHero({ eyebrow, title, description, children, dark = false, secondary, hideActions = false }: PageHeroProps) {
  return <section className={`inner-hero${dark ? " inner-hero-dark" : ""}${children ? " inner-hero-split" : ""}`}>
    <div className="shell inner-hero-layout">
      <div className="inner-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="inner-hero-description">{description}</p>
        {!hideActions && <div className="inner-hero-actions"><TelegramLink className="btn btn-brand">Get in touch</TelegramLink>{secondary && <a className={`btn ${dark ? "btn-outline-light" : "btn-outline"}`} href={secondary.href}>{secondary.label}<ArrowUpRight size={17} aria-hidden="true" /></a>}</div>}
      </div>
      {children && <div className="inner-hero-visual">{children}</div>}
    </div>
  </section>;
}
