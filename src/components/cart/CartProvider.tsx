"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { byId } from "@/lib/products";
import type { CartLine } from "@/lib/types";

const KEY = "manmal_cart_v1";

interface CartContextValue {
  cart: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  toastMsg: string | null;
  add: (id: string, qty?: number) => void;
  changeQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toast: (msg: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  // hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  // persist after hydration
  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem(KEY, JSON.stringify(cart));
  }, [cart]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    (id: string, qty = 1) => {
      setCart((prev) => {
        const line = prev.find((i) => i.id === id);
        if (line) {
          return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { id, qty }];
      });
      const p = byId(id);
      toast((p ? p.name : "Item") + " added to bag");
      setIsOpen(true);
    },
    [toast]
  );

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const remove = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // body scroll lock while drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // escape closes drawer
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const count = useMemo(() => cart.reduce((a, i) => a + i.qty, 0), [cart]);
  const subtotal = useMemo(
    () =>
      cart.reduce((a, i) => {
        const p = byId(i.id);
        return a + (p ? p.price * i.qty : 0);
      }, 0),
    [cart]
  );

  const value: CartContextValue = {
    cart,
    count,
    subtotal,
    isOpen,
    toastMsg,
    add,
    changeQty,
    remove,
    openCart,
    closeCart,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
