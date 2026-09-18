"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, PackageSearch } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { useAdminData } from "@/components/admin/AdminDataProvider";

export default function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { products, categories, updateProduct } = useAdminData();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <PackageSearch className="mx-auto size-8 text-muted-foreground" />
        <h1 className="mt-3 text-lg font-semibold">Product not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          No product with id “{id}” in database.
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

  async function handleSave(formData: FormData) {
    const success = await updateProduct(product!.id, formData);
    if (success) {
      router.push("/admin/products");
    } else {
      alert("Failed to update product.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Products
        </Link>
        <h1 className="text-xl font-semibold tracking-tight">Edit product</h1>
        <span className="ml-auto min-w-0 max-w-[40%] truncate text-xs text-muted-foreground">
          {product.name}
        </span>
      </div>
      <div className="mt-4">
        <ProductForm
          initial={product}
          categories={categories}
          onSave={handleSave}
          onCancel={() => router.push("/admin/products")}
        />
      </div>
    </div>
  );
}