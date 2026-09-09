import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-400",
  delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
};

/* Dot color per status for chart legend / compact contexts */
export const STATUS_DOT: Record<OrderStatus, string> = {
  pending: "bg-amber-500",
  confirmed: "bg-blue-500",
  shipped: "bg-purple-700",
  delivered: "bg-emerald-500",
  cancelled: "bg-red-500",
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLE[status]
      )}
    >
      {status}
    </span>
  );
}
