"use client";

// Aceternity UI "Card Hover Effect" deseninden uyarlandı:
// imlecin üzerinde olduğu kartın arkasına kayan yumuşak bir zemin.
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

export type HoverItem = { title: string; description: string; meta?: string; icon?: ReactNode };

export function HoverEffect({ items, className }: { items: HoverItem[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative block h-full p-2"
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === idx ? (
              <motion.span
                layoutId="hover-bg"
                className="absolute inset-0 block rounded-[28px] bg-maple-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            ) : null}
          </AnimatePresence>
          <div className="relative z-10 flex h-full flex-col rounded-3xl border border-line bg-white p-7">
            {item.icon ? (
              <span className="grid size-11 place-items-center rounded-2xl bg-paper-2 text-maple">{item.icon}</span>
            ) : null}
            <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{item.description}</p>
            {item.meta ? <p className="mt-auto pt-6 text-[14px] font-medium text-ink-3">{item.meta}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
