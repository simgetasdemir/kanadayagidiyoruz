import type { AppointmentInput } from "@/lib/form";

/*
  Görüşme formu başvurularını Google Forms'a iletir (yanıtlar formun bağlı olduğu E-Tablo'ya düşer).
  Sadece formun herkese açık kimliği gerekir; sorular (entry.*) formun sayfasından çalışma anında
  okunur ve başlıklarıyla eşleştirilir. Bu kimlik gizli bilgi değildir.
  Kontrol: GET /api/randevu formun okunup okunamadığını ve soruları gösterir.
*/
export const GOOGLE_FORM_ID = "1FAIpQLSfcTM5EP5aDFeTk-tzcY0vjDqji7dIYHkBU4SjcrqC3jz3SIw";
const BASE = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}`;
const UA = "Mozilla/5.0 (compatible; kanadayagidiyoruz-form/1.0)";

export type Question = { title: string; entry: string; type: number; options: string[]; required: boolean };

const LABELS: Record<keyof AppointmentInput, string> = {
  adSoyad: "Ad Soyad",
  telefon: "Telefon",
  eposta: "E-posta",
  kimIcin: "Kim için",
  program: "Program",
  sinif: "Sınıf",
  zaman: "Uygun zaman",
  not: "Not",
  kvkk: "KVKK onayı",
};

// 0 kısa yanıt, 1 paragraf: her metni kabul eder.
const isText = (q: Question) => q.type === 0 || q.type === 1;

const norm = (s: string) =>
  s
    .replace(/İ/g, "i")
    .replace(/ı/g, "i")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

let cache: { at: number; questions: Question[] } | null = null;

export async function loadQuestions(fresh = false): Promise<Question[]> {
  if (!fresh && cache && Date.now() - cache.at < 5 * 60 * 1000) return cache.questions;
  const res = await fetch(`${BASE}/viewform`, { cache: "no-store", headers: { "user-agent": UA, "accept-language": "tr" } });
  if (!res.ok) throw new Error(`Form sayfası açılmadı (HTTP ${res.status}, ${res.url})`);
  const html = await res.text();
  const m = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*([\s\S]*?);\s*<\/script>/);
  if (!m) throw new Error(`Form verisi bulunamadı (${res.url}). Form giriş istiyor ya da yanıt kabul etmiyor olabilir.`);
  const data = JSON.parse(m[1]);
  const items: unknown[] = data?.[1]?.[1] ?? [];
  const questions: Question[] = [];
  for (const it of items) {
    const item = it as [unknown, string | null, unknown, number, [number, [unknown[]] | null, number][] | null];
    const field = item?.[4]?.[0];
    if (!field || field[0] == null) continue;
    questions.push({
      title: String(item[1] ?? ""),
      entry: String(field[0]),
      type: Number(item[3]),
      options: (field[1] ?? []).map((o) => String(o?.[0] ?? "")).filter(Boolean),
      required: field[2] === 1,
    });
  }
  cache = { at: Date.now(), questions };
  return questions;
}

const display = (k: keyof AppointmentInput, v: unknown) =>
  k === "kvkk" ? (v ? "Evet" : "Hayır") : v == null ? "" : String(v);

export async function sendToGoogleForm(record: Partial<AppointmentInput>): Promise<{ ok: boolean; detail: string }> {
  const questions = await loadQuestions();
  if (!questions.length) return { ok: false, detail: "Formda soru yok" };

  const params = new URLSearchParams();
  const used = new Set<string>();
  const leftover: string[] = [];

  for (const key of Object.keys(LABELS) as (keyof AppointmentInput)[]) {
    const text = display(key, record[key]);
    const q = questions.find((x) => !used.has(x.entry) && norm(x.title) === norm(LABELS[key]));
    const fits = q && (isText(q) || q.options.some((o) => norm(o) === norm(text)));
    if (q && fits) {
      used.add(q.entry);
      const opt = isText(q) ? text : q.options.find((o) => norm(o) === norm(text))!;
      params.append(`entry.${q.entry}`, opt);
    } else if (text) {
      leftover.push(`${LABELS[key]}: ${text}`);
    }
  }

  // Karşılığı olmayan bilgiler kaybolmasın: boş kalan ilk metin sorusuna yazılır.
  if (leftover.length) {
    const target =
      questions.find((x) => isText(x) && !used.has(x.entry)) ?? questions.find((x) => isText(x));
    if (!target) return { ok: false, detail: "Formda metin sorusu yok (hepsi çoktan seçmeli)" };
    const prev = params.get(`entry.${target.entry}`);
    params.set(`entry.${target.entry}`, [prev, ...leftover].filter(Boolean).join("\n"));
    used.add(target.entry);
  }

  // Doldurulmamış zorunlu sorular.
  for (const q of questions) {
    if (!q.required || used.has(q.entry)) continue;
    if (isText(q)) params.set(`entry.${q.entry}`, "-");
    else if (q.options[0]) params.set(`entry.${q.entry}`, q.options[0]);
  }

  const res = await fetch(`${BASE}/formResponse`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": UA },
    body: params.toString(),
    redirect: "manual",
  });
  return { ok: res.status < 400, detail: `formResponse HTTP ${res.status}` };
}
