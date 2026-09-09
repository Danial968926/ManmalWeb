"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { rs } from "@/lib/products";
import StatusBadge, { ORDER_STATUSES } from "@/components/admin/StatusBadge";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import type { OrderStatus } from "@/lib/types";

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { orders, updateOrderStatus } = useAdminData();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <PackageSearch className="mx-auto size-8 text-muted-foreground" />
        <h1 className="mt-3 text-lg font-semibold">Order not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          No order with id “{id}” in this preview session.
        </p>
        <Link
          href="/admin/orders"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col lg:h-[calc(100dvh-4rem)]">
      {/* slim header row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Orders
        </Link>
        <h1 className="text-xl font-semibold tracking-tight">{order.id}</h1>
        <StatusBadge status={order.status} />
        <span className="ml-auto text-sm text-muted-foreground">
          Placed{" "}
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* customer + shipping + payment + status in one card */}
        <div className="h-fit rounded-xl border border-border bg-card p-5 shadow-xs lg:max-h-full lg:overflow-y-auto">
          <h2 className="text-sm font-semibold">Customer</h2>
          <div className="mt-2 space-y-0.5 text-sm">
            <p className="font-medium">{order.customerName}</p>
            <p className="text-muted-foreground">{order.email}</p>
            <p className="text-muted-foreground">{order.phone}</p>
          </div>

          <h2 className="mt-5 text-sm font-semibold">Shipping address</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {order.address}
            <br />
            {order.city}
          </p>

          <h2 className="mt-5 text-sm font-semibold">Payment</h2>
          <p className="mt-2 text-sm">
            {order.paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}
          </p>

          <div className="mt-5 border-t border-border pt-4">
            <label htmlFor="orderStatus" className="block text-sm font-semibold">
              Order status
            </label>
            <select
              id="orderStatus"
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
              className="mt-2 w-full cursor-pointer rounded-lg border border-input bg-background px-3 py-2 text-sm capitalize outline-none transition-colors duration-150 focus:border-ring"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Kept for this session only (UI preview).
            </p>
          </div>
        </div>

        {/* items + totals */}
        <div className="flex flex-col rounded-xl border border-border bg-card shadow-xs lg:min-h-0">
          <div className="shrink-0 border-b border-border px-5 py-3.5">
            <h2 className="text-sm font-semibold tabular-nums">
              Items ({order.items.reduce((a, i) => a + i.qty, 0)})
            </h2>
          </div>
          <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto px-5">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-3 py-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {rs(item.price)} × {item.qty}
                  </p>
                </div>
                <span className="shrink-0 font-medium tabular-nums">
                  {rs(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="shrink-0 space-y-1 border-t border-border px-5 py-3.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums">{rs(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="tabular-nums">
                {order.shippingFee === 0 ? "Free" : rs(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{rs(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
