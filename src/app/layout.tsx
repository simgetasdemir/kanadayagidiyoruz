import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

// Tek font ailesi, yalnızca burada tanımlanır (DESIGN.md, bölüm 1).
const sans = Noto_Sans({
  variable: "--font-site",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "kanadayagidiyoruz | Kanada'da lise ve dil programları için danışmanlık",
  description:
    "Kanada'da lise, İngilizce ve Fransızca dil programları için okul seçimi, başvuru, karşılama ve ilk ay desteği. İstanbul'da biz, Kanada'da diploma koordinatörlerimiz.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
