"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import V2Stamp from "./V2Stamp";

const TRAIL = [
  IMAGES.groveTall,
  IMAGES.harvest,
  IMAGES.pour,
  IMAGES.groveWide,
  IMAGES.productOlives,
  IMAGES.press,
];

export default function V2Hero() {
  const ref = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const last = useRef({ x: 0, y: 0, i: 0 });

  useGSAP(
    (context, contextSafe) => {
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      // intro
      if (!calm) {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".v2-hero__title .line-mask > span", {
            yPercent: 115,
            duration: 1.25,
            stagger: 0.1,
          })
          .from(".v2-hero__eyebrow > *", { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.7 }, 0.4)
          .from(".v2-hero__foot > *", { autoAlpha: 0, y: 24, stagger: 0.1, duration: 0.8 }, 0.75)
          .from(".v2-stamp", { autoAlpha: 0, scale: 0.6, duration: 0.9, ease: "back.out(1.6)" }, 0.9);

        gsap.to(".v2-stamp svg", { rotation: 360, duration: 24, ease: "none", repeat: -1 });
      }

      // cursor-trail photo spawns
      if (!calm && trailRef.current) {
        const spawn = contextSafe!((x: number, y: number) => {
          const el = document.createElement("img");
          el.src = TRAIL[last.current.i % TRAIL.length];
          el.alt = "";
          last.current.i += 1;
          trailRef.current!.appendChild(el);

          const rot = gsap.utils.random(-14, 14);
          gsap.fromTo(
            el,
            { x, y, xPercent: -50, yPercent: -50, scale: 0.35, rotation: rot * 1.6, autoAlpha: 0 },
            { scale: 1, rotation: rot, autoAlpha: 1, duration: 0.5, ease: "power3.out" }
          );
          gsap.to(el, {
            autoAlpha: 0,
            scale: 0.9,
            y: y + 40,
            delay: 0.55,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => el.remove(),
          });
        });

        if (fine) {
          const onMove = contextSafe!((e: MouseEvent) => {
            const r = ref.current!.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const dx = x - last.current.x;
            const dy = y - last.current.y;
            if (dx * dx + dy * dy > 130 * 130) {
              last.current.x = x;
              last.current.y = y;
              spawn(x, y);
            }
          });
          ref.current!.addEventListener("mousemove", onMove);
        } else {
          // touch: a tap drops a photo where you tap
          const onTap = contextSafe!((e: PointerEvent) => {
            if ((e.target as HTMLElement).closest("a, button")) return;
            const r = ref.current!.getBoundingClientRect();
            spawn(e.clientX - r.left, e.clientY - r.top);
          });
          ref.current!.addEventListener("pointerdown", onTap);
        }
      }

      // magnetic CTA
      if (!calm && fine && ctaRef.current) {
        const btn = ctaRef.current;
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
        const onMove = contextSafe!((e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        });
        const onLeave = contextSafe!(() => {
          xTo(0);
          yTo(0);
        });
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
      }
    },
    { scope: ref }
  );

  return (
    <section className="v2-hero" id="v2-top" ref={ref}>
      <div className="v2-hero__trail" ref={trailRef} aria-hidden="true" />

      <div className="v2-stamp">
        <V2Stamp />
      </div>

      <div className="v2-hero__eyebrow">
        <span className="v2-kicker">Verdale · Concept 02</span>
        <span className="v2-kicker" style={{ color: "var(--v2-ink-soft)" }}>
          Single-estate · Messinia, Greece
        </span>
      </div>

      <h1 className="v2-hero__title">
        <span className="line-mask"><span>The new</span></span>
        <span className="line-mask">
          <span>
            <span
              className="v2-hero__clip"
              style={{ backgroundImage: `url(${IMAGES.groveWide})` }}
            >
              harvest
            </span>
          </span>
        </span>
        <span className="line-mask"><span>is <em>loud.</em></span></span>
      </h1>

      <div className="v2-hero__foot">
        <p>
          <strong>Olio nuovo</strong> — oil so fresh it still argues with you.
          Pressed on the estate within four hours of the branch, bottled
          unfiltered, gone by spring.
        </p>
        <div className="v2-hero__cta">
          <a className="v2-btn v2-btn--plum" href="#rail" ref={ctaRef}>
            Get this year&apos;s pressing
          </a>
          <span className="v2-hero__hint">Move your cursor — shake the tree</span>
        </div>
      </div>
    </section>
  );
}
