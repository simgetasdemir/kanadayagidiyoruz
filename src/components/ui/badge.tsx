// shadcn/ui Badge, DESIGN.md token'larıyla (mono etiket).
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Badge({ className, tone = "line", ...props }: ComponentProps<"span"> & { tone?: "line" | "brand" }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border px-4 t-label",
        tone === "brand" ? "border-brand bg-brand-tint text-brand" : "border-line bg-paper text-ink",
        className,
      )}
      {...props}
    />
  );
}
