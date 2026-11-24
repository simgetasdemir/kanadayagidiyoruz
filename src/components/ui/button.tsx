import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

/*
  Sitedeki tüm butonlar buradan gelir:
  aynı yükseklik, aynı 1px kenarlık, aynı font ağırlığı (600), aynı köşe.
  Varyantlar sadece rengi değiştirir.
*/
type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-semibold leading-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maple disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "border-maple bg-maple text-white hover:border-maple-dark hover:bg-maple-dark",
  secondary: "border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-paper-2",
  ghost: "border-transparent bg-transparent text-ink hover:bg-paper-2",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[15px]",
  sm: "h-10 px-5 text-[14px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return <a className={buttonClass(variant, size, className)} {...props} />;
}
