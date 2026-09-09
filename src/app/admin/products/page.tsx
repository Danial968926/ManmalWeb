import ProductsTable from "@/components/admin/ProductsTable";

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sample catalogue for this UI preview — changes are kept for this session only.
      </p>
      <div className="mt-6">
        <ProductsTable />
      </div>
    </div>
  );
}
