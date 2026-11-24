"use client";

import { PROGRAMS, TIMES, validate, type AppointmentInput } from "@/lib/form";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import { useState, type ReactNode } from "react";
import { Button } from "./ui/button";

const STATIC = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

const EMPTY: AppointmentInput = {
  adSoyad: "",
  telefon: "",
  eposta: "",
  kimIcin: "Çocuğum için",
  program: "",
  sinif: "",
  zaman: "",
  not: "",
  kvkk: false,
};

const field =
  "h-12 w-full rounded-2xl border border-ink/15 bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-maple";

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[14px] font-medium text-ink">
      {children}
    </label>
  );
}

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-[13px] text-maple">{msg}</p> : null;
}

export function AppointmentForm() {
  const [v, setV] = useState<AppointmentInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = <K extends keyof AppointmentInput>(k: K, val: AppointmentInput[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    if (STATIC) {
      setState("done");
      return;
    }
    try {
      const res = await fetch("/api/randevu", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (data.errors) setErrors(data.errors);
      setState(data.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-start rounded-3xl border border-line bg-white p-8">
        <span className="grid size-11 place-items-center rounded-full bg-maple-soft text-maple">
          <IconCheck size={22} stroke={2} />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Talebiniz bize ulaştı</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
          Bir iş günü içinde {v.eposta} adresine ya da telefonla dönüp görüşme saatini netleştireceğiz.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => { setV(EMPTY); setState("idle"); }}>
          Yeni form
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="adSoyad">Ad soyad</Label>
          <input id="adSoyad" className={cn(field, "mt-2")} value={v.adSoyad} onChange={(e) => set("adSoyad", e.target.value)} autoComplete="name" />
          <Err msg={errors.adSoyad} />
        </div>
        <div>
          <Label htmlFor="telefon">Telefon</Label>
          <input id="telefon" type="tel" inputMode="tel" placeholder="05xx xxx xx xx" className={cn(field, "mt-2")} value={v.telefon} onChange={(e) => set("telefon", e.target.value)} autoComplete="tel" />
          <Err msg={errors.telefon} />
        </div>
        <div>
          <Label htmlFor="eposta">E-posta</Label>
          <input id="eposta" type="email" className={cn(field, "mt-2")} value={v.eposta} onChange={(e) => set("eposta", e.target.value)} autoComplete="email" />
          <Err msg={errors.eposta} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-[14px] font-medium text-ink">Kim için soruyorsunuz?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {["Çocuğum için", "Kendim için"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => set("kimIcin", opt)}
                aria-pressed={v.kimIcin === opt}
                className={cn(
                  "h-12 rounded-2xl border text-[15px] font-semibold transition-colors",
                  v.kimIcin === opt ? "border-maple bg-maple-soft text-maple" : "border-ink/15 bg-white text-ink hover:border-ink/30",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <Label htmlFor="program">İlgilendiğiniz program</Label>
          <select id="program" className={cn(field, "mt-2 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%2357524c%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')] bg-[position:right_16px_center] bg-no-repeat pr-10")} value={v.program} onChange={(e) => set("program", e.target.value)}>
            <option value="">Seçin</option>
            {PROGRAMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <Err msg={errors.program} />
        </div>
        <div>
          <Label htmlFor="sinif">Öğrencinin sınıfı ya da yaşı</Label>
          <input id="sinif" placeholder="Örn. 8. sınıf" className={cn(field, "mt-2")} value={v.sinif} onChange={(e) => set("sinif", e.target.value)} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-[14px] font-medium text-ink">Size ne zaman uygun?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("zaman", t)}
                aria-pressed={v.zaman === t}
                className={cn(
                  "h-12 rounded-2xl border text-[15px] font-semibold transition-colors",
                  v.zaman === t ? "border-maple bg-maple-soft text-maple" : "border-ink/15 bg-white text-ink hover:border-ink/30",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <Err msg={errors.zaman} />
        </fieldset>

        <div className="sm:col-span-2">
          <Label htmlFor="not">Eklemek istedikleriniz (isteğe bağlı)</Label>
          <textarea id="not" rows={3} className={cn(field, "mt-2 h-auto py-3 leading-relaxed")} value={v.not} onChange={(e) => set("not", e.target.value)} maxLength={1000} />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink-2">
            <input type="checkbox" checked={v.kvkk} onChange={(e) => set("kvkk", e.target.checked)} className="mt-1 size-4 shrink-0 accent-maple" />
            <span>
              Bilgilerimin yalnızca bu görüşmeyi ayarlamak için kullanılmasını kabul ediyorum.{" "}
              <a href="#kvkk" className="font-medium text-ink underline underline-offset-2">Aydınlatma metni</a>
            </span>
          </label>
          <Err msg={errors.kvkk} />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-3">Görüşme ücretsizdir, sizi hiçbir şeye bağlamaz.</p>
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Gönderiliyor" : "Görüşme talep et"}
        </Button>
      </div>
      {state === "error" ? (
        <p className="mt-4 text-[14px] text-maple">Form şu an gönderilemedi. Birazdan tekrar deneyin.</p>
      ) : null}
    </form>
  );
}
