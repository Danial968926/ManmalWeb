"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { MOCK_ORDERS } from "@/lib/mockOrders";
import type { Order, OrderStatus, Product } from "@/lib/types";

interface AdminDataValue {
  products: Product[];
  orders: Order[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const AdminDataContext = createContext<AdminDataValue | null>(null);

export function useAdminData(): AdminDataValue {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}

/**
 * Session-lifetime mock data store for the admin UI phase. The admin layout
 * persists across child-route navigations, so edits survive page changes;
 * a hard reload reseeds from the static mocks. Replaced by the API later.
 */
export default function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const addProduct = useCallback((p: Product) => {
    setProducts((prev) => [p, ...prev]);
  }, []);

  const updateProduct = useCallback((p: Product) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  return (
    <AdminDataContext.Provider
      value={{ products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}
