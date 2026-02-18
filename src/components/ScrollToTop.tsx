"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 320);

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 600;
      setIsAtBottom(scrolledToBottom);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Вернуться в начало страницы"
      className={`scroll-to-top ${isVisible ? "" : "invisible"} ${isAtBottom ? "at-bottom" : ""}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
