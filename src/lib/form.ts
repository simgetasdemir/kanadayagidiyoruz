export type AppointmentInput = {
  adSoyad: string;
  telefon: string;
  eposta: string;
  kimIcin: string;
  program: string;
  sinif: string;
  zaman: string;
  not: string;
  kvkk: boolean;
};

export const PROGRAMS = [
  "Lise",
  "İngilizce dil programı",
  "Fransızca dil programı",
  "Yüksek lisans",
  "Henüz karar vermedim",
];

export const TIMES = ["Hafta içi gündüz", "Hafta içi akşam", "Hafta sonu"];

export function validate(input: Partial<AppointmentInput>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.adSoyad || input.adSoyad.trim().length < 3) errors.adSoyad = "Adınızı ve soyadınızı yazın.";
  const digits = (input.telefon ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.telefon = "Telefon numarası eksik görünüyor.";
  if (!input.eposta || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.eposta)) errors.eposta = "Geçerli bir e-posta adresi yazın.";
  if (!input.program || !PROGRAMS.includes(input.program)) errors.program = "Bir program seçin.";
  if (!input.zaman || !TIMES.includes(input.zaman)) errors.zaman = "Size uygun zamanı seçin.";
  if (!input.kvkk) errors.kvkk = "Devam etmek için aydınlatma metnini onaylayın.";
  return errors;
}
