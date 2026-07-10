"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCart } from "@/lib/CartContext";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const { count, openCart } = useCart();

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
    <header className="nav" ref={ref}>
      <a href="#top" className="nav__mark" aria-label="Verdale — home">
        Verda<em>l</em>e
      </a>
      <nav aria-label="Primary">
        <ul className="nav__links">
          <li><a href="#grove">The grove</a></li>
          <li><a href="#press">The press</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#visit">Visit</a></li>
        </ul>
      </nav>
      <button
        className="nav__cart"
        type="button"
        onClick={openCart}
        aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      >
        Cart <span aria-hidden="true">·</span> {count}
      </button>
    </header>
  );
}
