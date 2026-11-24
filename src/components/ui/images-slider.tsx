"use client";

// Aceternity UI "Images Slider" bileşeninden uyarlandı: tam genişlik fotoğraf, koyu örtü,
// otomatik geçiş, oklar ve noktalar. Yazı sola yaslı (DESIGN.md: ortalanmış hero yok).
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

export type Slide = { image: string; alt: string; content: ReactNode };

export function ImagesSlider({ slides, interval = 6000, className }: { slides: Slide[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [next, interval, paused]);

  useEffect(() => {
    // İlk açılışta tüm görselleri önceden yükle
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, [slides]);

  const slide = slides[index];

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-ink", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />
      </AnimatePresence>
      {/* Okunabilirlik için tek renk (ink) örtü */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="relative h-full"
          aria-live="polite"
        >
          {slide.content}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={prev}
        aria-label="Önceki"
        className="absolute left-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-paper/70 text-paper transition-colors hover:bg-paper hover:text-ink lg:grid"
      >
        <IconChevronLeft size={24} stroke={2} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Sonraki"
        className="absolute right-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-paper/70 text-paper transition-colors hover:bg-paper hover:text-ink lg:grid"
      >
        <IconChevronRight size={24} stroke={2} />
      </button>

      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}. görsel`}
            aria-current={i === index}
            className={cn("h-2 rounded-full transition-all", i === index ? "w-8 bg-paper" : "w-2 bg-paper/50 hover:bg-paper/80")}
          />
        ))}
      </div>
    </div>
  );
}
