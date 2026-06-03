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
  { href: "/shop?cat=Candle%20Making", no: "01", name: "Candle Making", meta: "2 kits", label: "Candle — pour, scent & set" },
  { href: "/shop?cat=Resin%20Art", no: "02", name: "Resin Art", meta: "2 kits", label: "Resin — glassy, jewel-like casts" },
  { href: "/shop?cat=Painting", no: "03", name: "Painting", meta: "2 kits", label: "Painting — loose, expressive canvases" },
  { href: "/shop?cat=Embroidery", no: "04", name: "Embroidery", meta: "2 kits", label: "Embroidery — slow, rhythmic stitching" },
  { href: "/shop?cat=Journaling", no: "05", name: "Journaling", meta: "2 kits", label: "Journaling — slow mornings, considered pages" },
  { href: "/shop?cat=Clay%20Art", no: "06", name: "Clay Art", meta: "2 kits", label: "Clay — shape, dry & glaze" },
  { href: "/shop?cat=Seasonal", no: "07", name: "Seasonal Editions", meta: "Limited", label: "Seasonal — limited editions" },
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
