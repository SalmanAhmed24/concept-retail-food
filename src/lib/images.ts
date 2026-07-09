/**
 * Real photography, served from the Pexels CDN (free Pexels license).
 * Swap for your own estate photography before shipping to production.
 */
const px = (id: number, w = 1800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero: px(33168420, 2400), // sunlit path through the grove
  groveTall: px(5781229),   // ripe olives on the branch
  groveWide: px(34803738),  // the grove under open sky
  harvest: px(31694878),    // hands full of just-picked olives
  press: px(29878981),      // fruit in the crate, headed to the mill
  pour: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=1800", // oil, poured
  productOil: px(16486887, 1200),
  productOlives: px(34711354, 1200),
  productSet: px(34214071, 1200),
} as const;
