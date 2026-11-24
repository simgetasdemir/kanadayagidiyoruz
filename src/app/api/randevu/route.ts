import { connection } from "next/server";
import { validate, type AppointmentInput } from "@/lib/form";
import { GOOGLE_FORM_ID, loadQuestions, sendToGoogleForm } from "@/lib/google-form";

/*
  Görüşme formu. FORM_WEBHOOK_URL tanımlıysa başvuruyu oraya JSON olarak iletir
  (ör. Google Sheets/Apps Script, Make, Zapier, Formspree).
  src/lib/google-form.ts doluysa önce Google Forms'a gönderir. Tanımlı değilse sunucu loguna yazar.
*/
export async function POST(request: Request) {
  let body: Partial<AppointmentInput>;
  try {
    body = (await request.json()) as Partial<AppointmentInput>;
  } catch {
    return Response.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const record = {
    ...body,
    not: (body.not ?? "").slice(0, 1000),
    gonderim: new Date().toISOString(),
  };

  const hook = process.env.FORM_WEBHOOK_URL;
  if (GOOGLE_FORM_ID) {
    let ok = false;
    let detail = "";
    try {
      ({ ok, detail } = await sendToGoogleForm(record));
    } catch (e) {
      detail = e instanceof Error ? e.message : String(e);
    }
    if (!ok) {
      console.error("[randevu] Google Form:", detail);
      console.log("[randevu] kaydedilemedi", JSON.stringify(record));
      return Response.json({ ok: false, error: "Kayıt iletilemedi" }, { status: 502 });
    }
  } else if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) return Response.json({ ok: false, error: "Kayıt iletilemedi" }, { status: 502 });
  } else {
    console.log("[randevu]", JSON.stringify(record));
  }

  return Response.json({ ok: true });
}

// Kontrol: formun okunup okunamadığını ve sorularını gösterir (kişisel veri içermez).
export async function GET() {
  await connection();
  try {
    const questions = await loadQuestions(true);
    return Response.json({
      form: "okundu",
      soruSayisi: questions.length,
      sorular: questions.map((q) => ({
        baslik: q.title,
        tur: q.type === 0 ? "kısa yanıt" : q.type === 1 ? "paragraf" : `seçmeli (${q.options.join(", ")})`,
        zorunlu: q.required,
      })),
    });
  } catch (e) {
    return Response.json({ form: "okunamadı", hata: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
