import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import V2Cursor from "@/components/v2/V2Cursor";
import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Flavor from "@/components/v2/V2Flavor";
import V2Marquee from "@/components/v2/V2Marquee";
import V2Collage from "@/components/v2/V2Collage";
import V2Rail from "@/components/v2/V2Rail";
import V2Footer from "@/components/v2/V2Footer";
import "./v2.css";

export const metadata: Metadata = {
  title: "Verdale — Olio Nuovo (Concept 02)",
  description:
    "The new harvest is loud. Olio nuovo from a single estate in Messinia, Greece — pressed within four hours, bottled unfiltered, gone by spring.",
};

const STATS = [
  { value: "4,200", label: "Trees on the estate" },
  { value: "4 hrs", label: "Branch to press" },
  { value: "0.18%", label: "Free acidity" },
  { value: "1 / yr", label: "Pressings — that's it" },
];

export default function V2Page() {
  return (
    <div className="v2">
      <SmoothScroll />
      <V2Cursor />
      <V2Nav />
      <main>
        <V2Hero />
        <div className="v2-strip">
          {STATS.map((s) => (
            <div className="v2-strip__cell" key={s.label}>
              <p className="v2-strip__value">{s.value}</p>
              <p className="v2-strip__label">{s.label}</p>
            </div>
          ))}
        </div>
        <V2Flavor />
        <V2Marquee />
        <V2Collage />
        <V2Rail />
      </main>
      <V2Footer />
    </div>
  );
}
