"use client";

import { useEffect, useState } from "react";

export default function ScrollSnapType() {
  const [isProximity, setIsProximity] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("isProximity", isProximity);
  }, [isProximity]);

  return (
    <button
      className="scroll-snap-type-button"
      onClick={() => setIsProximity((prev) => !prev)}
    >
      animation: {isProximity ? "proximity" : "mandatory"}
    </button>
  );
}
