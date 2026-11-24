"use client";

// Aceternity UI "Timeline" bileşeninden uyarlandı: kaydırdıkça dolan dikey çizgi.
import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type TimelineEntry = { step: string; title: string; content: ReactNode };

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 30%", "end 60%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative">
        {data.map((item) => (
          <div key={item.step} className="flex gap-6 pb-12 last:pb-0 md:gap-10">
            <div className="relative z-10 flex w-10 shrink-0 justify-center md:w-64 md:justify-start">
              <div className="md:sticky md:top-32 md:flex md:items-center md:gap-4">
                <span className="grid size-10 place-items-center rounded-full border border-line bg-paper t-label text-brand">
                  {item.step}
                </span>
                <h3 className="hidden t-title md:block">{item.title}</h3>
              </div>
            </div>
            <div className="min-w-0 flex-1 pt-2">
              <h3 className="mb-2 t-title md:hidden">{item.title}</h3>
              <div className="max-w-xl t-body text-muted">{item.content}</div>
            </div>
          </div>
        ))}
        <div style={{ height: height + "px" }} className="absolute left-5 top-0 w-px -translate-x-1/2 overflow-hidden bg-line">
          <motion.div style={{ height: heightTransform }} className="absolute inset-x-0 top-0 w-px bg-brand" />
        </div>
      </div>
    </div>
  );
}
