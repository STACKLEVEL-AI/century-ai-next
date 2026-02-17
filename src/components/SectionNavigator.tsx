'use client';

import { useEffect, useState } from 'react';

export default function SectionNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const SECTION_COUNT = 11;

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));

    if (sections.length === 0) return;

    const updateActive = () => {
      let closestIndex = 0;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - (window.innerHeight / 2));

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    const timeout = setTimeout(updateActive, 100);
    const snapTimeout = setTimeout(updateActive, 600);

    updateActive();

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
      clearTimeout(timeout);
      clearTimeout(snapTimeout);
    };
  }, []);

  return (
    <div className="section-dots-container">
      {Array.from({ length: SECTION_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`section-dot ${i === activeIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}