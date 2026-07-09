"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const PRODUCTS = [
  {
    tag: "Harvest Oct 2025",
    name: "First Press",
    desc: "Koroneiki extra virgin, unfiltered. Green, peppery, loud. 500 ml.",
    price: "$38",
    img: IMAGES.productOil,
    alt: "Bottle of Verdale extra virgin olive oil with olives and branches",
  },
  {
    tag: "Brined 9 months",
    name: "Table Olives",
    desc: "Kalamata olives cured in sea-salt brine and a little red-wine vinegar. 320 g.",
    price: "$14",
    img: IMAGES.productOlives,
    alt: "Bowls of Kalamata and green table olives",
  },
  {
    tag: "The gift",
    name: "The Harvest Table",
    desc: "First Press, Table Olives and our fig-and-olive tapenade, boxed for giving.",
    price: "$64",
    img: IMAGES.productSet,
    alt: "A spread of olives, oil, cheese and bread on a table",
  },
];

export default function Products() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".shop__card", {
        autoAlpha: 0,
        y: 46,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".shop__grid", start: "top 82%" },
      });
    },
    { scope: ref }
  );

  return (
    <section className="shop" id="shop" ref={ref}>
      <div className="shop__head">
        <h2>
          The <em>shop</em>
        </h2>
        <p className="shop__note">
          All harvest 2025 · pressed on the estate
          <br />
          Ships worldwide, weekly
        </p>
      </div>

      <div className="shop__grid">
        {PRODUCTS.map((p) => (
          <article className="shop__card" key={p.name}>
            <div className="shop__frame">
              <Image
                src={p.img}
                alt={p.alt}
                fill
                sizes="(max-width: 900px) 100vw, 32vw"
              />
              <span className="shop__tag">{p.tag}</span>
            </div>
            <div className="shop__row">
              <h3 className="shop__name">{p.name}</h3>
              <p className="shop__price">{p.price}</p>
            </div>
            <p className="shop__desc">{p.desc}</p>
            <button className="shop__add" type="button">
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
