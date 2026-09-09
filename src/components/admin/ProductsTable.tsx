"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageOff, Pencil, Plus, Search, SearchX, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORIES, rs } from "@/lib/products";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const PLACEHOLDER_IMG = "/products/placeholder.jpg";

function Thumb({ p }: { p: Product }) {
  if (p.img === PLACEHOLDER_IMG) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <ImageOff className="size-4" />
      </div>
    );
  }
  return (
    <Image
      src={p.img}
      alt={p.name}
      width={40}
      height={40}
      unoptimized={p.img.startsWith("data:")}
      className="size-10 shrink-0 rounded-md border border-border object-cover"
    />
  );
}

export default function ProductsTable() {
  const router = useRouter();
  const { products, deleteProduct } = useAdminData();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "All" && p.cat !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, cat]);

  function handleDelete(id: string) {
    if (!window.confirm("Delete this product? This only affects this preview session.")) return;
    deleteProduct(id);
  }

  return (
    <div>
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full rounded-lg border border-input bg-card py-2 pr-3 pl-9 text-sm outline-none transition-colors duration-150 focus:border-ring"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          aria-label="Filter by category"
          className="cursor-pointer rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none transition-colors duration-150 focus:border-ring"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Link
          href="/admin/products/new"
          className={cn(buttonVariants({ size: "sm" }), "ml-auto")}
        >
          <Plus data-icon="inline-start" />
          Add product
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="border-b border-border px-5 py-3.5">
          <h2 className="text-sm font-semibold tabular-nums">
            {visible.length} of {products.length} products
          </h2>
        </div>
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <SearchX className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">No products match</p>
            <p className="text-sm text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="hidden px-5 py-3 font-medium md:table-cell">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => router.push(`/admin/products/${p.id}`)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-muted/50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb p={p} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{p.name}</p>
                          {p.tag && <span className="text-xs text-muted-foreground">{p.tag}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 text-muted-foreground md:table-cell">
                      {p.cat}
                    </td>
                    <td className="px-5 py-3 tabular-nums">
                      {rs(p.price)}
                      {p.was && (
                        <span className="ml-2 text-xs text-muted-foreground line-through">
                          {rs(p.was)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(p.id);
                          }}
                          className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-destructive"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
