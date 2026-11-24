// shadcn/ui Input, DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border border-line bg-paper px-4 t-body text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand aria-invalid:border-brand disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
