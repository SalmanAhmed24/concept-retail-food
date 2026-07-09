"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import V2Stamp from "./V2Stamp";

export default function V2Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".v2-footer__cta > *", {
        autoAlpha: 0,
        y: 36,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".v2-footer__cta", start: "top 85%" },
      });
      gsap.to(".v2-footer__stamp svg", { rotation: -360, duration: 26, ease: "none", repeat: -1 });
    },
    { scope: ref }
  );

  return (
    <footer className="v2-footer" ref={ref}>
      <div className="v2-footer__stamp">
        <V2Stamp />
      </div>

      <div className="v2-footer__cta">
        <p className="v2-kicker" style={{ color: "#e9c25f" }}>
          One pressing a year · gone by spring
        </p>
        <h2>
          Don&apos;t miss <em>the loud one.</em>
        </h2>
        <p>
          Join the Press Club and this year&apos;s olio nuovo ships the week it
          leaves the mill — harvest date on the label, cough guaranteed.
        </p>
        <a className="v2-btn" href="#rail">
          Join the Press Club
        </a>
      </div>

      <div className="v2-footer__bar">
        <p>© 2026 Verdale Estate · Concept 02 “Olio Nuovo”</p>
        <p>
          <Link href="/">View Concept 01</Link> · Photography: Pexels (free license)
        </p>
      </div>
    </footer>
  );
}
