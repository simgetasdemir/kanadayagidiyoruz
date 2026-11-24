import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  invert = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className={cn("t-label", invert ? "text-paper/70" : "text-brand")}>{eyebrow}</p>
      <h2 className={cn("mt-4 t-heading", invert ? "text-paper" : "text-ink")}>{title}</h2>
      {children ? <p className={cn("mt-4 t-lead", invert ? "text-paper/80" : "text-muted")}>{children}</p> : null}
    </div>
  );
}
