"use client";

import { PROGRAMS, TIMES, validate, type AppointmentInput } from "@/lib/form";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

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

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-2 t-body text-brand">{msg}</p> : null;
}

export function AppointmentForm() {
  const [v, setV] = useState<AppointmentInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = <K extends keyof AppointmentInput>(k: K, val: AppointmentInput[K]) => setV((p) => ({ ...p, [k]: val }));

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
      <div className="flex flex-col items-start rounded-lg border border-line bg-paper p-8">
        <span className="grid size-12 place-items-center rounded-full bg-brand text-paper">
          <IconCheck size={24} stroke={2.5} />
        </span>
        <h3 className="mt-6 t-title">Talebiniz bize ulaştı</h3>
        <p className="mt-2 t-body text-muted">
          Bir iş günü içinde {v.eposta} adresine ya da telefonla dönüp görüşme saatini netleştireceğiz.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setV(EMPTY);
            setState("idle");
          }}
        >
          Yeni form
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg border border-line bg-paper p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="adSoyad">Ad soyad</Label>
          <Input id="adSoyad" className="mt-2" value={v.adSoyad} onChange={(e) => set("adSoyad", e.target.value)} autoComplete="name" aria-invalid={!!errors.adSoyad} />
          <Err msg={errors.adSoyad} />
        </div>
        <div>
          <Label htmlFor="telefon">Telefon</Label>
          <Input id="telefon" type="tel" inputMode="tel" placeholder="05xx xxx xx xx" className="mt-2" value={v.telefon} onChange={(e) => set("telefon", e.target.value)} autoComplete="tel" aria-invalid={!!errors.telefon} />
          <Err msg={errors.telefon} />
        </div>
        <div>
          <Label htmlFor="eposta">E-posta</Label>
          <Input id="eposta" type="email" className="mt-2" value={v.eposta} onChange={(e) => set("eposta", e.target.value)} autoComplete="email" aria-invalid={!!errors.eposta} />
          <Err msg={errors.eposta} />
        </div>

        <div className="sm:col-span-2">
          <p className="t-body font-bold text-ink" id="kim-label">Kim için soruyorsunuz?</p>
          <ToggleGroup
            type="single"
            aria-labelledby="kim-label"
            value={v.kimIcin}
            onValueChange={(val) => val && set("kimIcin", val)}
            className="mt-2 grid-cols-2"
          >
            {["Çocuğum için", "Kendim için"].map((opt) => (
              <ToggleGroupItem key={opt} value={opt}>
                {opt}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
          <Label htmlFor="program">İlgilendiğiniz program</Label>
          <Select value={v.program} onValueChange={(val) => set("program", val)}>
            <SelectTrigger id="program" className="mt-2" aria-invalid={!!errors.program}>
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              {PROGRAMS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Err msg={errors.program} />
        </div>
        <div>
          <Label htmlFor="sinif">Öğrencinin sınıfı ya da yaşı</Label>
          <Input id="sinif" placeholder="Örn. 8. sınıf" className="mt-2" value={v.sinif} onChange={(e) => set("sinif", e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <p className="t-body font-bold text-ink" id="zaman-label">Size ne zaman uygun?</p>
          <ToggleGroup
            type="single"
            aria-labelledby="zaman-label"
            value={v.zaman}
            onValueChange={(val) => set("zaman", val)}
            className="mt-2 sm:grid-cols-3"
          >
            {TIMES.map((t) => (
              <ToggleGroupItem key={t} value={t}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Err msg={errors.zaman} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="not">Eklemek istedikleriniz (isteğe bağlı)</Label>
          <Textarea id="not" rows={3} className="mt-2" value={v.not} onChange={(e) => set("not", e.target.value)} maxLength={1000} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-4">
            <Checkbox id="kvkk" checked={v.kvkk} onCheckedChange={(c) => set("kvkk", c === true)} aria-invalid={!!errors.kvkk} />
            <label htmlFor="kvkk" className="cursor-pointer t-body text-muted">
              Bilgilerimin yalnızca bu görüşmeyi ayarlamak için kullanılmasını kabul ediyorum.{" "}
              <a href="#kvkk" className="text-ink underline underline-offset-4">
                Aydınlatma metni
              </a>
            </label>
          </div>
          <Err msg={errors.kvkk} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-body text-muted">Görüşme ücretsizdir, sizi hiçbir şeye bağlamaz.</p>
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Gönderiliyor" : "Görüşme talep et"}
        </Button>
      </div>
      {state === "error" ? <p className="mt-4 t-body text-brand">Form şu an gönderilemedi. Birazdan tekrar deneyin.</p> : null}
    </form>
  );
}
