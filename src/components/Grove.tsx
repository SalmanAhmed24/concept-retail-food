"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const STATS = [
  { value: 4200, suffix: "", label: "Trees on the estate" },
  { value: 380, suffix: " m", label: "Altitude above the gulf" },
  { value: 0.18, suffix: " %", label: "Free acidity, 2025 press", decimals: 2 },
  { value: 3, suffix: "", label: "Generations of pickers" },
];

export default function Grove() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".grove__copy > *", {
        autoAlpha: 0,
        y: 34,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".grove__copy", start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>(".grove__frame").forEach((frame) => {
        const img = frame.querySelector("img");
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.16 },
          {
            yPercent: 8,
            scale: 1.16,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".grove__stat-value [data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".grove__stats", start: "top 85%" },
          onUpdate: () => {
            el.textContent = state.v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="grove" id="grove" ref={ref}>
      <div className="grove__grid">
        <div className="grove__copy">
          <p className="kicker kicker--leaf">The grove</p>
          <h2 className="grove__title">
            Nine hundred of our trees are <em>older</em> than the road that reaches them.
          </h2>
          <p>
            The estate sits on a limestone terrace above the Messinian gulf,
            where sea air keeps the fruit small and the flavour loud. We farm
            the way the grove asks us to — dry, slow, and by hand.
          </p>
          <p>
            Every bottle is traceable to a single day&apos;s pick. The harvest
            date is printed on the label, because with olive oil, fresh is a
            fact, not a mood.
          </p>
        </div>

        <div className="grove__media">
          <div className="grove__frame grove__frame--tall">
            <Image
              src={IMAGES.groveTall}
              alt="Ripe Koroneiki olives on the branch"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
          <p className="grove__caption">Koroneiki, three weeks before the pick</p>
          <div className="grove__frame grove__frame--wide">
            <Image
              src={IMAGES.groveWide}
              alt="Rows of olive trees on the Verdale estate under open sky"
              fill
              sizes="(max-width: 900px) 80vw, 36vw"
            />
          </div>
        </div>
      </div>

      <dl className="grove__stats">
        {STATS.map((s) => (
          <div className="grove__stat" key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="grove__stat-value">
              <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                {s.value.toLocaleString("en-US", {
                  minimumFractionDigits: s.decimals ?? 0,
                })}
              </span>
              <sup>{s.suffix}</sup>
            </dd>
            <dd className="grove__stat-label">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
