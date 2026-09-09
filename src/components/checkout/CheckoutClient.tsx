"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { byId, rs } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";
import type { PaymentMethod } from "@/lib/types";

const FREE_SHIPPING_THRESHOLD = 5000;
const FLAT_SHIPPING_FEE = 250;

function genOrderId(): string {
  return "MC-" + Math.floor(10000 + Math.random() * 90000);
}

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, subtotal, clear } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <span className="script">Your bag is empty</span>
        <p className="muted">Add a kit before heading to checkout.</p>
        <Link href="/shop" className="btn btn-primary">
          Shop kits
        </Link>
      </div>
    );
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const orderId = genOrderId();
    clear();
    router.push(`/order/confirmed?order=${orderId}`);
  }

  return (
    <div className="checkout-grid">
      <form className="contact-form" noValidate onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="coName">Full name</label>
          <input id="coName" name="name" type="text" required placeholder="Your name" />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="coEmail">Email</label>
            <input id="coEmail" name="email" type="email" required placeholder="you@email.com" />
          </div>
          <div className="field">
            <label htmlFor="coPhone">Phone</label>
            <input id="coPhone" name="phone" type="tel" required placeholder="03XX XXXXXXX" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="coAddress">Delivery address</label>
          <input id="coAddress" name="address" type="text" required placeholder="House, street, area" />
        </div>
        <div className="field">
          <label htmlFor="coCity">City</label>
          <input id="coCity" name="city" type="text" required placeholder="Karachi" />
        </div>

        <div className="field">
          <label>Payment method</label>
          <div className="pay-methods">
            <label className="pay-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className="pay-option-body">
                <strong>Cash on Delivery</strong>
                <p>Pay in cash when your order arrives.</p>
              </span>
            </label>
            <label className="pay-option">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={paymentMethod === "bank_transfer"}
                onChange={() => setPaymentMethod("bank_transfer")}
              />
              <span className="pay-option-body">
                <strong>Bank Transfer</strong>
                <p>Transfer the total, then we&apos;ll confirm and dispatch your order.</p>
                {paymentMethod === "bank_transfer" && (
                  <div className="pay-bank-details">
                    Meezan Bank
                    <br />
                    Account title: The Manmal Club
                    <br />
                    Account no: 0123 4567 8901
                    <br />
                    IBAN: PK00 MEZN 0000 0001 2345 678
                  </div>
                )}
              </span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>

      <aside className="order-summary">
        <h3>Order summary</h3>
        <div className="summary-items">
          {cart.map((i) => {
            const p = byId(i.id);
            if (!p) return null;
            return (
              <div className="ci" key={p.id}>
                <div className="ph">
                  <span>{p.cat}</span>
                </div>
                <div>
                  <div className="ci-cat">{p.cat}</div>
                  <div className="ci-name">{p.name}</div>
                  <div className="ci-cat">Qty {i.qty}</div>
                </div>
                <div className="ci-price">{rs(p.price * i.qty)}</div>
              </div>
            );
          })}
        </div>
        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{rs(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? "Free" : rs(shippingFee)}</span>
          </div>
          <div className="summary-row grand">
            <span>Total</span>
            <span>{rs(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
