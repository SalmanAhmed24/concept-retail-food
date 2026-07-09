"use client";

export default function V2Stamp({ spinClass }: { spinClass?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={spinClass} aria-hidden="true">
      <defs>
        <path id="v2-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <text>
        <textPath href="#v2-circle">
          Olio Nuovo · Harvest 2025 · Messinia ·&#160;
        </textPath>
      </text>
      <circle cx="50" cy="50" r="5" />
    </svg>
  );
}
