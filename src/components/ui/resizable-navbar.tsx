"use client";

// Aceternity UI "Resizable Navbar" deseninden uyarlandı (motion/react).
// Kaydırılmamışken header, sayfayla aynı kapsayıcıyı kullanır (max-w-6xl, px-6 / sm:px-8);
// logo ve bölüm başlıkları aynı sol kenarda durur. Mobil menü: shadcn Sheet.
import { cn } from "@/lib/utils";
import { IconMenu2 } from "@tabler/icons-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { buttonClass } from "./button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./sheet";

export type NavItem = { name: string; link: string };

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <a href="#top" className={cn("flex h-10 shrink-0 items-center gap-2", className)} aria-label="kanadayagidiyoruz ana sayfa">
      <svg viewBox="0 0 40 32" className="h-8 w-10" aria-hidden="true">
        <circle cx="14" cy="16" r="12" fill="var(--brand)" />
        <circle cx="26" cy="16" r="12" fill="none" stroke={light ? "var(--paper)" : "var(--ink)"} strokeWidth="2" />
      </svg>
      <span className={cn("text-[20px] font-bold leading-7 tracking-[-0.01em]", light ? "text-paper" : "text-ink")}>kanadayagidiyoruz</span>
    </a>
  );
}

export function ResizableNavbar({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-4">
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-4 rounded-full transition-[max-width,padding,background-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "w-[calc(100%-32px)] max-w-[960px] bg-paper/90 px-4 shadow-[0_0_0_1px_var(--line),var(--shadow-float)] backdrop-blur-md"
            : "w-full max-w-6xl bg-transparent px-6 shadow-[0_0_0_1px_transparent] sm:px-8",
        )}
      >
        <Logo light={!scrolled} />

        <nav className="hidden h-10 items-center lg:flex" aria-label="Ana menü">
          {items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className={cn("flex h-10 items-center rounded-full px-4 t-body transition-colors", scrolled ? "text-ink hover:bg-surface" : "text-paper hover:bg-paper/15")}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex h-10 items-center gap-2">
          <a href={cta.link} className={buttonClass("primary", "sm", "hidden sm:inline-flex")}>
            {cta.name}
          </a>
          <Sheet>
            <SheetTrigger
              className={cn("grid size-10 place-items-center rounded-full border outline-none focus-visible:outline-2 focus-visible:outline-brand lg:hidden", scrolled ? "border-line bg-paper text-ink" : "border-paper/60 bg-transparent text-paper")}
              aria-label="Menüyü aç"
            >
              <IconMenu2 size={20} stroke={1.75} />
            </SheetTrigger>
            <SheetContent aria-describedby={undefined}>
              <SheetTitle className="sr-only">Menü</SheetTitle>
              <Logo />
              <nav className="mt-10 flex flex-col border-t border-line" aria-label="Mobil menü">
                {items.map((item) => (
                  <SheetClose asChild key={item.link}>
                    <a href={item.link} className="flex h-14 items-center border-b border-line t-title text-ink">
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <a href={cta.link} className={buttonClass("primary", "md", "mt-auto w-full")}>
                  {cta.name}
                </a>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
