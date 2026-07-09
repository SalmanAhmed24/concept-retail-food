"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function V2Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm || !ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 0.35, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const hot = (e.target as HTMLElement).closest("a, button");
      gsap.to(ref.current, { scale: hot ? 2.4 : 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return <div className="v2-cursor" ref={ref} aria-hidden="true" />;
}
