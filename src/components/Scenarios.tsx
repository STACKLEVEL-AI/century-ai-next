"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./Scenarios.module.css";

const scenarios = [
  { name: "Customer experience", image: "airport-woman", position: "68% center", title: "Every conversation.\nA useful next step.", href: "/agents/" },
  { name: "Employee assistance", image: "keyboard", position: "62% center", title: "Company knowledge.\nReady when you need it.", href: "/agents/" },
  { name: "Business operations", image: "truck", position: "51% center", title: "Keep your work\nmoving forward.", href: "/systems/" },
  { name: "A connected platform", image: "control", position: "66% center", title: "One foundation.\nMore possibilities.", href: "/ai-os/" },
  { name: "Hands-on deployment", image: "office", position: "52% center", title: "From AI ambition\nto everyday progress.", href: "/deployment/" },
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
      <div><p className="eyebrow">Where AI becomes useful</p><h2 id="use-cases-title">Real work.<br />Meaningful progress.</h2></div>
      <div className={styles.introduction}>
        <p>Start with the problems that matter to your business. Connect the people, knowledge and systems that can solve them.</p>
        <div className={styles.controls} aria-label="Browse use cases">
          <button type="button" aria-label="Previous use case" aria-controls="scenario-track" disabled={!canPrevious} onClick={() => scroll(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" aria-label="Next use case" aria-controls="scenario-track" disabled={!canNext} onClick={() => scroll(1)}><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
    <ul className={styles.track} id="scenario-track" ref={track} aria-label="AI use cases">
      {scenarios.map(({ name, image, position, title, href }) => <li className={styles.item} key={name}>
        <a className={styles.card} href={href}>
          <img src={`/media/stock/scene-${image}.webp`} style={{ objectPosition: position }} alt="" width={960} height={540} loading="lazy" decoding="async" />
          <h3>{title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3>
          <ArrowUpRight className={styles.arrow} size={23} strokeWidth={1.5} aria-hidden="true" />
          <span className={styles.label}>{name}</span>
        </a>
      </li>)}
    </ul>
  </section>;
}

