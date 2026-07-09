# Verdale — Single-Estate Olive House

An award-style landing page concept for a specialty olive retailer, built with
**Next.js (App Router) + GSAP ScrollTrigger + Lenis** smooth scrolling and real
photography served from the Pexels CDN (free license).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## What's inside

| Section | File | Motion |
|---|---|---|
| Hero | `src/components/Hero.tsx` | Masked line reveal, slow image settle, scroll parallax |
| Ticker | `src/components/Ticker.tsx` | Infinite GSAP marquee |
| The grove | `src/components/Grove.tsx` | Sticky copy, image parallax, stat count-ups |
| The press (signature) | `src/components/Press.tsx` | Pinned scroll narrative — a gold "oil line" pours down the viewport while three phases (pick → mill → pour) crossfade. Falls back to stacked cards under 900px. |
| Shop | `src/components/Products.tsx` | Staggered reveals, hover zoom |
| Quote | `src/components/Quote.tsx` | Word-by-word scrub fill |
| Footer | `src/components/Footer.tsx` | CTA reveal |

- Smooth scroll: `src/components/SmoothScroll.tsx` (Lenis driven by GSAP's ticker)
- Design tokens & all styles: `src/app/globals.css`
- Image manifest: `src/lib/images.ts` — swap these URLs for your own estate photography

## Design system

- **Palette** — brine `#14180F`, plaster `#E8E7DC`, pressed-gold oil `#C69A2E`/`#E8C25F`, leaf `#6B7448`, sage `#A7AC8F`
- **Type** — Boska (display serif) + Satoshi (body), via Fontshare
- **Accessibility** — `prefers-reduced-motion` disables Lenis, the pin, and all
  tweens (content renders fully visible); visible focus rings; sr-only text for
  the marquee; the mobile card fallback doubles as the linear reading order.

Photography via Pexels (free to use, no attribution required). Replace before
shipping a real store.

---

## Concept 02 — "Olio Nuovo" (`/v2`)

A second art direction on the same brand: a loud, light poster instead of the
dark editorial. Pale olive-leaf canvas, **Kalamata-plum** accent (the color of
the fruit's skin), Clash Display headlines with Boska italic accents.

Interactive elements:

- **Cursor-trail hero** — moving the mouse (or tapping, on touch) shakes loose
  photographs from the grove; the word *harvest* is photo-filled via
  `background-clip: text`; a harvest stamp rotates continuously; the CTA is
  magnetic.
- **The tasting** — a tab interface for three flavor notes; each click
  crossfades the photograph and animates fruitiness/bitterness/pepper meters.
- **Direction-aware marquee** — the "Olio Nuovo" outline-type strip reverses
  with your scroll direction.
- **Collage story** — frames drift at independent parallax speeds.
- **Horizontal shop rail** — pinned, scroll-driven sideways shelf on desktop;
  native swipe with scroll-snap on mobile.

Both concepts respect `prefers-reduced-motion` and are cross-linked in their
footers (and the V2 nav).
