import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <span className="the">The</span>
            <span className="nm">Manmal</span>
            <span className="club">Club</span>
            <p>
              Premium DIY kits for grown-ups who want to slow down and make something.
              Curated and shipped from Pakistan.
            </p>
            <NewsletterForm style={{ marginTop: 22 }} />
          </div>
          <div className="foot-col">
            <h4>Shop</h4>
            <Link href="/shop?cat=Candle%20Making">Candle Making</Link>
            <Link href="/shop?cat=Resin%20Art">Resin Art</Link>
            <Link href="/shop?cat=Painting">Painting</Link>
            <Link href="/shop?cat=Embroidery">Embroidery</Link>
            <Link href="/shop">All kits</Link>
          </div>
          <div className="foot-col">
            <h4>The Club</h4>
            <Link href="/about">Our story</Link>
            <Link href="/about#values">What we believe</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/contact#faq">FAQ</Link>
          </div>
          <div className="foot-col">
            <h4>Help</h4>
            <Link href="/contact">Shipping &amp; delivery</Link>
            <Link href="/contact">Returns</Link>
            <Link href="/contact">Gift orders</Link>
            <Link href="/contact#faq">Bulk &amp; workshops</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2025 The Manmal Club · Karachi, Pakistan</span>
          <div className="socials">
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
            <a href="#">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
