"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const NOTES = [
  {
    name: "Green almond",
    where: "the first sip",
    img: IMAGES.productOlives,
    alt: "Fresh green olives in bowls",
    note: "Soft and milky up front — the young Koroneiki fruit, picked green on purpose.",
    meters: { fruit: 82, bitter: 34, pepper: 28 },
  },
  {
    name: "Cut grass",
    where: "mid-palate",
    img: IMAGES.groveWide,
    alt: "The Verdale grove under open sky",
    note: "That sharp field-green middle is polyphenols — the grove itself, dissolved.",
    meters: { fruit: 64, bitter: 58, pepper: 46 },
  },
  {
    name: "Black pepper",
    where: "the finish",
    img: IMAGES.pour,
    alt: "Golden olive oil being poured",
    note: "A back-of-the-throat burn that makes you cough once. In Messinia, the cough is the compliment.",
    meters: { fruit: 40, bitter: 52, pepper: 88 },
  },
];

export default function V2Flavor() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const m = NOTES[active].meters;
      gsap.to(".v2-flavor__fill--fruit", { width: `${m.fruit}%`, duration: calm ? 0 : 0.7, ease: "power3.out" });
      gsap.to(".v2-flavor__fill--bitter", { width: `${m.bitter}%`, duration: calm ? 0 : 0.7, ease: "power3.out" });
      gsap.to(".v2-flavor__fill--pepper", { width: `${m.pepper}%`, duration: calm ? 0 : 0.7, ease: "power3.out" });

      gsap.utils.toArray<HTMLElement>(".v2-flavor__img").forEach((el, i) => {
        gsap.to(el, {
          autoAlpha: i === active ? 1 : 0,
          scale: i === active ? 1 : 1.05,
          duration: calm ? 0 : 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      if (!calm) {
        gsap.fromTo(".v2-flavor__note", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" });
      }
    },
    { scope: ref, dependencies: [active] }
  );

  return (
    <section className="v2-flavor" id="flavor" ref={ref}>
      <div className="v2-flavor__head">
        <p className="v2-kicker">The tasting · press to taste</p>
        <h2>
          Three notes, <em>one morning.</em>
        </h2>
      </div>

      <div className="v2-flavor__grid">
        <div className="v2-flavor__tabs" role="tablist" aria-label="Tasting notes">
          {NOTES.map((n, i) => (
            <button
              key={n.name}
              className="v2-flavor__tab"
              role="tab"
              aria-selected={i === active}
              aria-controls="v2-flavor-panel"
              onClick={() => setActive(i)}
              type="button"
            >
              <span className="v2-flavor__num">n.{i + 1}</span>
              <span className="v2-flavor__name">{n.name}</span>
              <span className="v2-flavor__where">{n.where}</span>
            </button>
          ))}

          <div className="v2-flavor__meters" aria-hidden="true">
            <div className="v2-flavor__meter">
              <span>Fruitiness</span>
              <span className="v2-flavor__bar"><span className="v2-flavor__fill v2-flavor__fill--fruit" /></span>
              <span>{NOTES[active].meters.fruit}</span>
            </div>
            <div className="v2-flavor__meter">
              <span>Bitterness</span>
              <span className="v2-flavor__bar"><span className="v2-flavor__fill v2-flavor__fill--bitter" /></span>
              <span>{NOTES[active].meters.bitter}</span>
            </div>
            <div className="v2-flavor__meter">
              <span>Pepper</span>
              <span className="v2-flavor__bar"><span className="v2-flavor__fill v2-flavor__fill--pepper" /></span>
              <span>{NOTES[active].meters.pepper}</span>
            </div>
          </div>
        </div>

        <div className="v2-flavor__media" id="v2-flavor-panel" role="tabpanel">
          {NOTES.map((n, i) => (
            <div className={`v2-flavor__img${i === active ? " is-active" : ""}`} key={n.name}>
              <Image src={n.img} alt={n.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          ))}
          <p className="v2-flavor__note">{NOTES[active].note}</p>
        </div>
      </div>
    </section>
  );
}
