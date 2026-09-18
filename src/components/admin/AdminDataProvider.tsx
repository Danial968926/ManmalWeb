"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MOCK_ORDERS } from "@/lib/mockOrders";
import type { Order, OrderStatus, Product } from "@/lib/types";

interface AdminDataValue {
  products: Product[];
  categories: { id: number; name: string; slug: string }[];
  orders: Order[];
  addProduct: (formData: FormData) => Promise<boolean>;
  updateProduct: (id: number | string, formData: FormData) => Promise<boolean>;
  deleteProduct: (id: string | number) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const AdminDataContext = createContext<AdminDataValue | null>(null);

export function useAdminData(): AdminDataValue {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}

const API_BASE = "https://localhost:7227/api";
// Tareeqa 2: Cloudflare R2 storage bucket endpoint direct frontend par map kiya gaya hai
const R2_PUBLIC_URL = "https://pub-2985182bb8cc418b8e5c05babf91011e.r2.dev";

export default function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Fetch Categories from Backend
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/Categories`);
      const json = await res.json();
      if (json.success && json.data) {
        setCategories(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Fetch Products from Backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/Products`);
      const json = await res.json();
      if (json.success && json.data) {
        const mapped: Product[] = json.data.map((item: any) => ({
          id: item.id.toString(),
          cat: item.category?.name || "Diamond Painting",
          name: item.name,
          price: item.price,
          was: item.wasPrice || null,
          tag: item.tag || null,
          blurb: item.blurb || "",
          makes: item.makes || "",
          time: item.time || "",
          level: item.level || "Beginner",
          includes: item.includes ? item.includes.split(",") : [],
          img: item.imageUrl || "/products/placeholder.jpg",
        }));
        setProducts(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const addProduct = useCallback(async (formData: FormData): Promise<boolean> => {
    try {
      const token = sessionStorage.getItem("manmal_admin_token");
      const res = await fetch(`${API_BASE}/Products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        await fetchProducts();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding product:", err);
      return false;
    }
  }, []);

  const updateProduct = useCallback(async (id: number | string, formData: FormData): Promise<boolean> => {
    try {
      const token = sessionStorage.getItem("manmal_admin_token");
      const res = await fetch(`${API_BASE}/Products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        await fetchProducts();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating product:", err);
      return false;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string | number) => {
    try {
      const token = sessionStorage.getItem("manmal_admin_token");
      const res = await fetch(`${API_BASE}/Products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((x) => x.id !== id.toString()));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  return (
    <AdminDataContext.Provider
      value={{ products, categories, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}