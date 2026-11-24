// shadcn/ui Textarea, DESIGN.md token'larıyla.
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full rounded-md border border-line bg-paper px-4 py-2 t-body text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand",
        className,
      )}
      {...props}
    />
  );
}
