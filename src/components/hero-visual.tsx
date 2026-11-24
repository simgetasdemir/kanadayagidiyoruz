"use client";

// Giriş görseli: uçuş kartı, varışta gelen mesaj ve ilk hafta listesi.
// Aceternity UI "3D Card" deseninden uyarlandı (fareyle hafif eğilme).
import { IconCheck, IconPlaneDeparture } from "@tabler/icons-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

function Float({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, delay: delay + 0.8, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

const card = "rounded-lg border border-line bg-paper shadow-float";

export function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto w-full max-w-[480px] [perspective:1200px] sm:aspect-[5/5.2]"
      aria-hidden="true"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative flex flex-col gap-4 px-4 py-8 [transform-style:preserve-3d] sm:absolute sm:inset-0 sm:block sm:p-0">
        {/* Renk alanı: tek baskın renk */}
        <div className="absolute inset-x-6 inset-y-4 overflow-hidden rounded-lg bg-brand">
          <svg viewBox="0 0 400 420" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="var(--paper)" opacity="0.18" />
              </pattern>
            </defs>
            <rect width="400" height="420" fill="url(#hero-dots)" />
            <path d="M-20 330 C 90 250, 160 330, 250 220 S 380 120, 430 60" fill="none" stroke="var(--paper)" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
          </svg>
        </div>

        {/* Uçuş kartı */}
        <Float delay={0.1} className="relative w-full [transform:translateZ(40px)] sm:absolute sm:left-0 sm:top-[8%] sm:w-[78%]">
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between t-label text-muted">
              <span>Uçuş kartı</span>
              <span>Ağustos</span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-display text-[48px] font-extrabold leading-[48px] tracking-[-0.03em] text-ink">IST</p>
                <p className="mt-2 t-body text-muted">İstanbul</p>
              </div>
              <div className="mb-8 flex flex-1 items-center gap-2 px-4">
                <span className="h-px flex-1 border-t border-dashed border-line" />
                <IconPlaneDeparture size={20} stroke={1.75} className="text-brand" />
                <span className="h-px flex-1 border-t border-dashed border-line" />
              </div>
              <div className="text-right">
                <p className="font-display text-[48px] font-extrabold leading-[48px] tracking-[-0.03em] text-ink">YOW</p>
                <p className="mt-2 t-body text-muted">Ottawa</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-dashed border-line pt-4">
              <div>
                <p className="t-label text-muted">Program</p>
                <p className="t-body font-extrabold text-ink">Lise, 10. sınıf</p>
              </div>
              <div className="text-right">
                <p className="t-label text-muted">Karşılama</p>
                <p className="t-body font-extrabold text-brand">Var</p>
              </div>
            </div>
          </div>
        </Float>

        {/* Varış mesajı */}
        <Float delay={0.35} className="relative ml-auto w-[88%] [transform:translateZ(70px)] sm:absolute sm:right-0 sm:top-[40%] sm:ml-0 sm:w-[72%]">
          <div className={`${card} p-4`}>
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent t-label text-paper">OT</span>
              <div className="min-w-0">
                <p className="t-body font-extrabold text-ink">Ottawa&apos;daki öğretmeniniz</p>
                <p className="t-label normal-case tracking-normal text-muted">Havalimanı, 16:40</p>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-surface px-4 py-2 t-body text-ink">
              Uçak indi, gelen yolcu çıkışındayım. Valizini alınca sağ tarafta buluşuyoruz.
            </p>
          </div>
        </Float>

        {/* İlk hafta */}
        <Float delay={0.6} className="relative w-[72%] [transform:translateZ(55px)] sm:absolute sm:-bottom-4 sm:left-0 sm:w-[50%]">
          <div className={`${card} p-4`}>
            <p className="t-label text-muted">İlk hafta</p>
            <ul className="mt-2 grid gap-2">
              {(
                [
                  ["Telefon hattı", true],
                  ["Banka hesabı", true],
                  ["Okul kaydı", false],
                ] as const
              ).map(([t, done]) => (
                <li key={t} className="flex items-center gap-2 t-body">
                  <span
                    className={
                      done
                        ? "grid size-6 place-items-center rounded-full bg-brand text-paper"
                        : "size-6 rounded-full border border-dashed border-muted"
                    }
                  >
                    {done ? <IconCheck size={14} stroke={3} /> : null}
                  </span>
                  <span className={done ? "text-ink" : "text-muted"}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Float>
      </motion.div>
    </div>
  );
}
