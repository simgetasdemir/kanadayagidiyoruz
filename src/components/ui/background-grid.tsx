// Aceternity UI "Grid and Dot Backgrounds" deseninden uyarlandı.
import { cn } from "@/lib/utils";

export function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0 [background-size:44px_44px] [background-image:linear-gradient(to_right,rgba(29,27,25,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,27,25,0.055)_1px,transparent_1px)]"
      />
      <div className="absolute inset-0 bg-paper [mask-image:radial-gradient(ellipse_at_50%_35%,transparent_15%,black_72%)]" />
    </div>
  );
}
