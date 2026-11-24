// Aceternity UI "Grid and Dot Backgrounds" deseninden uyarlandı.
import { cn } from "@/lib/utils";

export function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 [background-size:48px_48px] [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] opacity-60" />
      <div className="absolute inset-0 bg-paper [mask-image:radial-gradient(ellipse_at_30%_30%,transparent_10%,black_70%)]" />
    </div>
  );
}
