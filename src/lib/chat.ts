/*
  Okul asistanı: kurallı (LLM yok), bu yüzden konu dışına çıkamaz.
  Yalnızca okul seçimi ve ücretsiz görüşme ayarlama konusunda yardım eder.
  Vize / öğrenci izni sorularına tavsiye vermez; lisanslı danışmana (RCIC) yönlendirir.
*/

export type ChatOption = { label: string; action: string };
export type ChatReply = { reply: string; options: ChatOption[]; goToForm?: boolean };
export type ChatRequest = { action?: string; message?: string };

const MAIN: ChatOption[] = [
  { label: "Lise", action: "lise" },
  { label: "İngilizce dil programı", action: "ingilizce" },
  { label: "Fransızca dil programı", action: "fransizca" },
  { label: "Yüksek lisans ve sınavlar", action: "yukseklisans" },
  { label: "Görüşme ayarla", action: "randevu" },
];

const AFTER: ChatOption[] = [
  { label: "Görüşme ayarla", action: "randevu" },
  { label: "Başka bir konu", action: "start" },
];

const VISA_REPLY =
  "Vize ve öğrenci izni konusunda tavsiye veremiyorum. Kanada'da bu konuda danışmanlığı yalnızca lisanslı göçmenlik danışmanları (RCIC) ve avukatlar verebilir. Okul kaydı tamamlandığında sizi anlaşmalı lisanslı bir danışmana yönlendiriyoruz. Okul seçimi ya da görüşme konusunda yardımcı olabilirim.";

// Kelime başı eşleşir: "vize" -> "vizesi", "vizem"...
const VISA_STEMS = [
  "vize", "visa", "permit", "ircc", "biyometri", "oturum", "göç", "goc", "kalıcı", "kalici",
  "vatandaşlık", "vatandaslik", "reddedil", "sığınma", "iltica", "pasaport", "caq", "immigration",
];
// Tam kelime eşleşir.
const VISA_EXACT = ["eta", "pr", "ret", "red", "rcic"];
const VISA_PHRASES = ["öğrenci izni", "ogrenci izni", "çalışma izni", "calisma izni", "giriş izni"];

function isVisaQuestion(text: string) {
  if (VISA_PHRASES.some((p) => text.includes(p))) return true;
  const tokens = text.split(/[^a-zçğıöşüâîû0-9]+/).filter(Boolean);
  return tokens.some((t) => VISA_EXACT.includes(t) || VISA_STEMS.some((s) => t.startsWith(s)));
}

