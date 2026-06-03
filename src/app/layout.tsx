import type { Metadata } from "next";
import "./globals.css";
import "./manmal.css";
import { CartProvider } from "@/components/cart/CartProvider";
import Grain from "@/components/layout/Grain";
import AnnounceBar from "@/components/layout/AnnounceBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/layout/RevealInit";
import CartDrawer from "@/components/cart/CartDrawer";
import Toast from "@/components/cart/Toast";

export const metadata: Metadata = {
  title: "The Manmal Club — Premium DIY Kits for Makers",
  description:
    "Premium DIY craft kits for grown-ups. Candle-making, resin, painting, embroidery and more — everything in one beautiful box. Made in Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Grain />
          <AnnounceBar />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <Toast />
          <RevealInit />
        </CartProvider>
      </body>
    </html>
  );
}
