"use client";

import { useEffect, useState } from "react";
import { heroMedia } from "@/lib/hero-media";

const films = {
  desktop: { src: heroMedia.desktopFilm, poster: heroMedia.poster },
  mobile: { src: heroMedia.mobileFilm, poster: heroMedia.posterMobile },
} as const;

type Film = (typeof films)[keyof typeof films];
type DataConnection = EventTarget & { saveData?: boolean };

/** Decorative film: the local poster remains the fallback without JavaScript. */
export default function HeroFilm() {
  const [film, setFilm] = useState<Film | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;

    // Select one file before mounting the video; resizing never downloads both.
    setFilm(window.matchMedia("(max-width: 640px)").matches ? films.mobile : films.desktop);
    const update = () => {
      const allowed = !preference.matches && !connection?.saveData;
      setEnabled(allowed);
    };
    update();
    preference.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      preference.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  if (!enabled || !film || failed) return null;

  return (
    <video
      className="hero-film"
      src={film.src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={film.poster}
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}
