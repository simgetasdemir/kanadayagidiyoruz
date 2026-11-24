"use client";

// Aceternity UI "Spotlight" bileşeninden uyarlandı; tek renk (brand), çok düşük yoğunluk.
import { motion } from "motion/react";

export function Spotlight() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -top-40 left-[10%] h-[560px] w-[880px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_8%,transparent),transparent)]" />
    </motion.div>
  );
}
