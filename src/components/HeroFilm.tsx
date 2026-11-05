"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroMedia } from "@/lib/hero-media";

const films = {
  desktop: { src: heroMedia.desktopFilm, poster: heroMedia.poster },
  mobile: { src: heroMedia.mobileFilm, poster: heroMedia.posterMobile },
} as const;

type Film = (typeof films)[keyof typeof films];
type DataConnection = EventTarget & { saveData?: boolean };

/** Decorative film: the local poster remains the fallback without JavaScript. */
export default function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const autoplayBlocked = useRef(false);
  const synchronizePlayback = useRef<() => void>(() => {});
  const [film, setFilm] = useState<Film | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;

    // Select one file before mounting the video; resizing never downloads both.
    setFilm(window.matchMedia("(max-width: 640px)").matches ? films.mobile : films.desktop);
    const update = () => {
      const allowed = !preference.matches && !connection?.saveData;
      setEnabled(allowed);
      if (!allowed) setPlaying(false);
    };
    update();
    preference.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      preference.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!enabled || !film || failed || !element) return;

    let cancelled = false;
    const synchronize = () => {
      const bounds = element.getBoundingClientRect();
      const inView = bounds.bottom > 0 && bounds.top < window.innerHeight
        && bounds.right > 0 && bounds.left < window.innerWidth;
      const shouldPlay = inView && document.visibilityState === "visible"
        && !manuallyPaused.current && !autoplayBlocked.current;

      if (!shouldPlay) {
        element.pause();
        return;
      }
      if (!element.paused) return;

      void element.play().catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPlaying(false);
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          // A browser policy can block autoplay while still allowing a click.
          autoplayBlocked.current = true;
        } else {
          setFailed(true);
        }
      });
    };

    synchronizePlayback.current = synchronize;
    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(synchronize, { threshold: 0 });
    observer?.observe(element);
    if (!observer) window.addEventListener("scroll", synchronize, { passive: true });
    window.addEventListener("resize", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    synchronize();

    return () => {
      cancelled = true;
      synchronizePlayback.current = () => {};
      observer?.disconnect();
      if (!observer) window.removeEventListener("scroll", synchronize);
      window.removeEventListener("resize", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
      element.pause();
    };
  }, [enabled, film, failed]);

  if (!enabled || !film || failed) return null;

  return <>
    <video ref={video} className="hero-film" src={film.src} muted loop playsInline preload="none" poster={film.poster} aria-hidden="true"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setPlaying(false); setFailed(true); }} />
    <button className="film-control" type="button"
      aria-label={playing ? "Pause background video" : "Play background video"}
      title={playing ? "Pause background video" : "Play background video"}
      onClick={() => {
        const element = video.current;
        if (!element) return;
        if (!element.paused) {
          manuallyPaused.current = true;
          element.pause();
        } else {
          manuallyPaused.current = false;
          autoplayBlocked.current = false;
          synchronizePlayback.current();
        }
      }}>{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
  </>;
}

