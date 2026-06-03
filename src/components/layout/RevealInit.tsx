"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ports js/site.js initReveal(): IntersectionObserver adds `.in` to `.reveal`
 * elements as they enter the viewport, with a scroll fallback. Re-runs on route
 * change so freshly-rendered pages animate in.
 */
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    function reveal(el: Element) {
      el.classList.add("in");
      setTimeout(() => el.classList.add("lock"), 760);
    }

    function checkNow() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) reveal(el);
      });
    }

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              reveal(en.target);
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -6% 0px" }
      );
      document.querySelectorAll(".reveal:not(.in)").forEach((e) => io?.observe(e));
    }

    checkNow();
    window.addEventListener("scroll", checkNow, { passive: true });
    window.addEventListener("resize", checkNow);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", checkNow);
      window.removeEventListener("resize", checkNow);
    };
  }, [pathname]);

  return null;
}
