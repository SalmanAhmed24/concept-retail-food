"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const PRODUCTS = [
  {
    tag: "Harvest Oct 2025",
    name: "First Press 500ml",
    desc: "Koroneiki extra virgin, unfiltered. The loud one.",
    price: "$38",
    img: IMAGES.productOil,
    alt: "Bottle of Verdale extra virgin olive oil",
  },
  {
    tag: "Brined 9 months",
    name: "Table Olives",
    desc: "Kalamata in sea-salt brine and red-wine vinegar. 320 g.",
    price: "$14",
    img: IMAGES.productOlives,
    alt: "Bowls of Kalamata and green table olives",
  },
  {
    tag: "The gift",
    name: "Harvest Table",
    desc: "Oil, olives and fig-and-olive tapenade, boxed for giving.",
    price: "$64",
    img: IMAGES.productSet,
    alt: "A spread of olives, oil, cheese and bread",
  },
  {
    tag: "Subscription",
    name: "The Press Club",
    desc: "A fresh 500 ml bottle every quarter, first press first.",
    price: "$34/qtr",
    img: IMAGES.pour,
    alt: "Golden olive oil being poured",
  },
];

export default function V2Rail() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current!.querySelector<HTMLElement>(".v2-rail__track")!;
        const viewport = ref.current!.querySelector<HTMLElement>(".v2-rail__viewport")!;
        const distance = () => track.scrollWidth - viewport.clientWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section className="v2-rail" id="rail" ref={ref}>
      <div className="v2-rail__head">
        <h2>
          Shop the <em>pressing</em>
        </h2>
        <p className="v2-rail__hint">
          Scroll — the shelf slides
          <br />
          Ships worldwide, weekly
        </p>
      </div>

      <div className="v2-rail__viewport">
        <div className="v2-rail__track">
          {PRODUCTS.map((p) => (
            <article className="v2-rail__card" key={p.name}>
              <div className="v2-rail__frame">
                <Image src={p.img} alt={p.alt} fill sizes="(max-width: 900px) 78vw, 28vw" />
                <span className="v2-rail__tag">{p.tag}</span>
              </div>
              <div className="v2-rail__row">
                <h3 className="v2-rail__name">{p.name}</h3>
                <p className="v2-rail__price">{p.price}</p>
              </div>
              <p className="v2-rail__desc">{p.desc}</p>
              <button className="v2-rail__add" type="button">
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
