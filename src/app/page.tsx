import { AppointmentForm } from "@/components/appointment-form";
import { ChatWidget } from "@/components/chat-widget";
import { CityMap } from "@/components/city-map";
import { ParentNote } from "@/components/parent-note";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/hover-effect";
import { ImagesSlider, type Slide } from "@/components/ui/images-slider";
import { Logo, ResizableNavbar } from "@/components/ui/resizable-navbar";
import { Container, SectionHeading } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import { IconCheck, IconMinus, IconPlaneArrival } from "@tabler/icons-react";

const NAV = [
  { name: "Programlar", link: "#programlar" },
  { name: "Yanınızda", link: "#yaninizda" },
  { name: "Süreç", link: "#surec" },
  { name: "Şehirler", link: "#sehirler" },
  { name: "Paketler", link: "#paketler" },
  { name: "SSS", link: "#sss" },
];
const CTA = { name: "Ücretsiz görüşme", link: "#gorusme" };

function HeroSlide({ city, title, text }: { city: string; title: string; text: string }) {
  return (
    <Container className="flex h-full flex-col justify-center pt-24">
      <div className="max-w-xl">
        <p className="t-label text-paper/80">{city}</p>
        <h1 className="mt-4 t-display text-paper">{title}</h1>
        <p className="mt-4 t-lead text-paper/90">{text}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="#gorusme">15 dakikalık ücretsiz görüşme</ButtonLink>
          <ButtonLink href="#paketler" variant="inverse">
            Paketleri incele
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

const SLIDES: Slide[] = [
  {
    image: "hero/ottawa.jpg",
    alt: "Ottawa'da Parlamento binasına bakan bir öğrenci",
    content: (
      <HeroSlide
        city="Ottawa"
        title="Kanada'da lise: yanında bir koordinatör olsun"
        text="Ottawa'daki diploma koordinatörümüz, okul seçiminden ilk okul gününe kadar öğrencinin yanında."
      />
    ),
  },
  {
    image: "hero/montreal.jpg",
    alt: "Montreal'de Notre-Dame Bazilikası önünde bir öğrenci",
    content: (
      <HeroSlide
        city="Montreal"
        title="Montreal'de İngilizce ve Fransızca"
        text="4 ile 24 hafta arası dil programları. İki dili aynı şehirde, aynı okulda seçebilirsiniz."
      />
    ),
  },
  {
    image: "hero/quebec.jpg",
    alt: "Quebec City'de Château Frontenac'a bakan bir öğrenci",
    content: (
      <HeroSlide
        city="Quebec City"
        title="Quebec City'de Fransızcanızı ilerletin"
        text="Gündelik hayatı tamamen Fransızca olan şehirde kısa dil programları."
      />
    ),
  },
  {
    image: "hero/toronto.jpg",
    alt: "Toronto'da CN Kulesi'ne bakan bir öğrenci",
    content: (
      <HeroSlide
        city="Toronto"
        title="Toronto'da lise ve uzun dil programları"
        text="En geniş okul seçeneği. Başvurudan karşılamaya kadar her adımı biz takip ediyoruz."
      />
    ),
  },
];

const PROGRAMS = [
  {
    title: "Lise",
    description:
      "Kanada devlet liselerinde bir dönem, bir yıl ya da diploma. Okul kurulunu notlara, bütçeye ve öğrencinin ilgisine göre birlikte seçiyoruz.",
    meta: "Ottawa ve Toronto bölgesi",
    visual: { big: "9–12", small: "Sınıf" },
  },
  {
    title: "Dil programları",
    description:
      "İngilizce ya da Fransızca. Kısa programlar yaz tatiline, uzun olanlar üniversite öncesi bir yıla uygun.",
    meta: "Ottawa, Montreal, Quebec City, Toronto",
    visual: { big: "4–24", small: "Hafta" },
  },
  {
    title: "Sınavlar ve yüksek lisans",
    description:
      "IELTS ya da Duolingo için hangi seviyeden başlamanız gerektiğini konuşuyor, doğru kaynağa yönlendiriyoruz. Yüksek lisans başvurusunda okul listesi ve yazılarda yanınızdayız.",
    meta: "Seviye görüşmesi ortağımızla, online",
    visual: { big: "IELTS", small: "Sınav · başvuru" },
  },
];

const WITH_YOU = [
  "Havalimanında karşılama ve homestay ailesine bırakma",
  "İlk hafta telefon hattı, banka hesabı ve ulaşım kartı",
  "Okul kaydı günü öğrenciyle birlikte okulda olmak",
  "Homestay ailesini dönem içinde ziyaret etmek",
  "Ayda bir veliye kısa yazılı not",
  "Acil bir durumda aynı şehirde bir yetişkin",
];

const STEPS = [
  {
    step: "01",
    title: "Tanışma görüşmesi",
    content: "15 dakikalık ücretsiz bir görüşme. Öğrencinin yaşını, notlarını, bütçenizi ve ne zaman gitmek istediğinizi dinliyoruz. Bu aşamada hiçbir ödeme yok.",
  },
  {
    step: "02",
    title: "Okul önerisi",
    content: "Size üç okul ve şehir önerisi gönderiyoruz: yıllık ücret, konaklama seçenekleri ve neden bu okulu önerdiğimiz tek sayfada.",
  },
  {
    step: "03",
    title: "Başvuru ve kayıt",
    content: "Başvuru formlarını, okulun istediği belgeleri ve gerekiyorsa niyet mektubunu birlikte hazırlıyoruz. Kabul mektubu gelene kadar okulla yazışmaları biz takip ediyoruz.",
  },
  {
    step: "04",
    title: "Vize aşaması",
    content: "Vize ve öğrenci izni konusunda danışmanlık vermiyoruz. Bu işi Kanada'da yalnızca lisanslı danışmanlar (RCIC) yapabiliyor; sizi anlaşmalı bir lisanslı danışmana yönlendiriyoruz.",
  },
  {
    step: "05",
    title: "Varış ve ilk ay",
    content: "Ottawa'daki ortağımız öğrenciyi havalimanında karşılıyor, ilk haftanın işlerini birlikte hallediyor ve okulun ilk gününde yanında oluyor.",
  },
  {
    step: "06",
    title: "Dönem boyunca",
    content: "Lise öğrencileri için yıl boyu takip: aylık veli notu, okul görüşmelerine katılım ve homestay ziyaretleri.",
  },
];

const CITIES = [
  { name: "Ottawa", lang: "EN · FR", note: "Ortağımız burada yaşıyor. Lise ve dil programları için ilk önerimiz." },
  { name: "Montreal", lang: "FR · EN", note: "İki dili aynı anda duyabileceğiniz şehir. Kısa dil programları için uygun." },
  { name: "Quebec City", lang: "FR", note: "Gündelik hayat tamamen Fransızca. Dili hızlı ilerletmek isteyenler için." },
  { name: "Toronto", lang: "EN", note: "En geniş okul seçeneği. Lise ve uzun dil programları için." },
];

const PACKAGES = [
  { name: "Başvuru", who: "Dil programı ve yüksek lisans" },
  { name: "Başvuru ve karşılama", who: "İlk kez yurtdışına gidenler", featured: true },
  { name: "Lise ve yıllık takip", who: "18 yaş altı lise öğrencileri" },
];

// [özellik, hangi paketlerde var]
const FEATURES: [string, [boolean, boolean, boolean]][] = [
  ["Üç okul ve şehir önerisi", [true, true, true]],
  ["Başvuru formu ve belge kontrolü", [true, true, true]],
  ["Niyet mektubu ve özgeçmiş desteği", [true, true, true]],
  ["Lisanslı vize danışmanına yönlendirme", [true, true, true]],
  ["Havalimanında karşılama", [false, true, true]],
  ["İlk hafta: telefon, banka, ulaşım kartı", [false, true, true]],
  ["Okulun ilk gününde yanında olmak", [false, true, true]],
  ["Vasilik (custodian) düzenlemesi", [false, false, true]],
  ["Ayda bir yazılı veli notu", [false, false, true]],
  ["Okul görüşmeleri ve homestay ziyareti", [false, false, true]],
];

const FAQ = [
  {
    q: "Okul ücretinin üzerine ek bir ücret ödüyor muyum?",
    a: "Hayır. Okul ücretlerini okulun resmi fiyatıyla ödersiniz. Bizim hizmet ücretimiz seçtiğiniz pakete bağlı ve görüşmeden sonra yazılı olarak verilir.",
  },
  {
    q: "Vize başvurusunu siz mi yapıyorsunuz?",
    a: "Hayır. Kanada'da vize ve öğrenci izni danışmanlığını yalnızca lisanslı göçmenlik danışmanları (RCIC) ve avukatlar verebilir. Okul kaydı tamamlandığında sizi anlaşmalı bir lisanslı danışmana yönlendiriyoruz.",
  },
  {
    q: "Ders veriyor musunuz?",
    a: "Hayır, biz bir danışmanlık hizmetiyiz. İngilizce seviyesini ölçmek için ortağımızla kısa bir online görüşme yapıyoruz ve sınav hazırlığı için doğru kaynağa yönlendiriyoruz.",
  },
  {
    q: "Çocuğum kaç yaşında gidebilir?",
    a: "Kanada'da lise 9. sınıfla başlıyor. 18 yaşından küçük öğrencilerin yanında ebeveyni yoksa Kanada'da bir vasi gerekiyor; lise paketimiz bunu kapsıyor.",
  },
  {
    q: "Neden sadece dört şehir?",
    a: "Çünkü ortağımızın gidip görebildiği, okullarını ve ailelerini tanıdığı şehirlerle çalışıyoruz. Başka bir şehir isterseniz bunu görüşmede açıkça söyleriz.",
  },
];

function Mark({ on, featured }: { on: boolean; featured?: boolean }) {
  return on ? (
    <span className={cn("inline-grid size-6 place-items-center rounded-full", featured ? "bg-brand text-paper" : "bg-ink text-paper")}>
      <IconCheck size={14} stroke={3} />
      <span className="sr-only">Var</span>
    </span>
  ) : (
    <span className="inline-grid size-6 place-items-center text-muted">
      <IconMinus size={16} stroke={2} />
      <span className="sr-only">Yok</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <ResizableNavbar items={NAV} cta={CTA} />

      <main id="top" className="flex-1">
        {/* Giriş: fotoğraflı kaydırmalı alan (Academix referansı) */}
        <section aria-label="Giriş">
          <ImagesSlider className="h-[640px] sm:h-[680px]" slides={SLIDES} />
          <div className="border-b border-line bg-paper">
            <Container>
              <dl className="grid grid-cols-1 sm:grid-cols-3">
                {[
                  ["Okul ücreti", "Okulun resmi fiyatıyla"],
                  ["Varışta", "Havalimanında karşılama"],
                  ["Vize", "Lisanslı danışmana yönlendirme"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0">
                    <dt className="t-label text-brand">{k}</dt>
                    <dd className="mt-1 t-title text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </div>
        </section>

        {/* Programlar: alt alta satırlar */}
        <section id="programlar" className="border-t border-line py-20 sm:py-32">
          <Container className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <SectionHeading eyebrow="Programlar" title="Hangi yaşta, hangi programla?">
              Okulu siz seçiyorsunuz; biz seçenekleri ve aralarındaki farkı açıkça anlatıyoruz.
            </SectionHeading>
            <HoverEffect items={PROGRAMS} />
          </Container>
        </section>

        {/* Yanınızda: tek vurgu rengi */}
        <section id="yaninizda" className="relative overflow-hidden bg-accent py-20 sm:py-32">
          <svg aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[512px] text-paper opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" />
            <circle cx="100" cy="100" r="42" fill="none" stroke="currentColor" />
          </svg>
          <Container className="relative grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeading invert eyebrow="Farkımız" title="Başvuru bittiğinde işimiz bitmiyor.">
                Diploma koordinatörümüz Ottawa&apos;da yaşıyor. Öğrenci indiğinde onu karşılayan, okulun ilk
                gününde yanında olan ve veli aradığında telefonu açan kişi o.
              </SectionHeading>
              <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
                {WITH_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-4 border-t border-paper/20 py-4 t-body text-paper">
                    <IconCheck size={20} stroke={2} className="mt-1 shrink-0 text-paper/60" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-4 t-body text-paper/70">
                <IconPlaneArrival size={24} stroke={1.5} />
                Ottawa dışındaki şehirlerde karşılama ve ziyaretler önceden planlanır.
              </p>
            </div>
            <ParentNote />
          </Container>
        </section>

        {/* Süreç */}
        <section id="surec" className="py-20 sm:py-32">
          <Container>
            <SectionHeading eyebrow="Süreç" title="İlk görüşmeden ilk okul gününe">
              Başvuru süresi okula ve programa göre değişiyor; ilk görüşmede size takvimi çıkarıyoruz.
            </SectionHeading>
            <div className="mt-16">
              <Timeline data={STEPS} />
            </div>
          </Container>
        </section>

        {/* Şehirler: harita + liste */}
        <section id="sehirler" className="border-y border-line bg-surface py-20 sm:py-32">
          <Container>
            <SectionHeading eyebrow="Şehirler" title="Ottawa'dan başlayan dört şehir">
              Sadece ortağımızın gidip görebildiği şehirlerle çalışıyoruz.
            </SectionHeading>
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="rounded-lg border border-line bg-paper p-4 sm:p-6">
                <CityMap />
              </div>
              <ul className="border-t border-line">
                {CITIES.map((c) => (
                  <li key={c.name} className="border-b border-line py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="t-title">{c.name}</h3>
                      <span className="t-label text-brand">{c.lang}</span>
                    </div>
                    <p className="mt-1 t-body text-muted">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Paketler: karşılaştırma tablosu */}
        <section id="paketler" className="py-20 sm:py-32">
          <Container>
            <SectionHeading eyebrow="Paketler" title="İhtiyacınız kadar destek">
              Ücretler görüşmeden sonra yazılı olarak verilir. Okul ücretlerine ekleme yapmıyoruz.
            </SectionHeading>

            {/* Masaüstü: tablo */}
            <div className="mt-12 hidden md:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="align-bottom">
                    <th className="w-[34%] pb-6" />
                    {PACKAGES.map((p) => (
                      <th key={p.name} className={cn("px-6 pb-6 pt-6 align-bottom", p.featured && "rounded-t-lg bg-brand-tint")}>
                        {p.featured ? <p className="mb-2 t-label text-brand">Önerimiz</p> : null}
                        <p className="t-title text-ink">{p.name}</p>
                        <p className="mt-1 t-body font-normal text-muted">{p.who}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map(([f, has]) => (
                    <tr key={f} className="border-t border-line">
                      <th scope="row" className="py-4 pr-6 t-body font-normal text-ink">
                        {f}
                      </th>
                      {has.map((on, i) => (
                        <td key={i} className={cn("px-6 py-4", PACKAGES[i].featured && "bg-brand-tint")}>
                          <Mark on={on} featured={PACKAGES[i].featured} />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-line">
                    <td />
                    {PACKAGES.map((p) => (
                      <td key={p.name} className={cn("px-6 pb-6 pt-6", p.featured && "rounded-b-lg bg-brand-tint")}>
                        <ButtonLink href="#gorusme" size="sm" variant={p.featured ? "primary" : "secondary"} className="w-full">
                          Konuşalım
                        </ButtonLink>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobil: paket başına liste */}
            <div className="mt-12 grid gap-12 md:hidden">
              {PACKAGES.map((p, i) => (
                <div key={p.name} className="border-t-2 border-ink pt-6">
                  {p.featured ? <p className="mb-2 t-label text-brand">Önerimiz</p> : null}
                  <h3 className="t-title">{p.name}</h3>
                  <p className="t-body text-muted">{p.who}</p>
                  <ul className="mt-4 grid gap-2">
                    {FEATURES.filter(([, has]) => has[i]).map(([f]) => (
                      <li key={f} className="flex items-start gap-4 t-body">
                        <Mark on featured={p.featured} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="#gorusme" variant={p.featured ? "primary" : "secondary"} className="mt-6 w-full">
                    Bu paketi konuşalım
                  </ButtonLink>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Görüşme */}
        <section id="gorusme" className="border-t border-line bg-surface py-20 sm:py-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Ücretsiz görüşme" title="15 dakikada neyin mümkün olduğunu konuşalım">
                Formu doldurun, bir iş günü içinde size uygun saati yazalım. Görüşme telefonla ya da görüntülü yapılır.
              </SectionHeading>
              <ul className="mt-8 border-t border-line">
                {["Öğrenciye uygun program ve şehir", "Yaklaşık yıllık bütçe", "Başvuru için gereken süre"].map((t) => (
                  <li key={t} className="flex items-center gap-4 border-b border-line py-4 t-body text-ink">
                    <IconCheck size={20} stroke={2} className="shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <AppointmentForm />
          </Container>
        </section>

        {/* SSS */}
        <section id="sss" className="py-20 sm:py-32">
          <Container className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <SectionHeading eyebrow="SSS" title="Sık sorulan sorular" />
            <Accordion type="single" collapsible className="border-t border-line">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </section>
      </main>

      <footer className="bg-ink text-paper">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm t-body text-paper/70">
              Kanada&apos;da lise ve dil programları için yurtdışı eğitim danışmanlığı. İstanbul ve Ottawa.
            </p>
          </div>
          <div>
            <p className="t-label text-paper/60">İletişim</p>
            <ul className="mt-4 grid gap-2 t-body text-paper">
              <li>merhaba@kanadayagidiyoruz.com</li>
              <li>Instagram: @kanadayagidiyoruz</li>
            </ul>
          </div>
          <div id="kvkk">
            <p className="t-label text-paper/60">Kişisel veriler</p>
            <p className="mt-4 t-body text-paper/70">
              Formdaki bilgileriniz yalnızca görüşmeyi ayarlamak için kullanılır, üçüncü kişilerle paylaşılmaz ve
              talebiniz üzerine silinir.
            </p>
          </div>
        </Container>
        <Separator className="bg-paper/15" />
        <Container className="flex flex-col gap-2 py-6 t-label normal-case tracking-normal text-paper/60 sm:flex-row sm:justify-between">
          <p>© 2026 kanadayagidiyoruz</p>
          <p>Göçmenlik ve vize danışmanlığı vermiyoruz; bu konuda lisanslı danışmanlara (RCIC) yönlendiriyoruz.</p>
        </Container>
      </footer>

      <ChatWidget />
    </>
  );
}
