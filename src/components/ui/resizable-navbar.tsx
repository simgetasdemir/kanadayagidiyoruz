"use client";

// Aceternity UI "Resizable Navbar" deseninden uyarlandı (motion/react).
// Header tek satır, tüm öğeler aynı dikey eksende (items-center, sabit yükseklik).
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { buttonClass } from "./button";

export type NavItem = { name: string; link: string };

function Logo() {
  return (
    <a href="#top" className="flex h-10 shrink-0 items-center gap-2.5" aria-label="kanadayagidiyoruz ana sayfa">
      <span className="grid size-8 place-items-center rounded-full bg-maple text-white">
        <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.5l1.6 3.4 2.2-1-0.6 4.4 2.6-2.2.9 1.9 2.4-.4-1 3 1.4.9-4.7 3.9.6 1.8-4.4-.7V21h-1.8v-3.5l-4.4.7.6-1.8L3.7 12.5l1.4-.9-1-3 2.4.4.9-1.9 2.6 2.2-.6-4.4 2.2 1z"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.01em] text-ink">kanadayagidiyoruz</span>
    </a>
  );
}

export function ResizableNavbar({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      {/*
        Kaydırılmamışken header, sayfa içeriğiyle aynı kapsayıcıyı kullanır (max-w-6xl, px-5 / sm:px-8),
        böylece logo ve buton, bölüm başlıklarıyla aynı hizada durur.
        Kenarlık yerine box-shadow halkası kullanılır; genişliği kaydırmaz.
      */}
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-4 rounded-full backdrop-blur-md transition-[max-width,padding,background-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "w-[calc(100%-24px)] max-w-[960px] bg-white/85 px-3 shadow-[0_0_0_1px_rgba(29,27,25,0.08),0_8px_30px_-12px_rgba(29,27,25,0.18)] sm:px-4"
            : "w-full max-w-6xl bg-transparent px-5 shadow-[0_0_0_1px_rgba(29,27,25,0)] backdrop-blur-none sm:px-8",
        )}
      >
        <Logo />

        <nav className="hidden h-10 items-center lg:flex" aria-label="Ana menü">
          {items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="flex h-10 items-center rounded-full px-4 text-[15px] font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex h-10 items-center gap-2">
          <a href={cta.link} className={buttonClass("primary", "sm", "hidden sm:inline-flex")}>
            {cta.name}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-ink/15 bg-white text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <IconX size={20} stroke={1.75} /> : <IconMenu2 size={20} stroke={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 w-[calc(100%-24px)] max-w-[960px] rounded-3xl border border-ink/10 bg-white p-3 shadow-lg lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobil menü">
              {items.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-2xl px-4 text-[16px] font-medium text-ink hover:bg-paper-2"
                >
                  {item.name}
                </a>
              ))}
              <a href={cta.link} onClick={() => setOpen(false)} className={buttonClass("primary", "md", "mt-2 w-full")}>
                {cta.name}
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
