"use client";

// shadcn/ui Label (Radix), DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import { Label as LabelPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("block t-body font-bold text-ink", className)}
      {...props}
    />
  );
}
