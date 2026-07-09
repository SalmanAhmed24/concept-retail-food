"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

export default function V2Collage() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // frames drift at different speeds — a loose, hand-pinned board
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        gsap.to(el, {
          y: () => speed * -120,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".v2-collage__frame img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "top 30%", scrub: true },
          }
        );
      });

      gsap.from(".v2-collage__pull", {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".v2-collage__pull", start: "top 82%" },
      });
    },
    { scope: ref }
  );

  return (
    <section className="v2-collage" id="story" ref={ref}>
      <div className="v2-collage__frames">
        <div className="v2-collage__frame v2-collage__frame--a" data-speed="0.5">
          <Image src={IMAGES.harvest} alt="Hands full of freshly picked olives" fill sizes="(max-width: 900px) 66vw, 40vw" />
        </div>
        <div className="v2-collage__frame v2-collage__frame--b" data-speed="1">
          <Image src={IMAGES.hero} alt="A sunlit path through the Verdale grove" fill sizes="(max-width: 900px) 75vw, 40vw" />
        </div>
        <div className="v2-collage__frame v2-collage__frame--c" data-speed="0.25">
          <Image src={IMAGES.groveTall} alt="Ripe Koroneiki olives on the branch" fill sizes="(max-width: 900px) 58vw, 33vw" />
        </div>

        <p className="v2-collage__pull">
          The grove is <mark>4,200 trees</mark>, one family, and a mill close
          enough to hear.
        </p>

        <p className="v2-collage__caption">
          Nothing here travels. Fruit comes off the branch at first light,
          rolls two hundred metres downhill, and is oil before lunch. The
          harvest date goes on every label — with olive oil, fresh is a fact,
          not a mood.
        </p>
      </div>
    </section>
  );
}
