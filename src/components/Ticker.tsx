"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const ITEMS = [
  "Cold-pressed within four hours",
  "Koroneiki & Kalamata",
  "0.18% acidity",
  "Unfiltered · unblended",
  "Est. 1962",
];

function Group() {
  return (
    <div className="ticker__group" aria-hidden="true">
      {ITEMS.map((item) => (
        <span key={item}>
          {item} <i>◦</i>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".ticker__track", {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });
    },
    { scope: ref }
  );

  return (
    <div className="ticker" ref={ref}>
      <p className="sr-only">
        Cold-pressed within four hours. Koroneiki and Kalamata. 0.18% acidity.
        Unfiltered, unblended. Established 1962.
      </p>
      <div className="ticker__track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
