import { validate, type AppointmentInput } from "@/lib/form";

/*
  Görüşme formu. FORM_WEBHOOK_URL tanımlıysa başvuruyu oraya JSON olarak iletir
  (ör. Google Sheets/Apps Script, Make, Zapier, Formspree). Tanımlı değilse sunucu loguna yazar.
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
  if (hook) {
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
