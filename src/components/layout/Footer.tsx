import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-top">
          {/* Brand & Newsletter Section */}
          <div className="foot-brand">
            <Link href="/" className="brand brand-logo" aria-label="The Manmal Club home">
              <Image
                src="/manmal-logo-transparent.png"
                alt="The Manmal Club"
                width={1000}
                height={1000}
                className="img"
                priority
              />
            </Link>
            <p>
              Premium DIY kits for grown-ups who want to slow down and make something.
              Curated and shipped from Pakistan.
            </p>
            <NewsletterForm style={{ marginTop: 22 }} />
          </div>

          {/* Links Section using your .FootLinks pattern */}
          <div className="FootLinks">
            <div className="foot-col">
              <h4>Shop</h4>
              <Link href="/shop?cat=Diamond%2520Painting">Diamond Painting</Link>
              <Link href="/shop?cat=Rhinestone%2520Art">Rhinestone Art</Link>
              <Link href="/shop?cat=Bedazzle%2520Tumblers">Bedazzle Tumblers</Link>
              <Link href="/shop?cat=Crystal%2520Keychains">Crystal Keychains</Link>
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
        </div>

        {/* Bottom Bar */}
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