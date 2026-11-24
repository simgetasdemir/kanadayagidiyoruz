"use client";

// Aceternity UI "Spotlight" bileşeninden uyarlandı; renkler sitenin paletine çekildi.
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
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(184,50,42,0.10),transparent)]" />
      <motion.div
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-40 h-[460px] w-[620px] -rotate-12 rounded-full bg-[radial-gradient(closest-side,rgba(47,74,63,0.08),transparent)]"
      />
    </motion.div>
  );
}
