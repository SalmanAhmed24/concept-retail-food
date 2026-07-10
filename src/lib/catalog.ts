/**
 * Verdale catalog — plain data, safe to import from client components
 * and server route handlers alike. Prices live here ONLY: the checkout
 * API resolves every cart item against this file, so the client can
 * never invent its own prices.
 *
 * Note: "The Press Club" is presented as a quarterly subscription on
 * the /v2 rail; at checkout it is charged as a one-time payment for
 * the first quarter. Recurring billing would need a Stripe recurring
 * price + webhook handling — out of scope for this pass.
 */

export type CatalogItem = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  descShort: string;
  amount: number; // USD
  price: string; // display string
  imgKey: "productOil" | "productOlives" | "productSet" | "pour";
  alt: string;
};

export const PRODUCTS: CatalogItem[] = [
  {
    id: "first-press",
    name: "First Press",
    tag: "Harvest Oct 2025",
    desc: "Koroneiki extra virgin, unfiltered. Green, peppery, loud. 500 ml.",
    descShort: "Koroneiki extra virgin, unfiltered. The loud one.",
    amount: 38,
    price: "$38",
    imgKey: "productOil",
    alt: "Bottle of Verdale extra virgin olive oil with olives and branches",
  },
  {
    id: "table-olives",
    name: "Table Olives",
    tag: "Brined 9 months",
    desc: "Kalamata olives cured in sea-salt brine and a little red-wine vinegar. 320 g.",
    descShort: "Kalamata in sea-salt brine and red-wine vinegar. 320 g.",
    amount: 14,
    price: "$14",
    imgKey: "productOlives",
    alt: "Bowls of Kalamata and green table olives",
  },
  {
    id: "harvest-table",
    name: "The Harvest Table",
    tag: "The gift",
    desc: "First Press, Table Olives and our fig-and-olive tapenade, boxed for giving.",
    descShort: "Oil, olives and fig-and-olive tapenade, boxed for giving.",
    amount: 64,
    price: "$64",
    imgKey: "productSet",
    alt: "A spread of olives, oil, cheese and bread on a table",
  },
  {
    id: "press-club",
    name: "The Press Club",
    tag: "Subscription",
    desc: "A fresh 500 ml bottle every quarter, first press first. Billed per quarter.",
    descShort: "A fresh 500 ml bottle every quarter, first press first.",
    amount: 34,
    price: "$34/qtr",
    imgKey: "pour",
    alt: "Golden olive oil being poured",
  },
];

/** The original landing page shows the first three; /v2 shows all four. */
export const V1_PRODUCTS = PRODUCTS.slice(0, 3);
export const V2_PRODUCTS = PRODUCTS;

export const findItem = (id: string): CatalogItem | undefined =>
  PRODUCTS.find((p) => p.id === id);
