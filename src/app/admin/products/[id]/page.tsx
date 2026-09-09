"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImageOff, PackageSearch, Pencil, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { rs } from "@/lib/products";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMG = "/products/placeholder.jpg";

export default function AdminProductViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { products, deleteProduct } = useAdminData();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <PackageSearch className="mx-auto size-8 text-muted-foreground" />
        <h1 className="mt-3 text-lg font-semibold">Product not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          No product with id “{id}” in this preview session.
        </p>
        <Link
          href="/admin/products"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Link>
      </div>
    );
  }

  function handleDelete() {
    if (!window.confirm("Delete this product? This only affects this preview session.")) return;
    deleteProduct(id);
    router.push("/admin/products");
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col lg:h-[calc(100dvh-4rem)]">
      {/* slim header row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Products
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-xl font-semibold tracking-tight">
          {product.name}
        </h1>
        <div className="flex gap-2">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <Pencil data-icon="inline-start" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className={cn(buttonVariants({ size: "sm", variant: "destructive" }), "cursor-pointer")}
          >
            <Trash2 data-icon="inline-start" />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* image */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs lg:min-h-0">
          {product.img === PLACEHOLDER_IMG ? (
            <div className="flex aspect-4/5 w-full items-center justify-center bg-muted text-muted-foreground lg:aspect-auto lg:h-full">
              <ImageOff className="size-8" />
            </div>
          ) : (
            <Image
              src={product.img}
              alt={product.name}
              width={640}
              height={800}
              unoptimized={product.img.startsWith("data:")}
              className="aspect-4/5 w-full object-cover lg:aspect-auto lg:h-full"
            />
          )}
        </div>

        {/* details */}
        <div className="flex flex-col gap-4 lg:min-h-0 lg:overflow-y-auto">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-semibold tabular-nums">{rs(product.price)}</span>
              {product.was && (
                <span className="text-sm text-muted-foreground line-through tabular-nums">
                  {rs(product.was)}
                </span>
              )}
              {product.tag && (
                <span className="ml-auto rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  {product.tag}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{product.blurb}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                ["Category", product.cat],
                ["Level", product.level],
                ["Time", product.time],
                ["Makes", product.makes],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-0.5">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs lg:min-h-0">
            <h2 className="text-sm font-semibold">What&apos;s in the box</h2>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
              {product.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
