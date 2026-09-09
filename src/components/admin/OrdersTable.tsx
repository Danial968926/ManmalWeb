"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { rs } from "@/lib/products";
import { cn } from "@/lib/utils";
import StatusBadge, { ORDER_STATUSES } from "@/components/admin/StatusBadge";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import type { OrderStatus } from "@/lib/types";

type StatusFilter = OrderStatus | "all";

export default function OrdersTable() {
  const router = useRouter();
  const { orders } = useAdminData();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      all: orders.length,
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    for (const o of orders) c[o.status]++;
    return c;
  }, [orders]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (q && !o.customerName.toLowerCase().includes(q) && !o.id.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [orders, filter, query]);

  return (
    <div>
      {/* filter row */}
      <div className="flex flex-wrap items-center gap-2">
        {(["all", ...ORDER_STATUSES] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors duration-150",
              filter === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-input hover:text-foreground"
            )}
          >
            {s} <span className="tabular-nums">({counts[s]})</span>
          </button>
        ))}
        <div className="relative ml-auto w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or order id…"
            aria-label="Search orders"
            className="w-full rounded-lg border border-input bg-card py-2 pr-3 pl-9 text-sm outline-none transition-colors duration-150 focus:border-ring"
          />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <SearchX className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">No orders match</p>
            <p className="text-sm text-muted-foreground">
              Try a different status filter or search term.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="hidden px-5 py-3 font-medium md:table-cell">Date</th>
                  <th className="hidden px-5 py-3 font-medium xl:table-cell">Payment</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => router.push(`/admin/orders/${o.id}`)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-muted/50"
                  >
                    <td className="px-5 py-3 font-medium">{o.id}</td>
                    <td className="max-w-40 truncate px-5 py-3">{o.customerName}</td>
                    <td className="hidden px-5 py-3 text-muted-foreground md:table-cell">
                      {new Date(o.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                    <td className="hidden px-5 py-3 text-muted-foreground xl:table-cell">
                      {o.paymentMethod === "cod" ? "COD" : "Bank transfer"}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      {rs(o.total)}
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
