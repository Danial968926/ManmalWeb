import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order confirmed — The Manmal Club",
  description: "Thank you for your order.",
};

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main>
      <section className="confirm-hero wrap">
        <div className="confirm-mark">&#10003;</div>
        <span className="eyebrow reveal">Order placed</span>
        <h1 className="h1 reveal">Thank you</h1>
        <p className="lede muted reveal" style={{ maxWidth: "46ch", margin: "16px auto 0" }}>
          We&apos;ve received your order and will be in touch shortly to confirm details and
          dispatch.
        </p>
        {order && <span className="confirm-order-no">Order {order}</span>}
        <div style={{ marginTop: "36px" }}>
          <Link href="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
