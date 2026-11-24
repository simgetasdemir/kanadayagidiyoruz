"use client";

// shadcn/ui Separator (Radix), DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import { Separator as SeparatorPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export function Separator({ className, orientation = "horizontal", decorative = true, ...props }: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn("shrink-0 bg-line data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  );
}
