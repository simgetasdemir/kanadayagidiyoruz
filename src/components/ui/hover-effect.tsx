"use client";

// Aceternity UI "Card Hover Effect" deseninden uyarlandı.
// DESIGN.md: yan yana üç kart yasak, bu yüzden öğeler alt alta satır olarak dizilir;
// imlecin üzerindeki satırın arkasına yumuşak bir zemin kayar.
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

export type HoverItem = {
  title: string;
  description: string;
  meta?: string;
  icon?: ReactNode;
  visual?: { big: string; small: string };
  href?: string;
};

export function HoverEffect({ items, className }: { items: HoverItem[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item, idx) => (
        <li
          key={item.title}
          className="relative border-b border-line"
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === idx ? (
              <motion.span
                layoutId="hover-row"
                className="absolute inset-x-0 inset-y-2 block rounded-lg bg-surface md:-inset-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            ) : null}
          </AnimatePresence>
          <a
            href={item.href ?? "#gorusme"}
            className="relative z-10 grid gap-4 py-10 md:grid-cols-[192px_1fr] md:items-start md:gap-8"
          >
            {item.visual ? (
              <div>
                <p className="text-[36px] font-bold leading-[44px] text-brand">
                  {item.visual.big}
                </p>
                <p className="mt-2 t-label text-muted">{item.visual.small}</p>
              </div>
            ) : null}
            <div className="max-w-xl">
              <h3 className="flex items-center gap-2 t-title">
                {item.icon ? <span className="text-brand">{item.icon}</span> : null}
                {item.title}
              </h3>
              <p className="mt-2 t-body text-muted">{item.description}</p>
              {item.meta ? (
                <p className="mt-4 flex items-center gap-2 t-body font-bold text-ink">
                  {item.meta}
                  <IconArrowRight
                    size={20}
                    stroke={2}
                    className={cn("shrink-0 transition-transform", hovered === idx ? "translate-x-1 text-brand" : "text-muted")}
                  />
                </p>
              ) : null}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
