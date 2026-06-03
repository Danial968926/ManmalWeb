import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/products";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop the kits — The Manmal Club",
  description: "Browse premium DIY craft kits by category. Everything you need in one box.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const initialCat =
    cat && (CATEGORIES as readonly string[]).includes(cat) ? cat : "All";

  return (
    <main>
      <ShopClient initialCat={initialCat} />

      {/* reassurance strip */}
      <section className="reassure">
        <div className="wrap reassure-grid">
          <div className="reassure-item reveal">
            <h4>Curated materials</h4>
            <p>Quality supplies, no filler — chosen for the result.</p>
          </div>
          <div className="reassure-item reveal">
            <h4>Beginner-friendly</h4>
            <p>Clear, illustrated guides in every box.</p>
          </div>
          <div className="reassure-item reveal">
            <h4>Gift-ready</h4>
            <p>Beautifully packaged, ready to give.</p>
          </div>
          <div className="reassure-item reveal">
            <h4>Nationwide delivery</h4>
            <p>Shipped anywhere in Pakistan.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
