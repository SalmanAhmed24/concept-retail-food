"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const QUOTE =
  "You taste the field before you taste the fruit — green, peppery, completely alive.";

export default function Quote() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".quote__text .w", { color: "var(--plaster)" });
        return;
      }
      gsap.to(".quote__text .w", {
        color: "var(--plaster)",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".quote__text",
          start: "top 78%",
          end: "bottom 45%",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <section className="quote" ref={ref}>
      <p className="quote__mark" aria-hidden="true">
        “
      </p>
      <blockquote>
        <p className="quote__text">
          {QUOTE.split(" ").map((w, i) => (
            <span className="w" key={i}>
              {w}{" "}
            </span>
          ))}
        </p>
        <footer className="quote__cite">— Elena M., chef, Athens</footer>
      </blockquote>
    </section>
  );
}
