/* ============================================================
   THE MANMAL CLUB — product catalogue
   Prices in PKR. Swap to the .NET API later by replacing this file.
   ============================================================ */
import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "amber-soy-candle", cat: "Candle Making", name: "Amber & Oud Candle Kit",
    price: 3800, was: null, tag: "Bestseller",
    blurb: "Pour two amber-glass vessels of slow-burning soy wax, scented with oud and warm amber.",
    makes: "Makes 2 candles", time: "60–90 min", level: "Beginner",
    includes: ["480g natural soy wax", "Oud & amber fragrance oil", "2 amber glass jars", "Cotton wicks & centering tool", "Wooden stirrer & pouring jug", "Illustrated guide"],
  },
  {
    id: "coastal-resin-tray", cat: "Resin Art", name: "Coastal Resin Tray Kit",
    price: 5200, was: 6000, tag: "New",
    blurb: "Cast a translucent serving tray with drifting blues, gold leaf and a smooth mirror finish.",
    makes: "Makes 1 tray", time: "2–3 hrs + cure", level: "Improver",
    includes: ["300ml clear epoxy resin", "Ocean pigment set (4)", "Gold leaf flakes", "Silicone tray mould", "Gloves, sticks & cups", "Step-by-step guide"],
  },
  {
    id: "abstract-canvas", cat: "Painting", name: "Abstract Canvas Painting Kit",
    price: 4200, was: null, tag: null,
    blurb: "A loose, expressive acrylic study on canvas — colours chosen to calm, not to fuss.",
    makes: "Makes 1 canvas", time: "1–2 hrs", level: "Beginner",
    includes: ["40×50cm stretched canvas", "6 artist acrylics", "Brush set (3)", "Palette knife & tray", "Easel stand", "Composition guide"],
  },
  {
    id: "linen-hoop-embroidery", cat: "Embroidery", name: "Botanical Hoop Embroidery Kit",
    price: 2900, was: null, tag: null,
    blurb: "Stitch a wildflower study on natural linen, finished in a wooden hoop ready to hang.",
    makes: "Makes 1 hoop", time: "3–4 hrs", level: "Beginner",
    includes: ["Pre-printed linen panel", "Cotton threads (8 shades)", "20cm wooden hoop", "Needles & threader", "Embroidery scissors", "Stitch dictionary"],
  },
  {
    id: "daily-journal-set", cat: "Journaling", name: "Slow Mornings Journal Set",
    price: 3400, was: null, tag: "Bestseller",
    blurb: "A guided journal, washi, stamps and pressed botanicals for an unhurried daily ritual.",
    makes: "Complete set", time: "Ongoing", level: "All levels",
    includes: ["180-page guided journal", "Washi tape (4 rolls)", "Brass stamp & ink", "Pressed flower pack", "Fineliner & pen", "Prompt cards (30)"],
  },
  {
    id: "stoneware-trinket", cat: "Clay Art", name: "Stoneware Trinket Dish Kit",
    price: 3100, was: null, tag: null,
    blurb: "Hand-shape and air-dry a set of pinch dishes, then paint them in soft earthen glazes.",
    makes: "Makes 3 dishes", time: "1 hr + dry", level: "Beginner",
    includes: ["500g air-dry clay", "Earthen paint set (5)", "Modelling tools (4)", "Texture roller", "Sealant & brush", "Shaping guide"],
  },
  {
    id: "festive-candle-trio", cat: "Seasonal", name: "Festive Candle Trio",
    price: 4800, was: 5600, tag: "Limited",
    blurb: "A seasonal edition of three travel candles — cardamom chai, fig, and winter rose.",
    makes: "Makes 3 candles", time: "60 min", level: "Beginner",
    includes: ["3 seasonal fragrance oils", "360g soy wax", "3 ceramic tins", "Wicks & accessories", "Gift ribbon & tags", "Illustrated guide"],
  },
  {
    id: "terrazzo-coasters", cat: "Resin Art", name: "Terrazzo Coaster Kit",
    price: 3600, was: null, tag: null,
    blurb: "Set four speckled terrazzo coasters in muted clay tones with a soft matte seal.",
    makes: "Makes 4 coasters", time: "2 hrs + cure", level: "Beginner",
    includes: ["Resin & hardener", "Terrazzo chip mix", "4 round moulds", "Pigments (3)", "Matte finishing wax", "Guide booklet"],
  },
  {
    id: "calligraphy-starter", cat: "Journaling", name: "Modern Calligraphy Starter",
    price: 2600, was: null, tag: "New",
    blurb: "Learn the basics of pointed-pen lettering with drills, guides and practice paper.",
    makes: "Complete set", time: "Ongoing", level: "Beginner",
    includes: ["Oblique pen holder", "Nibs (3)", "Ink pot", "Practice pad (50 sheets)", "Drill & alphabet guides", "Storage pouch"],
  },
  {
    id: "wildflower-canvas-duo", cat: "Painting", name: "Wildflower Canvas Duo",
    price: 5400, was: null, tag: null,
    blurb: "Two coordinating floral mini-canvases — a quiet diptych for a shelf or desk.",
    makes: "Makes 2 canvases", time: "2 hrs", level: "Improver",
    includes: ["2 × 25cm canvases", "8 artist acrylics", "Detail brush set (4)", "Sketch transfer sheet", "Mini easels (2)", "Painting guide"],
  },
  {
    id: "macrame-wall-hanging", cat: "Embroidery", name: "Macramé Wall Hanging Kit",
    price: 3900, was: null, tag: null,
    blurb: "Knot a textural cotton wall hanging on a wooden dowel — meditative, rhythmic work.",
    makes: "Makes 1 hanging", time: "3 hrs", level: "Improver",
    includes: ["Natural cotton cord", "Wooden dowel", "Wall hook", "Comb & scissors", "Measuring guide", "Knot tutorial"],
  },
  {
    id: "keepsake-clay-set", cat: "Clay Art", name: "Keepsake Imprint Clay Set",
    price: 2800, was: null, tag: null,
    blurb: "Capture a hand or paw print in air-dry clay and frame it — a sentimental afternoon.",
    makes: "Makes 2 keepsakes", time: "45 min + dry", level: "Beginner",
    includes: ["600g air-dry clay", "2 wooden frames", "Rolling guide", "Letter stamp set", "Ribbon & sealant", "Instruction card"],
  },
];

export const CATEGORIES = [
  "All", "Candle Making", "Resin Art", "Painting", "Embroidery", "Journaling", "Clay Art", "Seasonal",
] as const;

export function rs(n: number): string {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}

export function byId(id: string | undefined | null): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
