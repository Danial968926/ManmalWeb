import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, byId, rs } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PdpClient from "@/components/product/PdpClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = byId(id) ?? PRODUCTS[0];
  return { title: `${p.name} — The Manmal Club`, description: p.blurb };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = byId(id) ?? PRODUCTS[0];

  // related: same category first, exclude self, take 4
  const related = PRODUCTS.filter((x) => x.id !== p.id)
    .slice()
    .sort((a, b) => Number(b.cat === p.cat) - Number(a.cat === p.cat))
    .slice(0, 4);

  return (
    <main id="pdp">
      <div className="wrap pdp-crumb">
        <Link href="/shop">Shop</Link> <span>/</span>{" "}
        <Link href={`/shop?cat=${encodeURIComponent(p.cat)}`}>{p.cat}</Link>{" "}
        <span>/</span> {p.name}
      </div>

      <div className="wrap pdp-grid">
        <div className="pdp-media">
          <div className="pdp-main ph">
            {p.tag && <span className="card-tag">{p.tag}</span>}
            <span>{p.name}</span>
          </div>
          <div className="pdp-thumbs">
            <div className="ph">
              <span>Detail</span>
            </div>
            <div className="ph">
              <span>In use</span>
            </div>
            <div className="ph">
              <span>Finished</span>
            </div>
          </div>
        </div>

        <div className="pdp-info">
          <div className="pdp-cat">{p.cat}</div>
          <h1 className="pdp-name">{p.name}</h1>
          <div className="pdp-pricerow">
            {p.was && <span className="pdp-was">{rs(p.was)}</span>}
            <span className="pdp-price">{rs(p.price)}</span>
          </div>
          <p className="pdp-blurb">{p.blurb}</p>
          <div className="pdp-meta">
            <div>
              <span className="m-k">Makes</span>
              <span className="m-v">{p.makes}</span>
            </div>
            <div>
              <span className="m-k">Time</span>
              <span className="m-v">{p.time}</span>
            </div>
            <div>
              <span className="m-k">Level</span>
              <span className="m-v">{p.level}</span>
            </div>
          </div>

          <PdpClient p={p} />

          <div className="pdp-includes">
            <h3>What&rsquo;s in the box</h3>
            <ul>
              {p.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="pdp-notes">
            <details open>
              <summary>Shipping &amp; delivery</summary>
              <p>
                Dispatched within 2–3 working days. Free delivery on orders over Rs. 5,000,
                flat Rs. 250 below. Delivered anywhere in Pakistan.
              </p>
            </details>
            <details>
              <summary>Good to know</summary>
              <p>
                Designed for adults and supervised teens. Kits contain small parts and, for
                resin and candle kits, materials best used in a ventilated space. A full safety
                note is included.
              </p>
            </details>
            <details>
              <summary>Gifting</summary>
              <p>
                Every kit arrives gift-ready. Add a handwritten note at checkout, or order a
                gift card from our contact page.
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="section pdp-related">
        <div className="wrap">
          <div className="feature-head">
            <div>
              <span className="eyebrow">Keep exploring</span>
              <h2 className="h2">You might also like</h2>
            </div>
            <Link href="/shop" className="link-arrow">
              All kits
            </Link>
          </div>
          <div className="grid-4">
            {related.map((rp) => (
              <ProductCard key={rp.id} p={rp} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
