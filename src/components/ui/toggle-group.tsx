"use client";

// shadcn/ui ToggleGroup (Radix), DESIGN.md token'larıyla. Butonlarla aynı yükseklik, kenarlık ve kalınlık.
import { cn } from "@/lib/utils";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export function ToggleGroup({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn("grid gap-2", className)} {...props} />;
}

export function ToggleGroupItem({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "h-12 rounded-full border border-line bg-paper px-4 t-body font-bold text-ink outline-none transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand data-[state=on]:border-brand data-[state=on]:bg-brand-tint data-[state=on]:text-brand",
        className,
      )}
      {...props}
    />
  );
}
