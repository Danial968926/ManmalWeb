import OrdersTable from "@/components/admin/OrdersTable";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sample orders for this UI preview — changes are kept for this session only.
      </p>
      <div className="mt-6">
        <OrdersTable />
      </div>
    </div>
  );
}
