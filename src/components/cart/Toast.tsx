"use client";

import { useCart } from "./CartProvider";

export default function Toast() {
  const { toastMsg } = useCart();
  return (
    <div className={"toast" + (toastMsg ? " show" : "")} id="toast">
      <span className="dot" />
      <span id="toastMsg">{toastMsg}</span>
    </div>
  );
}
