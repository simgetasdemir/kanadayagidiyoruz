import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-maple">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-[1.15] sm:text-[40px]">{title}</h2>
      {children ? <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{children}</p> : null}
    </div>
  );
}
