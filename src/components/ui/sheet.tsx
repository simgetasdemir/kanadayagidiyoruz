"use client";

// shadcn/ui Sheet (Radix Dialog), DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;

export function SheetContent({ className, children, ...props }: ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn("fixed inset-y-0 right-0 z-50 flex w-[min(360px,88vw)] flex-col bg-paper p-6 outline-none", className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-line text-ink outline-none focus-visible:outline-2 focus-visible:outline-brand"
          aria-label="Menüyü kapat"
        >
          <IconX size={20} stroke={1.75} />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
