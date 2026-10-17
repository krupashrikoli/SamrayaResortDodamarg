"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HeroWordmark } from "@/components/HeroWordmark";
import {
  SAMRAYA_HERO_IMAGE,
  SAMRAYA_HERO_IMAGE_ALT,
} from "@/lib/constants";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(1);
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
      setImageOpacity(1);
      setContentOpacity(1);
      return;
    }

    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const height = section.offsetHeight || window.innerHeight;
      // Hold full opacity for the first half of the hero, then fade over the rest.
      const raw = Math.min(Math.max(window.scrollY / height, 0), 1);
      const fadeProgress = raw <= 0.5 ? 0 : (raw - 0.5) / 0.5;
      const faded = easeOutCubic(fadeProgress);

      setImageOpacity(1 - faded);
      setContentOpacity(1 - Math.min(faded * 1.1, 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white"
    >
      <div
        className="hero-image-shell absolute inset-0 will-change-[opacity,transform]"
        style={{
          opacity: imageOpacity,
          transform: `scale(${1 + (1 - imageOpacity) * 0.04})`,
          transition: reduceMotion ? undefined : "opacity 80ms linear",
        }}
      >
        <Image
          src={SAMRAYA_HERO_IMAGE}
          alt={SAMRAYA_HERO_IMAGE_ALT}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.18)_48%,transparent_78%)]"
          aria-hidden
        />
        <div className="hero-image-edge-fade pointer-events-none absolute inset-0" aria-hidden />
      </div>

      <div
        className="absolute inset-0 z-10 will-change-[opacity,transform]"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${(1 - contentOpacity) * -18}px)`,
          transition: reduceMotion ? undefined : "opacity 80ms linear",
        }}
      >
        <HeroWordmark />
      </div>
    </section>
  );
}
