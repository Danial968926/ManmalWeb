"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, LogOut, Store, Menu, X } from "lucide-react";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
];

function lockDashboard() {
  sessionStorage.removeItem("manmal_admin_unlocked");
  window.location.href = "/admin";
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders } = useAdminData();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  // Escape closes drawer; links close it via onClick
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-5 py-5">
        <Image
          src="/manmal-logo-transparent.png"
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-full bg-sidebar-accent object-contain p-1"
        />
        <div>
          <span className="block text-sm font-semibold tracking-tight">The Manmal Club</span>
          <p className="text-xs text-muted-foreground">Admin dashboard</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
              {item.href === "/admin/orders" && pendingCount > 0 && (
                <span
                  className={cn(
                    "ml-auto inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                    active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                  )}
                >
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-1 border-t border-sidebar-border px-3 py-3">
        <Link
          href="/"
          onClick={() => setDrawerOpen(false)}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-sidebar-accent hover:text-foreground"
        >
          <Store className="size-4" />
          View store
        </Link>
        <button
          onClick={lockDashboard}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors duration-200 hover:bg-sidebar-accent hover:text-foreground"
        >
          <LogOut className="size-4" />
          Lock dashboard
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {/* mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
        >
          <Menu className="size-5" />
        </button>
        <Image
          src="/manmal-logo-transparent.png"
          alt=""
          width={28}
          height={28}
          className="size-7 rounded-full bg-muted object-contain p-0.5"
        />
        <span className="text-sm font-semibold">Manmal Admin</span>
      </header>

      {/* mobile drawer + scrim */}
      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/40 transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 ease-out lg:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Admin navigation"
      >
        <button
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
          className="absolute top-4 right-3 cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors duration-200 hover:bg-sidebar-accent hover:text-foreground"
        >
          <X className="size-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        {sidebarContent}
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
