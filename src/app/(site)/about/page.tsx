import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our story — The Manmal Club",
  description:
    "The Manmal Club exists to make creative hobbies genuinely easy to start in Pakistan, and beautiful enough to want to.",
};

export default function AboutPage() {
  return (
    <main>
      {/* intro */}
      <section className="about-hero">
        <div className="wrap center">
          <span className="eyebrow reveal">Our story</span>
          <h1 className="h1 reveal">
            Make something
            <br />
            with your <span className="script">hands</span>
          </h1>
          <p
            className="lede reveal"
            style={{ maxWidth: "54ch", margin: "22px auto 0", color: "var(--ink-soft)" }}
          >
            The Manmal Club exists for one reason — to make creative hobbies genuinely easy to
            start in Pakistan, and beautiful enough to want to.
          </p>
        </div>
      </section>

      {/* big image */}
      <section className="wrap">
        <div className="about-banner reveal">
          <div className="ph">
            <span>Studio — supplies laid out, warm daylight</span>
          </div>
        </div>
      </section>

      {/* narrative */}
      <section className="section about-story">
        <div className="wrap">
          <div className="about-cols">
            <div className="about-aside reveal">
              <span className="eyebrow">Why we began</span>
            </div>
            <div className="about-body reveal">
              <p className="lede">
                It started with a half-finished idea and a long list of things we couldn&apos;t
                find.
              </p>
              <p>
                Anyone who has tried to take up a hobby here knows the feeling. You want to
                bedazzle a tumbler, start a diamond painting, bling a phone case — and you spend
                three weekends hunting down the right rhinestones, an applicator pen, an adhesive
                that actually holds. By the time you have it all, the spark has gone.
              </p>
              <p>
                We thought the making should be the hard part — the good kind of hard. Not the
                sourcing. So we built kits that hold everything: the materials, the tools, and a
                clear guide that takes you from an empty table to something you&apos;re proud of,
                in an afternoon.
              </p>
              <p>
                The name is a small private joke that stuck. The club is the part we mean — a
                growing group of people across Pakistan choosing to spend an evening making
                instead of scrolling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section about-values" id="values">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow" style={{ color: "var(--brick-soft)" }}>
              What we believe
            </span>
            <h2 className="h2" style={{ color: "var(--oat)" }}>
              Four things, held closely
            </h2>
          </div>
          <div className="belief-grid">
            <div className="belief reveal">
              <span className="step-no">01</span>
              <h3>Making is good for you</h3>
              <p>
                An hour with your hands busy is an hour your mind gets to rest. That&apos;s the
                whole product.
              </p>
            </div>
            <div className="belief reveal">
              <span className="step-no">02</span>
              <h3>Quality over quantity</h3>
              <p>
                Fewer, better kits. Real materials that give a result worth keeping — never
                filler to pad a box.
              </p>
            </div>
            <div className="belief reveal">
              <span className="step-no">03</span>
              <h3>Anyone can start</h3>
              <p>
                No experience needed. Our guides assume nothing and walk you through, calmly,
                step by step.
              </p>
            </div>
            <div className="belief reveal">
              <span className="step-no">04</span>
              <h3>Made local, made well</h3>
              <p>
                Curated and packed in Pakistan, shipped to your door — supporting making, here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="section">
        <div className="wrap stat-grid">
          <div className="stat reveal">
            <span className="stat-n">7</span>
            <span className="stat-l">Craft categories</span>
          </div>
          <div className="stat reveal">
            <span className="stat-n">100%</span>
            <span className="stat-l">Materials included</span>
          </div>
          <div className="stat reveal">
            <span className="stat-n">1 box</span>
            <span className="stat-l">Everything you need</span>
          </div>
          <div className="stat reveal">
            <span className="stat-n">Nationwide</span>
            <span className="stat-l">Delivery across Pakistan</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section join">
        <div className="wrap center reveal">
          <span className="eyebrow" style={{ color: "var(--brick-soft)" }}>
            Ready when you are
          </span>
          <h2 className="h1" style={{ color: "var(--oat)" }}>
            Find your <span className="script" style={{ color: "var(--brick-soft)" }}>craft</span>
          </h2>
          <p
            className="lede"
            style={{
              color: "rgba(244,240,232,.78)",
              maxWidth: "44ch",
              margin: "18px auto 28px",
            }}
          >
            Seven ways to make, all in one place. Start with whatever pulls you in.
          </p>
          <Link
            href="/shop"
            className="btn btn-primary"
            style={{
              background: "var(--brick-soft)",
              borderColor: "var(--brick-soft)",
              color: "var(--ink)",
            }}
          >
            Shop the kits
          </Link>
        </div>
      </section>
    </main>
  );
}
