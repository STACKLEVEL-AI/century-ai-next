"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;
      const current = window.scrollY;
      setHidden(current > lastScrollY.current && current > 80);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setHidden(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const onResize = () => {
      if (window.innerWidth > 1280) setMenuOpen(false);

      // Отключаем transition на время ресайза
      document.querySelector(".main-nav")?.classList.add("no-transition");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.querySelector(".main-nav")?.classList.remove("no-transition");
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.main-nav a[href^="#"]'),
    );
    const sections = navLinks
      .map((link) => {
        const sel = link.getAttribute("href");
        if (!sel) return null;
        const section = document.querySelector(sel);
        return section ? { link, section } : null;
      })
      .filter(Boolean) as { link: HTMLAnchorElement; section: Element }[];

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const visibility = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let active: Element | null = null;
        let maxRatio = 0;

        sections.forEach(({ section }) => {
          const ratio = visibility.get(section) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            active = section;
          }
        });

        if (!active) return;

        sections.forEach(({ link, section }) => {
          link.classList.toggle("is-active", section === active);
        });
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-26% 0px -44% 0px",
      },
    );

    sections.forEach(({ section }) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header${hidden ? " is-hidden" : ""} ${menuOpen ? " menu-open" : ""} shell`}
    >
      <div className="header-main">
        <a
          href="#home"
          className="logo"
          aria-label="Century by Stacklevel Group"
        >
          <span className="logo-line-two">
            <Image
              className="logo-stacklevel"
              src="assets/sl.png"
              alt="Stacklevel"
              width={300}
              height={23}
              priority
            />
          </span>
        </a>

        <button
          className={`burger-btn${menuOpen ? " is-active" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>

        <nav
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Основная навигация"
        >
          <a href="#why-now" onClick={closeMenu}>
            Задачи&nbsp;CDTO
          </a>
          <a href="#narrative" onClick={closeMenu}>
            Дорожная&nbsp;карта
          </a>
          <a href="#platform" onClick={closeMenu}>
            Контур
          </a>
          <a href="#scenarios" onClick={closeMenu}>
            Кейсы
          </a>
          <a href="#motion" onClick={closeMenu}>
            Преимущества
          </a>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>
            Рабочая сессия
          </a>
        </nav>

        <div className="header-tools">
          <a href="#contact" className="header-cta" onClick={closeMenu}>
            Рабочая сессия
          </a>
        </div>
      </div>
    </header>
  );
}
