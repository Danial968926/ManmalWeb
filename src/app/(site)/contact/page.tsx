import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — The Manmal Club",
  description:
    "Questions about a kit, a gift order, a workshop, or want to share what you made — get in touch.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="contact-hero">
        <div className="wrap center">
          <span className="eyebrow reveal">Say hello</span>
          <h1 className="h1 reveal">
            Let&apos;s <span className="script">talk</span>
          </h1>
          <p
            className="lede muted reveal"
            style={{ maxWidth: "46ch", margin: "18px auto 0" }}
          >
            Questions about a kit, a gift order, a workshop, or just want to share what you
            made — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(30px,4vw,56px)" }}>
        <div className="wrap contact-grid">
          {/* form */}
          <div className="contact-form-wrap reveal">
            <ContactForm />
          </div>

          {/* details */}
          <aside className="contact-aside reveal">
            <div className="contact-block">
              <h3>Reach us directly</h3>
              <ul className="contact-list">
                <li>
                  <span className="cl-k">WhatsApp</span>
                  <a href="#">+92 3XX XXXXXXX</a>
                </li>
                <li>
                  <span className="cl-k">Email</span>
                  <a href="#">hello@manmal.co</a>
                </li>
                <li>
                  <span className="cl-k">Instagram</span>
                  <a href="#">@themanmalclub</a>
                </li>
              </ul>
            </div>
            <div className="contact-block">
              <h3>Studio</h3>
              <p className="muted">
                Karachi, Pakistan
                <br />
                By appointment only
              </p>
            </div>
            <div className="contact-block">
              <h3>Hours</h3>
              <p className="muted">
                Monday – Saturday
                <br />
                10:00 – 18:00 PKT
              </p>
            </div>
            <div className="contact-block">
              <h3>Orders &amp; delivery</h3>
              <p className="muted">
                Dispatched in 2–3 working days. Free delivery over Rs. 5,000, flat Rs. 250
                below. Nationwide.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow">Good to know</span>
            <h2 className="h2">Frequently asked</h2>
          </div>
          <div className="faq-list reveal">
            <details>
              <summary>Are the kits suitable for complete beginners?</summary>
              <p>
                Yes — most are designed for first-timers. Every box includes a clear, illustrated
                guide that assumes no prior experience. Kits marked &quot;Improver&quot; are a
                gentle step up once you&apos;ve found your feet.
              </p>
            </details>
            <details>
              <summary>What exactly comes in a kit?</summary>
              <p>
                Everything you need to finish the project: all materials, the tools to work with
                them, and a step-by-step guide. The only things you&apos;ll supply are basics like
                water, a flat surface, and your time. Each product page lists the full contents.
              </p>
            </details>
            <details>
              <summary>How long does delivery take?</summary>
              <p>
                Orders are dispatched within 2–3 working days and delivered anywhere in Pakistan.
                Delivery is free on orders over Rs. 5,000, and a flat Rs. 250 below that.
              </p>
            </details>
            <details>
              <summary>Can I order a kit as a gift?</summary>
              <p>
                Absolutely — every kit arrives gift-ready. You can add a handwritten note at
                checkout, or message us for a gift card and we&apos;ll arrange it.
              </p>
            </details>
            <details>
              <summary>Do you offer workshops or bulk orders?</summary>
              <p>
                We do. We put together kits for events, team activities and gifting at scale, and
                run occasional in-person sessions. Use the form above and choose &quot;Workshops&quot;
                or &quot;Bulk orders&quot; and we&apos;ll send details.
              </p>
            </details>
            <details>
              <summary>What&apos;s your returns policy?</summary>
              <p>
                If a kit arrives damaged or incomplete, message us within 7 days and we&apos;ll make
                it right. As kits contain consumable materials, we&apos;re unable to accept returns
                once opened.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
