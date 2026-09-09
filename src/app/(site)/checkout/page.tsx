import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — The Manmal Club",
  description: "Review your bag and complete your order.",
};

export default function CheckoutPage() {
  return (
    <main>
      <section className="checkout-hero">
        <div className="wrap center">
          <span className="eyebrow reveal">Almost there</span>
          <h1 className="h1 reveal">Checkout</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(24px,3vw,40px)" }}>
        <div className="wrap">
          <CheckoutClient />
        </div>
      </section>
    </main>
  );
}
