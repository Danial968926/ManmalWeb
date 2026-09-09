export interface Product {
  id: string;
  cat: string;
  name: string;
  price: number;
  was: number | null;
  tag: string | null;
  blurb: string;
  makes: string;
  time: string;
  level: string;
  includes: string[];
  img: string;
}

export interface CartLine {
  id: string;
  qty: number;
}

export type PaymentMethod = "cod" | "bank_transfer";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}
