"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { useAdminData } from "@/components/admin/AdminDataProvider";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addProduct } = useAdminData();

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
        <h1 className="text-xl font-semibold tracking-tight">New product</h1>
        <span className="ml-auto text-xs text-muted-foreground">
          Added for this session only (UI preview)
        </span>
      </div>
      <div className="mt-4">
        <ProductForm
          initial={null}
          onSave={(p) => {
            addProduct(p);
            router.push("/admin/products");
          }}
          onCancel={() => router.push("/admin/products")}
        />
      </div>
    </div>
  );
}
