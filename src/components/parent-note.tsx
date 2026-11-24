// "Yanınızda" bölümündeki örnek aylık veli notu, telefon ekranı görünümünde.
import { IconCheck } from "@tabler/icons-react";

export function ParentNote() {
  return (
    <div className="relative mx-auto w-full max-w-[344px]" aria-label="Örnek aylık veli notu">
      <div className="rounded-[48px] border border-paper/20 bg-ink/30 p-2">
        <div className="overflow-hidden rounded-[40px] bg-paper">
          <div className="flex h-8 items-center justify-center">
            <span className="h-2 w-16 rounded-full bg-line" />
          </div>
          <div className="px-6 pb-8">
            <p className="t-label text-muted">Veli notu · Ekim</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-full bg-accent t-label text-paper">OT</span>
              <div>
                <p className="t-body font-bold text-ink">Ottawa&apos;daki öğretmeniniz</p>
                <p className="t-label normal-case tracking-normal text-muted">Ayda bir</p>
              </div>
            </div>
            <p className="mt-4 rounded-md border border-line p-4 t-body text-ink">
              Bu ay iki dersine girdim ve sınıf öğretmeniyle görüştüm. Derslere düzenli katılıyor, İngilizcede belirgin
              ilerleme var. Homestay ailesini de ziyaret ettim.
            </p>
            <ul className="mt-4 grid gap-2">
              {["Devamsızlık yok", "Okul görüşmesi yapıldı", "Homestay ziyareti yapıldı"].map((t) => (
                <li key={t} className="flex items-center gap-2 t-body text-ink">
                  <span className="grid size-6 place-items-center rounded-full bg-brand text-paper">
                    <IconCheck size={14} stroke={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center t-label text-muted">Örnek görünüm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
