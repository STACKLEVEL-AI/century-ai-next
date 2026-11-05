"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { companyLinks, industryLinks, platformLinks, type NavigationLink } from "@/lib/navigation";
import TelegramLink from "./TelegramLink";

const groups = [
  { label: "Platform", links: platformLinks },
  { label: "Industries", links: industryLinks },
  { label: "Company", links: companyLinks },
];

function MenuLinks({ links }: { links: NavigationLink[] }) {
  return <>{links.map(link => <a href={link.href} className="nav-menu-link" key={link.href}><span>{link.title}<ArrowUpRight size={15} aria-hidden="true" /></span>{link.description && <small>{link.description}</small>}</a>)}</>;
}

export default function Header({ variant = "overlay", showAnnouncement = true }: { variant?: "overlay" | "light"; showAnnouncement?: boolean }) {
  const header = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 46);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const closeMenus = (event: MouseEvent | KeyboardEvent) => {
      const root = header.current;
      if (!root) return;
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof MouseEvent && root.contains(event.target as Node)) return;
      const open = Array.from(root.querySelectorAll<HTMLDetailsElement>("details[open]"));
      if (event instanceof KeyboardEvent && open.length) {
        const focusedMenu = open.find(menu => menu.contains(document.activeElement));
        focusedMenu?.querySelector<HTMLElement>("summary")?.focus();
      }
      open.forEach(menu => { menu.open = false; });
    };
    document.addEventListener("click", closeMenus);
    document.addEventListener("keydown", closeMenus);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("click", closeMenus); document.removeEventListener("keydown", closeMenus); };
  }, []);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    {showAnnouncement && <div className="announcement"><span>From AI ambition to everyday impact.</span><a href="/deployment/">Discover our approach<ArrowRight size={14} aria-hidden="true" /></a></div>}
    <header ref={header} className={`site-header${variant === "light" ? " site-header-light" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell header-inner">
        <a className="brand" href="/" aria-label="Century home"><img className="brand-image" src={variant === "light" || scrolled ? "/brand/century-logo.svg" : "/brand/century-logo-white.svg"} alt="Century" width={221} height={58} /></a>
        <nav className="main-nav desktop-navigation" aria-label="Main navigation">
          {groups.map(group => <details className="nav-dropdown" name="desktop-navigation" key={group.label}><summary>{group.label}<ChevronDown size={13} aria-hidden="true" /></summary><div className="nav-menu"><div className="nav-menu-heading"><p>{group.label}</p><span>Explore Century</span></div><div className="nav-menu-grid"><MenuLinks links={group.links} /></div></div></details>)}
          <a href="/blog/">Blog</a>
        </nav>
        <div className="header-actions"><TelegramLink className="btn btn-header">Get in touch</TelegramLink>
          <details className="mobile-navigation"><summary aria-label="Open navigation menu"><Menu size={21} aria-hidden="true" /><span>Menu</span></summary><nav aria-label="Mobile navigation" className="mobile-navigation-panel">{groups.map(group => <details key={group.label} name="mobile-navigation-group"><summary>{group.label}<ChevronDown size={16} aria-hidden="true" /></summary><MenuLinks links={group.links} /></details>)}<a className="mobile-blog-link" href="/blog/">Blog<ArrowUpRight size={16} aria-hidden="true" /></a></nav></details>
        </div>
      </div>
    </header>
    {variant === "light" && <div className="header-spacer" aria-hidden="true" />}
  </>;
}
