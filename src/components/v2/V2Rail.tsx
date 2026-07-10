"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import { V2_PRODUCTS } from "@/lib/catalog";
import { useCart } from "@/lib/CartContext";

const PRODUCTS = V2_PRODUCTS.map((p) => ({
  ...p,
  desc: p.descShort,
  img: IMAGES[p.imgKey],
}));

export default function V2Rail() {
  const ref = useRef<HTMLElement>(null);
  const { addItem } = useCart();

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
              <button
                className="v2-rail__add"
                type="button"
                onClick={() =>
                  addItem({ id: p.id, name: p.name, amount: p.amount, price: p.price })
                }
                aria-label={`Add ${p.name} to cart`}
              >
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
