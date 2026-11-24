import type { AppointmentInput } from "@/lib/form";

/*
  Görüşme formu başvurularını Google Forms'a iletir (yanıtlar formun bağlı olduğu E-Tablo'ya düşer).
  Sadece formun herkese açık kimliği gerekir; soru numaraları (entry.*) formun sayfasından
  çalışma anında okunur ve soru başlıklarıyla eşleştirilir. Bu kimlik gizli bilgi değildir.
*/
export const GOOGLE_FORM_ID = "1FAIpQLSfcTM5EP5aDFeTk-tzcY0vjDqji7dIYHkBU4SjcrqC3jz3SIw";

type Question = { title: string; entry: string };

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

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]/g, "");

let cache: { at: number; questions: Question[] } | null = null;

async function loadQuestions(): Promise<Question[]> {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return cache.questions;
  const res = await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Form okunamadı (${res.status})`);
  const html = await res.text();
  const m = html.match(/FB_PUBLIC_LOAD_DATA_ = ([\s\S]*?);\s*<\/script>/);
  if (!m) throw new Error("Form verisi bulunamadı");
  const data = JSON.parse(m[1]);
  const items: unknown[] = data?.[1]?.[1] ?? [];
  const questions: Question[] = [];
  for (const it of items) {
    const item = it as [unknown, string, unknown, number, [[number]] | null];
    const entry = item?.[4]?.[0]?.[0];
    if (entry != null) questions.push({ title: String(item[1] ?? ""), entry: String(entry) });
  }
  cache = { at: Date.now(), questions };
  return questions;
}

const display = (k: keyof AppointmentInput, v: unknown) => (k === "kvkk" ? (v ? "Evet" : "Hayır") : v == null ? "" : String(v));

export async function sendToGoogleForm(record: Partial<AppointmentInput>): Promise<boolean> {
  const questions = await loadQuestions();
  if (!questions.length) throw new Error("Formda soru yok");

  const params = new URLSearchParams();
  const leftover: string[] = [];
  const used = new Set<string>();
  for (const key of Object.keys(LABELS) as (keyof AppointmentInput)[]) {
    const q = questions.find((x) => !used.has(x.entry) && norm(x.title) === norm(LABELS[key]));
    const text = display(key, record[key]);
    if (q) {
      used.add(q.entry);
      params.append(`entry.${q.entry}`, text);
    } else if (text) {
      leftover.push(`${LABELS[key]}: ${text}`);
    }
  }
  // Formda karşılığı olmayan alanlar kaybolmasın: boş kalan ilk soruya (yoksa "Not"a) eklenir.
  if (leftover.length) {
    const target = questions.find((x) => !used.has(x.entry)) ?? questions.find((x) => norm(x.title) === "not") ?? questions[0];
    const prev = params.get(`entry.${target.entry}`);
    params.set(`entry.${target.entry}`, [prev, ...leftover].filter(Boolean).join("\n"));
  }

  const res = await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    redirect: "manual",
  });
  return res.status < 400;
}
