/* ============================================================
   THE MANMAL CLUB — bedazzling kit catalogue
   Prices in PKR. Swap to the .NET API later by replacing this file.
   ============================================================ */
import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "aurora-diamond-painting", cat: "Diamond Painting", name: "Aurora Diamond Painting Kit",
    price: 3200, was: null, tag: "Bestseller",
    blurb: "Place thousands of shimmering resin diamonds onto a pre-printed canvas to reveal a glowing aurora sky.",
    makes: "Makes 1 canvas (40×50cm)", time: "4–6 hrs", level: "Beginner",
    includes: ["40×50cm pre-printed sticky canvas", "Resin diamond drills (full set)", "Diamond applicator pen", "Wax & tray", "Tweezers & sorting trays", "Illustrated guide"],
    img: "/products/aurora-diamond-painting.jpg",
  },
  {
    id: "floral-diamond-painting", cat: "Diamond Painting", name: "Floral Bloom Diamond Painting",
    price: 2900, was: null, tag: null,
    blurb: "A soft floral study in round drills — calming, repetitive, and endlessly satisfying to finish.",
    makes: "Makes 1 canvas (30×40cm)", time: "3–5 hrs", level: "Beginner",
    includes: ["30×40cm pre-printed sticky canvas", "Round resin drills (full set)", "Applicator pen & wax", "Sorting tray", "Spare drills", "Step-by-step guide"],
    img: "/products/floral-diamond-painting.jpg",
  },
  {
    id: "galaxy-rhinestone-art", cat: "Rhinestone Art", name: "Galaxy Rhinestone Wall Art",
    price: 3600, was: 4200, tag: "New",
    blurb: "Set faceted rhinestones into a deep-space scene that catches the light from every angle.",
    makes: "Makes 1 framed piece", time: "3–4 hrs", level: "Improver",
    includes: ["Pre-printed adhesive board", "Faceted rhinestones (5 sizes)", "Precision applicator", "Gem tray & tweezers", "Wooden frame", "Placement guide"],
    img: "/products/galaxy-rhinestone-art.jpg",
  },
  {
    id: "mandala-rhinestone-art", cat: "Rhinestone Art", name: "Mandala Rhinestone Art Kit",
    price: 3400, was: null, tag: null,
    blurb: "Build a symmetrical mandala in graduated crystals — meditative, mesmerising, made to hang.",
    makes: "Makes 1 framed piece", time: "3–4 hrs", level: "Beginner",
    includes: ["Pre-printed adhesive board", "Crystal rhinestones (4 colours)", "Applicator pen & wax", "Tweezers & tray", "Hanging hook", "Mandala guide"],
    img: "/products/mandala-rhinestone-art.jpg",
  },
  {
    id: "crystal-tumbler", cat: "Bedazzle Tumblers", name: "Crystal Bling Tumbler Kit",
    price: 4200, was: null, tag: "Bestseller",
    blurb: "Wrap a stainless tumbler in a full coat of crystals for a head-turning, café-ready sparkle.",
    makes: "Makes 1 tumbler (600ml)", time: "2–3 hrs", level: "Improver",
    includes: ["600ml insulated tumbler", "Crystal rhinestones (bulk)", "Strong craft adhesive", "Applicator & turntable", "Sealant finish", "Wrap guide"],
    img: "/products/crystal-tumbler.jpg",
  },
  {
    id: "ombre-tumbler", cat: "Bedazzle Tumblers", name: "Ombré Sparkle Tumbler Kit",
    price: 4500, was: null, tag: null,
    blurb: "Fade two crystal tones across a tumbler for a smooth ombré that shifts as it turns.",
    makes: "Makes 1 tumbler (600ml)", time: "2–3 hrs", level: "Improver",
    includes: ["600ml insulated tumbler", "Two-tone rhinestones", "Craft adhesive & sealant", "Applicator & turntable", "Spacing guide", "Illustrated guide"],
    img: "/products/ombre-tumbler.jpg",
  },
  {
    id: "gem-phone-case", cat: "Gem Phone Cases", name: "Gemstone Phone Case Kit",
    price: 2600, was: null, tag: null,
    blurb: "Bedazzle a clear phone case with a custom gem layout — yours in an evening.",
    makes: "Makes 1 case", time: "1–2 hrs", level: "Beginner",
    includes: ["Clear protective case (specify model)", "Assorted gems & rhinestones", "Precision adhesive", "Applicator & tweezers", "Layout stencils", "Quick guide"],
    img: "/products/gem-phone-case.jpg",
  },
  {
    id: "pearl-phone-case", cat: "Gem Phone Cases", name: "Pearl & Crystal Phone Case Kit",
    price: 2800, was: null, tag: "New",
    blurb: "Half-pearls and clear crystals for a soft, elegant case that feels custom-made.",
    makes: "Makes 1 case", time: "1–2 hrs", level: "Beginner",
    includes: ["Clear protective case (specify model)", "Flat-back half pearls", "Clear crystals", "Precision adhesive", "Applicator & tweezers", "Design guide"],
    img: "/products/pearl-phone-case.jpg",
  },
  {
    id: "denim-bedazzle-jacket", cat: "Bedazzle Apparel", name: "Bedazzled Denim Jacket Kit",
    price: 5800, was: 6500, tag: "Limited",
    blurb: "Transform a denim jacket with studs, pearls and crystals into a one-of-a-kind statement piece.",
    makes: "Makes 1 jacket (bring your own)", time: "4–6 hrs", level: "Improver",
    includes: ["Hot-fix & flat-back crystals", "Pearls & studs mix", "Fabric adhesive", "Applicator wand", "Design transfer sheet", "Apparel guide"],
    img: "/products/denim-bedazzle-jacket.jpg",
  },
  {
    id: "crystal-keychain-set", cat: "Crystal Keychains", name: "Crystal Initial Keychain Set",
    price: 1900, was: null, tag: null,
    blurb: "Bedazzle your initials into sparkling keychains — a quick win and a perfect little gift.",
    makes: "Makes 3 keychains", time: "45–60 min", level: "Beginner",
    includes: ["3 acrylic letter blanks", "Crystal rhinestones (assorted)", "Strong adhesive", "Applicator & tweezers", "3 keyrings & chains", "Quick guide"],
    img: "/products/crystal-keychain-set.jpg",
  },
  {
    id: "heart-keychain-set", cat: "Crystal Keychains", name: "Heart Charm Bedazzle Keychains",
    price: 2100, was: null, tag: null,
    blurb: "Cover heart charms in graduated crystals for keychains that catch the light all day.",
    makes: "Makes 3 keychains", time: "45–60 min", level: "Beginner",
    includes: ["3 heart charm blanks", "Graduated crystals", "Craft adhesive", "Applicator & tweezers", "3 keyrings & chains", "Illustrated guide"],
    img: "/products/heart-keychain-set.jpg",
  },
  {
    id: "festive-bling-box", cat: "Seasonal", name: "Festive Bling Gift Box",
    price: 4800, was: 5600, tag: "Limited",
    blurb: "A seasonal edition box — bedazzle a tumbler, a keychain and an ornament in one sparkling set.",
    makes: "Makes 3 pieces", time: "3–4 hrs", level: "Beginner",
    includes: ["Mini tumbler & keychain blank", "Ornament blank", "Crystals & pearls mix", "Adhesive & applicator", "Gift ribbon & tags", "Illustrated guide"],
    img: "/products/festive-bling-box.jpg",
  },
];

export const CATEGORIES = [
  "All",
  "Diamond Painting",
  "Rhinestone Art",
  "Bedazzle Tumblers",
  "Gem Phone Cases",
  "Bedazzle Apparel",
  "Crystal Keychains",
  "Seasonal",
] as const;

export function rs(n: number): string {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}

export function byId(id: string | undefined | null): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
