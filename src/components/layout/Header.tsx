"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function Header() {
  const { count, openCart } = useCart();
  const [navOpen, setNavOpen] = useState(false);

  // lock body scroll while mobile nav open; escape closes
  useEffect(() => {
    if (navOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNavOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="site-head">
        <nav className="nav wrap" aria-label="Primary">
          <button
            className="burger"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="nav-links">
            <Link href="/shop" className="nav-link">
              Shop
            </Link>
            <Link href="/shop#categories" className="nav-link">
              Categories
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </div>
          <Link href="/" className="brand" aria-label="The Manmal Club home">
            <span className="the">The</span>
            <span className="nm">Manmal</span>
            <span className="club">Club</span>
          </Link>
          <div className="nav-links right">
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            <div className="nav-icons">
              <button className="icon-btn search-btn" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
              <button className="icon-btn" onClick={openCart} aria-label="Open bag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 8h12l-1 12H7L6 8Z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>
                <span className={"cart-count" + (count > 0 ? " show" : "")}>{count}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className={"mobile-nav" + (navOpen ? " open" : "")}>
        <button className="mclose" aria-label="Close menu" onClick={() => setNavOpen(false)}>
          &times;
        </button>
        <ul>
          <li>
            <Link href="/shop" onClick={() => setNavOpen(false)}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/shop#categories" onClick={() => setNavOpen(false)}>
              Categories
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setNavOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setNavOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
