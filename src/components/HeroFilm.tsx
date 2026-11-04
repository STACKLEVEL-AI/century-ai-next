"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Decorative film: the local poster remains the fallback without JavaScript. */
export default function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setEnabled(!preference.matches && !connection?.saveData);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return <>
    <video ref={video} className="hero-film" autoPlay muted loop playsInline preload="none" poster="/media/hero-poster.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src="/media/enterprise-film.mp4" type="video/mp4" />
    </video>
    <button className="film-control" type="button" aria-label={playing ? "Pause background video" : "Play background video"} onClick={() => {
      if (!video.current) return;
      if (playing) video.current.pause();
      else void video.current.play().catch(() => setPlaying(false));
    }}>{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
  </>;
}
