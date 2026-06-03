"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function ContactForm() {
  const { toast } = useCart();
  const [sent, setSent] = useState(false);

  return (
    <form
      id="contactForm"
      className="contact-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        setSent(true);
        toast("Message sent — thank you, we'll be in touch");
      }}
    >
      <div className="field">
        <label htmlFor="cname">Name</label>
        <input id="cname" name="name" type="text" required placeholder="Your name" />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cemail">Email</label>
          <input id="cemail" name="email" type="email" required placeholder="you@email.com" />
        </div>
        <div className="field">
          <label htmlFor="cphone">
            Phone <span className="opt">(optional)</span>
          </label>
          <input id="cphone" name="phone" type="tel" placeholder="03XX XXXXXXX" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="ctopic">What&apos;s this about?</label>
        <select id="ctopic" name="topic">
          <option>A question about a kit</option>
          <option>Gift orders</option>
          <option>Bulk &amp; corporate orders</option>
          <option>Workshops &amp; events</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cmsg">Message</label>
        <textarea id="cmsg" name="message" rows={5} required placeholder="Tell us a little more…" />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Send message
      </button>
      <p className="form-note" id="formNote" hidden={!sent}>
        Thank you — we&apos;ll be in touch within one working day.
      </p>
    </form>
  );
}
