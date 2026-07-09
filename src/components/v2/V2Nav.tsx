"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export default function V2Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(ref.current, {
        scrollTrigger: {
          start: "80 top",
          toggleClass: { targets: ref.current, className: "is-scrolled" },
        },
      });
    },
    { scope: ref }
  );

  return (
    <header className="v2-nav" ref={ref}>
      <a href="#v2-top" className="v2-nav__mark" aria-label="Verdale — Olio Nuovo, home">
        Verdale<span>*</span>
      </a>
      <nav aria-label="Primary">
        <ul className="v2-nav__links">
          <li><a href="#flavor">Flavor</a></li>
          <li><a href="#story">The grove</a></li>
          <li><a href="#rail">Shop</a></li>
        </ul>
      </nav>
      <div className="v2-nav__side">
        <Link className="v2-nav__alt" href="/">Concept 01 ↗</Link>
        <button className="v2-nav__cart" type="button">Cart · 0</button>
      </div>
    </header>
  );
}
