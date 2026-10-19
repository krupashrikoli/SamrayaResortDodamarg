"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SAMRAYA_OPENING_SOON } from "@/lib/constants";

export function HeroWordmark() {
  const [visible, setVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      setTaglineVisible(true);
      return;
    }

    const start = window.setTimeout(() => setVisible(true), 180);
    const tagline = window.setTimeout(() => setTaglineVisible(true), 2200);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(tagline);
    };
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0">
      <h1 className="sr-only">SAMRĀYA Opening Soon — Lifestyle & Wellness Resort</h1>

      <div className="absolute left-1/2 top-1/2 w-full max-w-[40rem] -translate-x-1/2 -translate-y-1/2 px-4">
        <div
          className={`hero-wordmark relative mx-auto w-full max-w-[min(78vw,34rem)] ${
            reduceMotion
              ? "hero-wordmark--shown"
              : visible
                ? "hero-wordmark--swipe"
                : "hero-wordmark--hidden"
          }`}
        >
          <Image
            src={SAMRAYA_OPENING_SOON}
            alt="SAMRĀYA Opening Soon"
            width={2169}
            height={725}
            priority
            className="mx-auto h-auto w-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            sizes="(max-width: 768px) 78vw, 544px"
          />
        </div>
      </div>

      <p
        className={`font-tagline absolute left-1/2 top-[calc(50%+14rem)] w-full max-w-[40rem] -translate-x-1/2 px-4 text-center text-[clamp(1rem,2.6vw,1.25rem)] font-medium uppercase leading-[1.5] tracking-[0.22em] text-white/90 antialiased drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)] sm:top-[calc(50%+16rem)] md:top-[calc(50%+18rem)] ${
          reduceMotion || taglineVisible
            ? "hero-tagline hero-tagline--in"
            : "hero-tagline"
        }`}
      >
        Lifestyle &amp; Wellness Resort
      </p>
    </div>
  );
}
