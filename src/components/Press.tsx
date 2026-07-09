"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const PHASES = [
  {
    meta: "05:40 — the pick",
    title: "Picked by hand at first light",
    body: "Combs and nets, never machines. The fruit comes off the branch whole and goes into shallow crates so nothing bruises on the way down the hill.",
    img: IMAGES.harvest,
    alt: "Hands holding freshly picked olives in the grove",
  },
  {
    meta: "08:15 — the mill",
    title: "Milled cold, four hours later",
    body: "Our own mill sits at the edge of the grove. Fruit is washed, crushed and malaxed below 27 °C the same morning it is picked — the four-hour rule is the whole house style.",
    img: IMAGES.press,
    alt: "Freshly harvested olives in crates at the mill",
  },
  {
    meta: "same week — the pour",
    title: "Bottled unfiltered, the same week",
    body: "The oil rests briefly in steel, then goes to dark glass with its harvest date on the label. A little cloud in the bottle is the grove, still settling.",
    img: IMAGES.pour,
    alt: "Golden olive oil being poured",
  },
];

export default function Press() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const phases = gsap.utils.toArray<HTMLElement>(".press__phase");
          const media = gsap.utils.toArray<HTMLElement>(".press__media-item");
          const counts = gsap.utils.toArray<HTMLElement>(".press__count span");

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".press__stage",
              start: "top top",
              end: "+=280%",
              pin: true,
              scrub: 0.6,
            },
          });

          // the oil line runs the full length of the pin
          tl.to(".press__line", { scaleY: 1, duration: 3 }, 0).to(
            ".press__drop",
            { top: "100%", duration: 3 },
            0
          );

          PHASES.forEach((_, i) => {
            const at = i;
            tl.to(phases[i], { autoAlpha: 1, duration: 0.35 }, at)
              .fromTo(
                media[i],
                { autoAlpha: 0, scale: 1.08 },
                { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power1.out" },
                at
              )
              .to(counts[i], { autoAlpha: 1, duration: 0.3 }, at);

            if (i < PHASES.length - 1) {
              tl.to(phases[i], { autoAlpha: 0, y: -18, duration: 0.3 }, at + 0.72)
                .to(media[i], { autoAlpha: 0, duration: 0.35 }, at + 0.75)
                .to(counts[i], { autoAlpha: 0, duration: 0.25 }, at + 0.72);
            }
          });
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".press__phase, .press__media-item, .press__count span", {
          clearProps: "opacity,visibility",
          autoAlpha: 1,
        });
        gsap.set(".press__line", { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section className="press" id="press" ref={ref}>
      <div className="press__intro">
        <p className="kicker kicker--oil">The press</p>
        <h2>
          From branch to bottle, <em>while the field is still on it.</em>
        </h2>
        <p>
          Oxidation is the enemy of flavour, and the clock starts the moment an
          olive leaves the tree. So we built the mill where the trees are.
          Scroll — this is a morning at Verdale.
        </p>
      </div>

      {/* desktop: pinned scroll narrative */}
      <div className="press__stage">
        <div className="press__line" />
        <div className="press__drop" />

        <div className="press__phases">
          {PHASES.map((p) => (
            <div className="press__phase" key={p.meta}>
              <p className="press__phase-meta">{p.meta}</p>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>

        <div className="press__media">
          {PHASES.map((p) => (
            <div className="press__media-item" key={p.meta}>
              <Image src={p.img} alt="" fill sizes="55vw" />
            </div>
          ))}
        </div>

        <div className="press__index">
          <div className="press__count">
            {PHASES.map((_, i) => (
              <span key={i}>0{i + 1}</span>
            ))}
          </div>
          <p className="press__total">/ 03 — one morning</p>
        </div>
      </div>

      {/* mobile + screen readers: stacked cards */}
      <div className="press__cards">
        {PHASES.map((p, i) => (
          <article className="press__card" key={p.meta}>
            <div className="press__card-frame">
              <Image src={p.img} alt={p.alt} fill sizes="100vw" />
            </div>
            <p className="press__phase-meta">
              0{i + 1} · {p.meta}
            </p>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
