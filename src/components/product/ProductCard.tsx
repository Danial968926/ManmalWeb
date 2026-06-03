import Link from "next/link";
import { rs } from "@/lib/products";
import type { Product } from "@/lib/types";
import AddToBagButton from "@/components/cart/AddToBagButton";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card reveal">
      <Link href={`/product/${p.id}`} aria-label={p.name}>
        <div className="card-img">
          {p.tag && <span className="card-tag">{p.tag}</span>}
          <div className="ph">
            <span>{p.cat}</span>
          </div>
          <AddToBagButton id={p.id} as="span" className="quick">
            Add to bag
          </AddToBagButton>
        </div>
        <div className="card-body">
          <div className="card-cat">{p.cat}</div>
          <h3 className="card-name">{p.name}</h3>
          <span className="card-price">
            {p.was && <span className="was">{rs(p.was)}</span>}
            {rs(p.price)}
          </span>
        </div>
      </Link>
    </article>
  );
}
