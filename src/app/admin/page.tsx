"use client";

import Link from "next/link";
import { ShoppingBag, Clock, Banknote, Package } from "lucide-react";
import { rs } from "@/lib/products";
import StatusBadge, { ORDER_STATUSES, STATUS_DOT } from "@/components/admin/StatusBadge";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { cn } from "@/lib/utils";
import type { Order } from "@/lib/types";

const DAY_MS = 24 * 60 * 60 * 1000;
const CHART_DAYS = 14;

function revenueByDay(orders: Order[]) {
  const counted = orders.filter((o) => o.status !== "cancelled");
  const latest = Math.max(...orders.map((o) => new Date(o.createdAt).getTime()));
  const end = new Date(latest);
  end.setHours(0, 0, 0, 0);

  const days: { key: string; label: string; total: number }[] = [];
  for (let i = CHART_DAYS - 1; i >= 0; i--) {
    const d = new Date(end.getTime() - i * DAY_MS);
    days.push({
      key: d.toDateString(),
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      total: 0,
    });
  }
  for (const o of counted) {
    const d = new Date(o.createdAt);
    d.setHours(0, 0, 0, 0);
    const bucket = days.find((day) => day.key === d.toDateString());
    if (bucket) bucket.total += o.total;
  }
  return days;
}

export default function AdminOverviewPage() {
  const { orders, products } = useAdminData();
  const pending = orders.filter((o) => o.status === "pending").length;
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total orders", value: orders.length.toString(), icon: ShoppingBag },
    { label: "Pending orders", value: pending.toString(), icon: Clock },
    { label: "Revenue", value: rs(revenue), icon: Banknote },
    { label: "Products", value: products.length.toString(), icon: Package },
  ];

  const days = revenueByDay(orders);
  const maxDay = Math.max(...days.map((d) => d.total), 1);

  const statusCounts = ORDER_STATUSES.map((status) => ({
    status,
    count: orders.filter((o) => o.status === status).length,
  })).filter((s) => s.count > 0);

  const recent = orders.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A snapshot of orders and products. Data shown is sample data for this UI preview.
      </p>

      {/* stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-xs"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 truncate text-2xl font-semibold tabular-nums">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        {/* revenue by day */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <h2 className="text-sm font-semibold">Revenue — last {CHART_DAYS} days</h2>
          <p className="text-xs text-muted-foreground">
            Excludes cancelled orders. Peak day {rs(maxDay)}.
          </p>
          <div className="mt-4 flex h-36 items-end gap-0.5" role="img" aria-label={`Daily revenue for the last ${CHART_DAYS} days, peaking at ${rs(maxDay)}`}>
            {days.map((d) => (
              <div key={d.key} className="group relative flex h-full flex-1 flex-col justify-end">
                {/* hover tooltip */}
                <div className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-md bg-foreground px-2 py-1 text-[11px] font-medium whitespace-nowrap text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {d.label} · {rs(d.total)}
                </div>
                {/* hit area wider than mark */}
                <div className="absolute inset-0" />
                <div
                  className={cn(
                    "mx-auto w-full max-w-6 rounded-t-[4px] transition-colors duration-150",
                    d.total > 0
                      ? "bg-primary group-hover:bg-primary/80"
                      : "h-0.5 bg-border"
                  )}
                  style={d.total > 0 ? { height: `${Math.max((d.total / maxDay) * 100, 4)}%` } : undefined}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>{days[0].label}</span>
            <span>{days[days.length - 1].label}</span>
          </div>
        </div>

        {/* orders by status */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <h2 className="text-sm font-semibold">Orders by status</h2>
          <p className="text-xs text-muted-foreground">{orders.length} orders total.</p>
          <div className="mt-4 flex h-3 w-full gap-0.5 overflow-hidden rounded-full" role="img" aria-label={statusCounts.map((s) => `${s.count} ${s.status}`).join(", ")}>
            {statusCounts.map((s) => (
              <div
                key={s.status}
                className={cn("h-full", STATUS_DOT[s.status])}
                style={{ width: `${(s.count / orders.length) * 100}%` }}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {statusCounts.map((s) => (
              <li key={s.status} className="flex items-center gap-2.5 text-sm">
                <span className={cn("size-2.5 shrink-0 rounded-full", STATUS_DOT[s.status])} />
                <span className="capitalize">{s.status}</span>
                <span className="ml-auto font-medium tabular-nums">{s.count}</span>
                <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">
                  {Math.round((s.count / orders.length) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* recent orders */}
      <div className="mt-6 rounded-xl border border-border bg-card shadow-xs">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recent.map((o) => (
            <Link
              key={o.id}
              href={`/admin/orders/${o.id}`}
              className="flex items-center justify-between gap-4 px-5 py-3 text-sm transition-colors duration-150 hover:bg-muted/50"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{o.customerName}</p>
                <p className="text-xs text-muted-foreground">{o.id}</p>
              </div>
              <StatusBadge status={o.status} />
              <span className="w-20 text-right font-medium tabular-nums">{rs(o.total)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
