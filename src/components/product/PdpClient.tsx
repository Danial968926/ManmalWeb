"use client";

import { useState } from "react";
import { rs } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

export default function PdpClient({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  return (
    <div className="pdp-buy">
      <div className="qty pdp-qty">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
          &minus;
        </button>
        <span id="pdpQty">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
          +
        </button>
      </div>
      <button
        className="btn btn-primary pdp-add"
        id="pdpAdd"
        onClick={() => add(p.id, qty)}
      >
        Add to bag — {rs(p.price)}
      </button>
    </div>
  );
}
