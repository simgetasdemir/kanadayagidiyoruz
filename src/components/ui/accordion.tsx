"use client";

// shadcn/ui Accordion (Radix), DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-line", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-6 border border-transparent py-6 text-left t-lead font-extrabold text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 group-data-[state=open]:rotate-45">
          <IconPlus size={16} stroke={2} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="overflow-hidden" {...props}>
      <div className={cn("pb-6 pr-16 t-body text-muted", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