const FLOWS: Record<string, ChatReply> = {
  start: {
    reply:
      "Merhaba. Kanada'da okul seçimi ve 15 dakikalık ücretsiz görüşme ayarlamak için buradayım. Hangi program ilginizi çekiyor?",
    options: MAIN,
  },
  lise: {
    reply: "Öğrenci şu an kaçıncı sınıfta?",
    options: [
      { label: "7. veya 8. sınıf", action: "lise_erken" },
      { label: "9. veya 10. sınıf", action: "lise_orta" },
      { label: "11. veya 12. sınıf", action: "lise_son" },
    ],
  },
  lise_erken: {
    reply:
      "Bu yaş için en iyi zaman hazırlık zamanı. Kanada'da devlet liseleri giriş sınavı istemiyor; son iki yılın not ortalaması ve İngilizce seviyesi önemli. Görüşmede çocuğunuzun notlarına ve bütçenize göre 9. sınıf için Ottawa ve Toronto bölgesinden okul kurulları öneriyoruz.",
    options: AFTER,
  },
  lise_orta: {
    reply:
      "9. ve 10. sınıf, Kanada'da diploma almak için uygun dönem. Ottawa'da ortağımız okulu ve homestay ailesini yerinde görebiliyor. Bilgi için: Ottawa Catholic School Board'un 2026–27 yıllık harcı 15.300 CAD, homestay ayrıca ücretlendiriliyor.",
    options: AFTER,
  },
  lise_son: {
    reply:
      "11. ve 12. sınıfta diploma için süre kısalıyor, bu yüzden genelde bir dönemlik ya da bir yıllık okul deneyimi öneriyoruz. Üniversite planı varsa onu da görüşmede birlikte değerlendiririz.",
    options: AFTER,
  },
  ingilizce: {
    reply: "Ne kadar süre düşünüyorsunuz?",
    options: [
      { label: "4–12 hafta", action: "ing_kisa" },
      { label: "3–6 ay", action: "ing_uzun" },
      { label: "Henüz bilmiyorum", action: "randevu" },
    ],
  },
  ing_kisa: {
    reply:
      "Kısa programlar için Ottawa ve Montreal iyi başlangıç. Ottawa'da üniversite bünyesindeki dil programları var, Montreal'de ise aynı okulda İngilizce ve Fransızcayı birlikte seçmek mümkün. Yaz dönemi kayıtları genelde ocak–mart arasında doluyor.",
    options: AFTER,
  },
  ing_uzun: {
    reply:
      "3–6 aylık programlarda Toronto ve Ottawa'da daha fazla seçenek var. Gitmeden önce ortağımızla kısa bir İngilizce seviye görüşmesi yapıyoruz; böylece doğru seviyeden başlıyorsunuz.",
    options: AFTER,
  },
  fransizca: {
    reply:
      "Fransızca için Montreal ve Quebec City'ye bakıyoruz. Quebec City'de gündelik hayat tamamen Fransızca, bu yüzden dili hızlı ilerletmek isteyenlere uygun. Montreal daha karma; İngilizce ve Fransızcayı birlikte seçebilirsiniz. İlk aşamada 4–12 haftalık programları öneriyoruz.",
    options: AFTER,
  },
  yukseklisans: {
    reply:
      "Yüksek lisans için okul listesi, başvuru yazıları (niyet mektubu, özgeçmiş) ve IELTS ya da Duolingo için doğru kaynağa yönlendirme konusunda yardımcı oluyoruz. Görüşmede alanınızı ve hedef tarihinizi konuşalım.",
    options: AFTER,
  },
  sehirler: {
    reply:
      "Ortağımız Ottawa'da yaşıyor. Montreal arabayla yaklaşık 2 saat, Toronto 4–5 saat. Ottawa ve Toronto İngilizce, Quebec City Fransızca, Montreal ikisi birden için uygun.",
    options: MAIN,
  },
  fiyat: {
    reply:
      "Okul ücretleri okulun resmi fiyatıdır, üzerine ekleme yapmıyoruz. Örneğin Ottawa Catholic School Board'un 2026–27 lise harcı yıllık 15.300 CAD. Bizim hizmet ücretimiz seçtiğiniz pakete göre değişiyor ve görüşmeden sonra yazılı olarak veriliyor.",
    options: AFTER,
  },
  randevu: {
    reply:
      "15 dakikalık ücretsiz görüşme için kısa bir form var. Doldurduğunuzda bir iş günü içinde size uygun saati yazıyoruz.",
    options: [
      { label: "Forma git", action: "form" },
      { label: "Başka bir konu", action: "start" },
    ],
  },
  form: { reply: "Formu açtım. Görüşmede görüşmek üzere.", options: [{ label: "Baştan başla", action: "start" }], goToForm: true },
  visa: { reply: VISA_REPLY, options: AFTER },
  fallback: {
    reply:
      "Bu konuda yardımcı olamıyorum; ben yalnızca okul seçimi ve ücretsiz görüşme ayarlama için buradayım. Aşağıdakilerden birini seçebilirsiniz.",
    options: MAIN,
  },
};

const KEYWORDS: [string, string[]][] = [
  ["fiyat", ["fiyat", "ücret", "ucret", "kaç para", "kac para", "maliyet", "harç", "harc", "tutar", "pahalı"]],
  ["randevu", ["randevu", "görüşme", "gorusme", "görüşmek", "aramak", "ara beni", "iletişim", "telefon"]],
  ["lise", ["lise", "high school", "sınıf", "sinif", "çocuğum", "cocugum", "oğlum", "kızım", "vasi", "homestay"]],
  ["fransizca", ["fransız", "fransiz", "french", "quebec", "québec"]],
  ["ingilizce", ["ingilizce", "english", "dil programı", "dil okulu", "esl"]],
  ["yukseklisans", ["yüksek lisans", "yuksek lisans", "master", "ielts", "toefl", "duolingo", "üniversite", "universite", "college"]],
  ["sehirler", ["şehir", "sehir", "ottawa", "toronto", "montreal", "nerede"]],
];

export function answer(req: ChatRequest): ChatReply {
  if (req.action && FLOWS[req.action]) return FLOWS[req.action];

  const text = ` ${(req.message ?? "").toLocaleLowerCase("tr").trim()} `;
  if (!text.trim()) return FLOWS.start;

  // Vize kontrolü her şeyden önce gelir.
  if (isVisaQuestion(text)) return FLOWS.visa;

  for (const [flow, words] of KEYWORDS) {
    if (words.some((w) => text.includes(w))) return FLOWS[flow];
  }
  if (/^\s*(merhaba|selam|iyi günler|hey)\b/.test(text)) return FLOWS.start;
  return FLOWS.fallback;
}
