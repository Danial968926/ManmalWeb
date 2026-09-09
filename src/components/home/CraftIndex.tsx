"use client";

import { useState } from "react";
import Link from "next/link";

interface Row {
  href: string;
  no: string;
  name: string;
  meta: string;
  label: string;
}

const ROWS: Row[] = [
  { href: "/shop?cat=Diamond%20Painting", no: "01", name: "Diamond Painting", meta: "2 kits", label: "Diamond Painting — place, sparkle, reveal" },
  { href: "/shop?cat=Rhinestone%20Art", no: "02", name: "Rhinestone Art", meta: "2 kits", label: "Rhinestone Art — faceted, light-catching pieces" },
  { href: "/shop?cat=Bedazzle%20Tumblers", no: "03", name: "Bedazzle Tumblers", meta: "2 kits", label: "Tumblers — full-coat crystal drinkware" },
  { href: "/shop?cat=Gem%20Phone%20Cases", no: "04", name: "Gem Phone Cases", meta: "2 kits", label: "Phone Cases — custom gem layouts" },
  { href: "/shop?cat=Bedazzle%20Apparel", no: "05", name: "Bedazzle Apparel", meta: "1 kit", label: "Apparel — studs, pearls & crystals" },
  { href: "/shop?cat=Crystal%20Keychains", no: "06", name: "Crystal Keychains", meta: "2 kits", label: "Keychains — quick, gift-ready sparkle" },
  { href: "/shop?cat=Seasonal", no: "07", name: "Seasonal Editions", meta: "Limited", label: "Seasonal — limited bling editions" },
];

export default function CraftIndex() {
  const [active, setActive] = useState(0);

  return (
    <div className="index-grid">
      <div className="index-list reveal">
        {ROWS.map((r, idx) => (
          <Link
            key={r.no}
            className={"index-row" + (idx === active ? " is-active" : "")}
            href={r.href}
            data-label={r.label}
            onMouseEnter={() => setActive(idx)}
          >
            <span className="ix-no">{r.no}</span>
            <span className="ix-name">{r.name}</span>
            <span className="ix-meta">{r.meta}</span>
            <span className="ix-go">→</span>
          </Link>
        ))}
      </div>
      <div className="index-preview reveal">
        <div className="ph">
          <span id="ixLabel">{ROWS[active].label}</span>
        </div>
      </div>
    </div>
  );
}
