import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "kanadayagidiyoruz | Kanada'da lise ve dil programları için danışmanlık",
  description:
    "Kanada'da lise, İngilizce ve Fransızca dil programları için okul seçimi, başvuru, karşılama ve ilk ay desteği. İstanbul'da biz, Ottawa'da öğretmen ortağımız.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${instrument.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
