import "../manmal.css";
import { CartProvider } from "@/components/cart/CartProvider";
import Grain from "@/components/layout/Grain";
import AnnounceBar from "@/components/layout/AnnounceBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/layout/RevealInit";
import CartDrawer from "@/components/cart/CartDrawer";
import Toast from "@/components/cart/Toast";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
