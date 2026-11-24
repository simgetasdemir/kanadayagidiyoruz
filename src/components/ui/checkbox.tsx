"use client";

// shadcn/ui Checkbox (Radix), DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-sm border border-line bg-paper outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-paper",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <IconCheck size={16} stroke={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
