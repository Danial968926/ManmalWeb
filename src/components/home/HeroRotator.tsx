"use client";

import { useEffect, useState } from "react";

const WORDS = ["candles", "resin art", "a canvas", "calm", "something"];

export default function HeroRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="hh-rotator" aria-hidden="true">
      {WORDS.map((w, idx) => (
        <span key={w} className={"rot-word" + (idx === i ? " is-on" : "")}>
          {w}
        </span>
      ))}
    </span>
  );
}
