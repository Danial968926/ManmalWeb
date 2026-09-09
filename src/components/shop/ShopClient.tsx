"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

const SUBTITLES: Record<string, string> = {
  All: "Everything you need to bedazzle, in one box. Choose a style below.",
  "Diamond Painting": "Place thousands of shimmering drills to reveal a glowing canvas.",
  "Rhinestone Art": "Faceted rhinestone pieces that catch the light from every angle.",
  "Bedazzle Tumblers": "Full-coat crystal drinkware — head-turning, café-ready sparkle.",
  "Gem Phone Cases": "Custom gem and pearl layouts for a case that feels made for you.",
  "Bedazzle Apparel": "Studs, pearls and crystals to turn denim into a statement piece.",
  "Crystal Keychains": "Quick, gift-ready sparkle you can finish in an evening.",
  Seasonal: "Limited bling editions, made for the time of year.",
};

export default function ShopClient({ initialCat }: { initialCat: string }) {
  const router = useRouter();
  const [active, setActive] = useState(initialCat);

  function apply(cat: string) {
    setActive(cat);
    const url = cat === "All" ? "/shop" : "/shop?cat=" + encodeURIComponent(cat);
    router.replace(url, { scroll: false });
  }

  const list = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);

  return (
    <>
      {/* shop header */}
      <section className="shop-hero" id="categories">
        <div className="wrap center">
          <span className="eyebrow reveal">The collection</span>
          <h1 className="h1 reveal" id="shopTitle">
            {active === "All" ? "All Kits" : active}
          </h1>
          <p
            className="lede muted reveal"
            id="shopSub"
            style={{ maxWidth: "48ch", margin: "16px auto 0" }}
          >
            {SUBTITLES[active] || SUBTITLES.All}
          </p>
        </div>
      </section>

      {/* filter bar */}
      <div className="filter-bar">
        <div className="wrap">
          <div className="filters" id="filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={"filter" + (c === active ? " on" : "")}
                onClick={() => apply(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* product grid */}
      <section className="section" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
        <div className="wrap">
          <p className="result-count muted" id="resultCount">
            {list.length + (list.length === 1 ? " kit" : " kits")}
          </p>
          <div className="grid-4" id="grid">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
