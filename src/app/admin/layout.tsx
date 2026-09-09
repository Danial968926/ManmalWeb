"use client";

import PasswordGate from "@/components/admin/PasswordGate";
import AdminDataProvider from "@/components/admin/AdminDataProvider";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      <AdminDataProvider>
        <AdminShell>{children}</AdminShell>
      </AdminDataProvider>
    </PasswordGate>
  );
}
