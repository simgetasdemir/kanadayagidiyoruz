# kanadayagidiyoruz

Kanada'da lise ve dil programları için yurtdışı eğitim danışmanlığı sitesi.

- Next.js 16 (App Router, React 19), TypeScript
- Tailwind CSS 4, motion 14 (Aceternity UI bileşenleri bu sürümlerle uyumlu)
- Aceternity UI desenleri: Resizable Navbar, Spotlight, Grid Background, Card Hover Effect, Timeline (`src/components/ui`)
- Tek font: Instrument Sans (Türkçe karakter destekli), tüm butonlar `src/components/ui/button.tsx` içinden

## Backend (Next.js route handlers)

- `POST /api/chat`: okul asistanı. Kurallı çalışır, konu dışına çıkmaz, vize tavsiyesi vermez (`src/lib/chat.ts`).
- `POST /api/randevu`: 15 dakikalık görüşme formu. `FORM_WEBHOOK_URL` tanımlıysa başvuruyu oraya JSON olarak iletir
  (Google Sheets Apps Script, Make, Zapier, Formspree gibi). Tanımlı değilse sunucu loguna yazar.

## Çalıştırma

```
npm install
npm run dev
```

Yayın için en kolay yol: GitHub'a yükleyip Vercel'e bağlamak. Vercel'de ortam değişkeni olarak `FORM_WEBHOOK_URL` eklenir.

## Doldurulması gerekenler

- İletişim e-postası ve Instagram hesabı (footer, `src/app/page.tsx`)
- Paket ücretleri (şu an "görüşmeden sonra yazılı" deniyor)
- KVKK aydınlatma metninin tam hali
