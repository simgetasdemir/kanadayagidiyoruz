import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fontlar yalnızca burada tanımlanır (DESIGN.md, bölüm 1).
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["200", "800"],
  display: "swap",
  adjustFontFallback: false,
});

const body = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "800"],
  display: "swap",
  adjustFontFallback: false,
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "kanadayagidiyoruz | Kanada'da lise ve dil programları için danışmanlık",
  description:
    "Kanada'da lise, İngilizce ve Fransızca dil programları için okul seçimi, başvuru, karşılama ve ilk ay desteği. İstanbul'da biz, Ottawa'da öğretmen ortağımız.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} ${mono.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
