"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./Scenarios.module.css";

const scenarios = [
  { name: "Customer experience", src: "/media/century/photos/banking-advice.webp", width: 1600, height: 900, position: "84% center", title: "Service knowledge\nWith sources in view", href: "/agents/" },
  { name: "Employee assistance", src: "/media/century/photos/employee-workspace.webp", width: 1600, height: 900, position: "50% center", portrait: true, title: "Company knowledge\nWith the right access", href: "/agents/" },
  { name: "Business operations", src: "/media/workflows.webp", width: 1200, height: 675, position: "55% center", title: "Repeatable work\nWith people in control", href: "/systems/" },
  { name: "A connected platform", src: "/media/knowledge.webp", width: 1200, height: 675, position: "54% center", title: "Requests to results\nOne connected cycle", href: "/ai-os/" },
  { name: "Hands-on deployment", src: "/media/century/photos/team-workshop.webp", width: 1600, height: 900, position: "50% center", title: "A tested workflow\nA team ready to own it", href: "/deployment/" },
];

export default function Scenarios() {
  const track = useRef<HTMLUListElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      setCanPrevious(element.scrollLeft > 2);
      setCanNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 2);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  const scroll = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const distance = card ? card.offsetWidth + 24 : element.clientWidth * 0.8;
    element.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return <section className={styles.section} id="use-cases" aria-labelledby="use-cases-title">
    <div className={`shell ${styles.heading}`}>
      <div><p className="eyebrow">Where AI becomes useful</p><h2 id="use-cases-title">Real work<br />A clear path forward</h2></div>
      <div className={styles.introduction}>
        <p>Capture requests from your teams, assess readiness and expected value, then choose the right approach for each task and define where people stay in control</p>
        <div className={styles.controls} aria-label="Browse use cases">
          <button type="button" aria-label="Previous use case" aria-controls="scenario-track" disabled={!canPrevious} onClick={() => scroll(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" aria-label="Next use case" aria-controls="scenario-track" disabled={!canNext} onClick={() => scroll(1)}><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
    <ul className={styles.track} id="scenario-track" ref={track} aria-label="AI use cases">
      {scenarios.map(({ name, src, width, height, position, portrait, title, href }) => <li className={styles.item} key={name}>
        <a className={portrait ? `${styles.card} ${styles.portrait}` : styles.card} href={href}>
          <img src={src} style={{ objectPosition: position }} alt="" width={width} height={height} loading="lazy" decoding="async" />
          <h3>{title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3>
          <ArrowUpRight className={styles.arrow} size={23} strokeWidth={1.5} aria-hidden="true" />
          <span className={styles.label}>{name}</span>
        </a>
      </li>)}
    </ul>
  </section>;
}

