import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import CraftIndex from "@/components/home/CraftIndex";
import NewsletterForm from "@/components/forms/NewsletterForm";

const FEATURED_IDS = [
  "aurora-diamond-painting",
  "crystal-tumbler",
  "galaxy-rhinestone-art",
  "festive-bling-box",
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <main>
      {/* ===== Hero (full-bleed cinematic) ===== */}
      <section className="hero-cine">
        <div className="hero-cine-media" aria-hidden="true" />
        <div className="hero-cine-inner reveal">
          <h1 className="hero-cine-title script">The Manmal Club</h1>
          <p className="hero-cine-tag">Premium DIY bedazzling kits · Made in Pakistan</p>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Diamond Painting</span><span className="sep">·</span>
          <span>Rhinestone Art</span><span className="sep">·</span>
          <span>Bedazzle Tumblers</span><span className="sep">·</span>
          <span>Gem Phone Cases</span><span className="sep">·</span>
          <span>Bedazzle Apparel</span><span className="sep">·</span>
          <span>Crystal Keychains</span><span className="sep">·</span>
          <span>Seasonal Editions</span><span className="sep">·</span>
          <span>Diamond Painting</span><span className="sep">·</span>
          <span>Rhinestone Art</span><span className="sep">·</span>
          <span>Bedazzle Tumblers</span><span className="sep">·</span>
          <span>Gem Phone Cases</span><span className="sep">·</span>
          <span>Bedazzle Apparel</span><span className="sep">·</span>
          <span>Crystal Keychains</span><span className="sep">·</span>
          <span>Seasonal Editions</span><span className="sep">·</span>
        </div>
      </div>

      {/* ===== Craft index ===== */}
      <section className="section index-sec" id="index">
        <div className="wrap">
          <div className="index-head reveal">
            <div>
              <span className="eyebrow">The index</span>
              <h2 className="h2">
                Seven ways
                <br />
                to sparkle
              </h2>
            </div>
            <p className="muted">
              Whatever pulls you in — pick a style and we&apos;ll send the whole experience,
              ready to begin. Hover to preview.
            </p>
          </div>
          <CraftIndex />
        </div>
      </section>

      {/* ===== Featured ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feature-head reveal">
            <div>
              <span className="eyebrow">The favourites</span>
              <h2 className="h2">Loved by the club</h2>
            </div>
            <Link href="/shop" className="link-arrow">
              View all kits
            </Link>
          </div>
          <div className="grid-4" id="featured">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="section how" id="how">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow" style={{ color: "var(--oat)" }}>
              Three simple steps
            </span>
            <h2 className="h2">From box to made — in an afternoon</h2>
          </div>
          <div className="steps">
            <div className="step reveal">
              <span className="step-no">01</span>
              <h3>Choose your kit</h3>
              <p>
                Browse by craft or mood. Every kit is beginner-friendly, with options for
                seasoned hobbyists too.
              </p>
            </div>
            <div className="step reveal">
              <span className="step-no">02</span>
              <h3>Unbox the calm</h3>
              <p>
                It arrives beautifully packed — every material, tool and a clear, illustrated
                guide. Nothing to source.
              </p>
            </div>
            <div className="step reveal">
              <span className="step-no">03</span>
              <h3>Make something</h3>
              <p>
                Set aside an hour or an afternoon. Follow along, lose yourself in it, and keep
                what you create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Brand story strip ===== */}
      <section className="section story">
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <div className="story-art reveal">
            <div className="ph">
              <span>Lifestyle — hands mid-craft on a warm table</span>
            </div>
          </div>
          <div className="story-copy reveal">
            <span className="eyebrow">Why we made this</span>
            <h2 className="h2">Creativity, without the scavenger hunt</h2>
            <p className="lede">
              Sourcing supplies in Pakistan is half the battle — and it&apos;s the part that
              kills the spark. We do that part for you.
            </p>
            <p>
              Manmal began with a simple idea: that making something with your hands is one of
              the most grounding things an adult can do. We curate every kit so the only thing
              left to bring is your attention. Quality materials, considered instructions, and
              packaging worth keeping.
            </p>
            <Link href="/about" className="link-arrow">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="section values">
        <div className="wrap">
          <div className="val-grid">
            <div className="val reveal">
              <span className="val-no">01</span>
              <h3>Curated, not cobbled</h3>
              <p>Every material is chosen for quality and result — no filler, no guesswork.</p>
            </div>
            <div className="val reveal">
              <span className="val-no">02</span>
              <h3>Made for beginners</h3>
              <p>Clear, illustrated guides take you from blank to finished, calmly.</p>
            </div>
            <div className="val reveal">
              <span className="val-no">03</span>
              <h3>Beautifully packaged</h3>
              <p>Gift-ready out of the box — keep it for yourself or pass it on.</p>
            </div>
            <div className="val reveal">
              <span className="val-no">04</span>
              <h3>Shipped nationwide</h3>
              <p>From our studio to your door, anywhere in Pakistan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Join the club CTA ===== */}
      <section className="section join">
        <div className="wrap join-grid">
          <div className="join-card-wrap reveal">
            <div className="mcard">
              <div className="mcard-top">
                <span className="mcard-the">The</span>
                <span className="mcard-nm script">Manmal</span>
                <span className="mcard-club">Club</span>
              </div>
              <div className="mcard-mid">
                <span className="mcard-k">Member</span>
                <span className="mcard-no">No. 001</span>
              </div>
              <div className="mcard-foot">
                <span>Maker since 2025</span>
                <span className="mcard-stamp">★</span>
              </div>
            </div>
          </div>
          <div className="join-copy reveal">
            <span className="eyebrow" style={{ color: "var(--brick-soft)" }}>
              Join the club
            </span>
            <h2 className="h1" style={{ color: "var(--oat)" }}>
              A little more{" "}
              <span className="script" style={{ color: "var(--brick-soft)" }}>
                made
              </span>
              , in your inbox
            </h2>
            <p
              className="lede"
              style={{
                color: "rgba(244,240,232,.78)",
                maxWidth: "42ch",
                margin: "18px 0 0",
              }}
            >
              New kits, seasonal editions and slow-making ideas — sent now and then, never too
              often. No spam, just making.
            </p>
            <NewsletterForm
              className="news join-news"
              placeholder="Your email address"
              style={{ marginLeft: 0 }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
