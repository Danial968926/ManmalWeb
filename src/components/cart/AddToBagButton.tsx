"use client";

import { useCart } from "./CartProvider";

interface Props {
  id: string;
  qty?: number;
  className?: string;
  /** Render as <span> when nested inside an <a> (invalid to nest <button>). */
  as?: "button" | "span";
  children: React.ReactNode;
}

export default function AddToBagButton({
  id,
  qty = 1,
  className,
  as = "button",
  children,
}: Props) {
  const { add } = useCart();

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(id, qty);
  };

  if (as === "span") {
    return (
      <span role="button" tabIndex={0} className={className} onClick={handle}>
        {children}
      </span>
    );
  }
  return (
    <button type="button" className={className} onClick={handle}>
      {children}
    </button>
  );
}
