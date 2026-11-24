import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

/*
  Sitedeki tek buton (DESIGN.md, bölüm 5).
  Tüm varyantlar: 1px kenarlık, 800 kalınlık, 48px (md) ya da 40px (sm) yükseklik, tam yuvarlak.
  Varyantlar yalnızca rengi değiştirir.
*/
type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-body text-[16px] leading-6 font-bold transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "border-brand bg-brand text-paper hover:border-brand-ink hover:bg-brand-ink",
  secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  ghost: "border-transparent bg-transparent text-ink hover:bg-surface",
  inverse: "border-paper bg-paper text-ink hover:bg-transparent hover:text-paper",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6",
  sm: "h-10 px-4",
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
