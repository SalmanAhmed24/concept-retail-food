"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".line-mask > span, .hero__eyebrow, .hero__aside > *, .hero__badge", {
          clearProps: "all",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero__media", { scale: 1.14, duration: 2.2, ease: "power2.out" }, 0)
        .from(
          ".hero__title .line-mask > span",
          { yPercent: 115, duration: 1.3, stagger: 0.12 },
          0.25
        )
        .from(".hero__eyebrow", { autoAlpha: 0, x: -24, duration: 0.9 }, 0.5)
        .from(
          ".hero__aside > *",
          { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.12 },
          0.85
        )
        .from(".hero__badge", { autoAlpha: 0, y: -14, duration: 0.8 }, 1);

      // slow parallax drift as the hero leaves the viewport
      gsap.to(".hero__media", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref }
  );

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__media">
        <Image
          src={IMAGES.hero}
          alt="Morning light falling through the rows of the Verdale olive grove"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <p className="hero__badge">
        <strong>Harvest 2025</strong>
        <span>Now bottling · ships weekly</span>
      </p>

      <div className="hero__inner">
        <div>
          <p className="hero__eyebrow kicker">Single-estate olive house · Messinia, Greece</p>
          <h1 className="hero__title">
            <span className="line-mask"><span>Four hours</span></span>
            <span className="line-mask"><span>from <em>branch</em></span></span>
            <span className="line-mask"><span>to bottle.</span></span>
          </h1>
        </div>

        <div className="hero__aside">
          <p>
            One grove, one variety, one press on the property. We pick Koroneiki
            olives at first light and mill them before lunch — nothing blended,
            nothing filtered, nothing in between.
          </p>
          <a className="btn btn--oil" href="#shop">
            <span className="btn__dot" aria-hidden="true" />
            Shop the harvest
          </a>
        </div>
      </div>
    </section>
  );
}
