'use client';

import { useEffect, useRef, useState } from 'react';

export default function SectionNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  const sectionsCount = 10;
  const contrastSectionIndices = [5, 9];

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    sectionsRef.current = sections;

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

  const handleDotClick = (index: number) => {
    const section = sectionsRef.current[index];
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="section-dots-container">
      {Array.from({ length: sectionsCount }).map((_, i) => (
        <div
          key={i}
          className={`section-dot ${i === activeIndex ? 'active' : ''} ${contrastSectionIndices.includes(activeIndex) ? 'contrast' : ''}`}
          onClick={() => handleDotClick(i)}
        />
      ))}
    </div>
  );
}