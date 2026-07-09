"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".footer__cta > *", {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".footer__cta", start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <footer className="footer" id="visit" ref={ref}>
      <div className="footer__cta">
        <p className="kicker kicker--oil">Open bottles daily, 10–18</p>
        <h2>
          Taste the <em>estate.</em>
        </h2>
        <a className="btn btn--oil" href="#shop">
          <span className="btn__dot" aria-hidden="true" />
          Shop the harvest
        </a>
      </div>

      <div className="footer__cols">
        <div className="footer__brand">
          <p className="nav__mark">
            Verda<em>l</em>e
          </p>
          <p>
            A single-estate olive house in Messinia, Greece. One grove, one
            press, one honest bottle — since 1962.
          </p>
        </div>
        <nav className="footer__col" aria-label="Visit">
          <h3>Visit</h3>
          <ul>
            <li>Verdale Estate</li>
            <li>Epar. Od. Kalamatas</li>
            <li>Messinia 240 16, Greece</li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Explore">
          <h3>Explore</h3>
          <ul>
            <li><a href="#grove">The grove</a></li>
            <li><a href="#press">The press</a></li>
            <li><a href="#shop">Shop</a></li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Contact">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:hello@verdale.example">hello@verdale.example</a></li>
            <li><a href="#top">Wholesale enquiries</a></li>
            <li><a href="#top">Instagram</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer__bar">
        <p>© 2026 Verdale Estate. A concept storefront.</p>
        <p><Link href="/v2">View Concept 02 ↗</Link> · Photography: Pexels (free license)</p>
      </div>
    </footer>
  );
}
