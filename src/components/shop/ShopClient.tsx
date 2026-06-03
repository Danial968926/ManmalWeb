"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

const SUBTITLES: Record<string, string> = {
  All: "Everything you need to make, in one box. Choose a craft below.",
  "Candle Making": "Pour, scent and set your own candles — calm, fragrant, satisfying.",
  "Resin Art": "Cast trays, coasters and keepsakes with glassy, jewel-like finishes.",
  Painting: "Loose, expressive canvases — colour chosen to calm, not to fuss.",
  Embroidery: "Slow, rhythmic stitching on natural linen and cotton.",
  Journaling: "Tools and rituals for slow mornings and considered pages.",
  "Clay Art": "Shape, dry and glaze little objects to keep or gift.",
  Seasonal: "Limited editions, made for the time of year.",
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
