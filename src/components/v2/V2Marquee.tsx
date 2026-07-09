"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

function Group() {
  return (
    <div className="v2-marquee__group" aria-hidden="true">
      <span className="o">Olio Nuovo</span>
      <span className="p">pressed 14 Oct 2025</span>
      <span>Olio Nuovo</span>
      <span className="p">0.18% acidity</span>
    </div>
  );
}

export default function V2Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tween = gsap.to(".v2-marquee__track", {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });
      // scroll direction nudges the speed — a small live detail
      let proxy = 1;
      gsap.to({}, {
        scrollTrigger: {
          onUpdate: (self) => {
            proxy = self.direction;
            gsap.to(tween, { timeScale: proxy * 1, duration: 0.4, overwrite: true });
          },
        },
      });
    },
    { scope: ref }
  );

  return (
    <div className="v2-marquee" ref={ref}>
      <p className="sr-only">Olio Nuovo. Pressed 14 October 2025. 0.18% acidity.</p>
      <div className="v2-marquee__track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
