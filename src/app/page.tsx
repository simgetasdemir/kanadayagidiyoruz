import { AppointmentForm } from "@/components/appointment-form";
import { ChatWidget } from "@/components/chat-widget";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { ButtonLink } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/hover-effect";
import { ResizableNavbar } from "@/components/ui/resizable-navbar";
import { Container, SectionHeading } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { Timeline } from "@/components/ui/timeline";
import {
  IconBooks,
  IconCheck,
  IconLanguage,
  IconPlaneArrival,
  IconSchool,
} from "@tabler/icons-react";

const NAV = [
  { name: "Programlar", link: "#programlar" },
  { name: "Yanınızda", link: "#yaninizda" },
  { name: "Süreç", link: "#surec" },
  { name: "Şehirler", link: "#sehirler" },
  { name: "Paketler", link: "#paketler" },
  { name: "SSS", link: "#sss" },
];
const CTA = { name: "Ücretsiz görüşme", link: "#gorusme" };

const PROGRAMS = [
  {
    title: "Lise",
    description:
      "9. sınıftan itibaren Kanada devlet liselerinde bir dönem, bir yıl ya da diploma. Okul kurulunu notlara, bütçeye ve öğrencinin ilgisine göre birlikte seçiyoruz.",
    meta: "Ottawa ve Toronto bölgesi",
    icon: <IconSchool size={22} stroke={1.75} />,
  },
  {
    title: "Dil programları",
    description:
      "4 haftadan 6 aya kadar İngilizce ya da Fransızca. Kısa programlar yaz tatiline, uzun olanlar üniversite öncesi bir yıla uygun.",
    meta: "Ottawa, Montreal, Quebec City, Toronto",
    icon: <IconLanguage size={22} stroke={1.75} />,
  },
  {
    title: "Sınavlar ve yüksek lisans",
    description:
      "IELTS ya da Duolingo için hangi seviyeden başlamanız gerektiğini konuşuyoruz, doğru kaynağa yönlendiriyoruz. Yüksek lisans başvurusunda okul listesi ve yazılarda yanınızdayız.",
    meta: "Seviye görüşmesi ortağımızla, online",
    icon: <IconBooks size={22} stroke={1.75} />,
  },
];

const WITH_YOU = [
  "Havalimanında karşılama ve eve ya da homestay ailesine bırakma",
  "İlk hafta telefon hattı, banka hesabı ve toplu taşıma kartı",
  "Okul kaydı günü öğrenciyle birlikte okulda olmak",
  "Homestay ailesini dönem içinde ziyaret etmek",
  "Ayda bir veliye kısa yazılı durum notu",
  "Acil bir durumda aynı şehirde ulaşılabilir bir yetişkin",
];

const STEPS = [
  {
    step: "1",
    title: "Tanışma görüşmesi",
    content: (
      <p>
        15 dakikalık ücretsiz bir görüşme. Öğrencinin yaşını, notlarını, bütçenizi ve ne zaman gitmek istediğinizi
        dinliyoruz. Bu aşamada hiçbir ödeme yok.
      </p>
    ),
  },
  {
    step: "2",
    title: "Okul önerisi",
    content: (
      <p>
        Bir hafta içinde size üç okul ve şehir önerisi gönderiyoruz: yıllık ücret, konaklama seçenekleri ve neden bu
        okulu önerdiğimiz tek sayfada.
      </p>
    ),
  },
  {
    step: "3",
    title: "Başvuru ve kayıt",
    content: (
      <p>
        Başvuru formlarını, okulun istediği belgeleri ve gerekiyorsa niyet mektubunu birlikte hazırlıyoruz. Kabul
        mektubu gelene kadar okulla yazışmaları biz takip ediyoruz.
      </p>
    ),
  },
  {
    step: "4",
    title: "Vize aşaması",
    content: (
      <p>
        Vize ve öğrenci izni konusunda danışmanlık vermiyoruz. Bu işi Kanada&apos;da yalnızca lisanslı danışmanlar
        (RCIC) yapabiliyor; sizi anlaşmalı bir lisanslı danışmana yönlendiriyoruz.
      </p>
    ),
  },
  {
    step: "5",
    title: "Varış ve ilk ay",
    content: (
      <p>
        Ottawa&apos;daki ortağımız öğrenciyi havalimanında karşılıyor, ilk haftanın işlerini birlikte hallediyor ve
        okulun ilk gününde yanında oluyor.
      </p>
    ),
  },
  {
    step: "6",
    title: "Dönem boyunca",
    content: (
      <p>
        Lise öğrencileri için yıl boyu takip: aylık veli notu, okul görüşmelerine katılım ve homestay ziyaretleri.
      </p>
    ),
  },
];

const CITIES = [
  {
    name: "Ottawa",
    lang: "İngilizce ve Fransızca",
    note: "Ortağımız burada yaşıyor. Lise ve dil programları için ilk önerimiz.",
    distance: "Ortağımızın şehri",
  },
  {
    name: "Montreal",
    lang: "Fransızca ve İngilizce",
    note: "İki dili aynı anda duyabileceğiniz şehir. Kısa dil programları için uygun.",
    distance: "Ottawa'ya 2 saat",
  },
  {
    name: "Quebec City",
    lang: "Fransızca",
    note: "Gündelik hayat tamamen Fransızca. Dili hızlı ilerletmek isteyenler için.",
    distance: "Ottawa'ya 4,5 saat",
  },
  {
    name: "Toronto",
    lang: "İngilizce",
    note: "En geniş okul seçeneği. Lise ve uzun dil programları için.",
    distance: "Ottawa'ya 4–5 saat",
  },
];

const PACKAGES = [
  {
    name: "Başvuru",
    who: "Dil programı ve yüksek lisans için",
    items: [
      "Üç okul ve şehir önerisi",
      "Başvuru formu ve belge kontrolü",
      "Niyet mektubu ve özgeçmiş desteği",
      "Konaklama seçeneklerinin karşılaştırması",
      "Lisanslı vize danışmanına yönlendirme",
    ],
    featured: false,
  },
  {
    name: "Başvuru ve karşılama",
    who: "İlk kez yurtdışına gidenler için",
    items: [
      "Başvuru paketindeki her şey",
      "Havalimanında karşılama",
      "İlk hafta: telefon, banka, ulaşım kartı",
      "Okulun ilk gününde yanında olmak",
      "İlk ay boyunca ulaşılabilir bir yetişkin",
    ],
    featured: true,
  },
  {
    name: "Lise ve yıllık takip",
    who: "18 yaşından küçük lise öğrencileri için",
    items: [
      "Başvuru ve karşılamadaki her şey",
      "Vasilik (custodian) düzenlemesi",
      "Ayda bir veliye yazılı durum notu",
      "Okul görüşmelerine katılım",
      "Dönem içinde homestay ziyareti",
    ],
    featured: false,
  },
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
    a: "Çünkü ortağımızın gidip görebildiği, okullarını ve ailelerini tanıdığı şehirlerle çalışıyoruz. Toronto'dan uzak bir şehir isterseniz bunu görüşmede açıkça söyleriz.",
  },
];

export default function Home() {
  return (
    <>
      <ResizableNavbar items={NAV} cta={CTA} />

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
          <BackgroundGrid />
          <Spotlight />
          <Container className="relative">
            <p className="inline-flex h-8 items-center rounded-full border border-line bg-white px-3.5 text-[13px] font-medium text-ink-2">
              İstanbul ve Ottawa
            </p>
            <h1 className="mt-6 max-w-3xl text-[40px] font-semibold leading-[1.08] sm:text-[60px]">
              Kanada&apos;ya giden öğrencinin yanında bir öğretmen olsun.
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-2">
              Lise, İngilizce ve Fransızca dil programları için okul seçiminden ilk haftaya kadar yanınızdayız.
              İstanbul&apos;da biz, Ottawa&apos;da İngilizce öğretmeni ortağımız.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#gorusme">15 dakikalık ücretsiz görüşme</ButtonLink>
              <ButtonLink href="#paketler" variant="secondary">
                Paketleri incele
              </ButtonLink>
            </div>
            <ul className="mt-14 grid max-w-3xl gap-4 border-t border-line pt-8 sm:grid-cols-3">
              {[
                "Okul ücretleri okulun resmi fiyatıyla",
                "Havalimanında karşılama ve ilk hafta",
                "Vize için lisanslı danışmana yönlendirme",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] text-ink-2">
                  <IconCheck size={18} stroke={2} className="mt-0.5 shrink-0 text-maple" />
                  {t}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Programlar */}
        <section id="programlar" className="py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Programlar" title="Hangi yaşta, hangi programla gidilir?">
              Üç alanda çalışıyoruz. Hepsinde okulu siz seçiyorsunuz; biz seçenekleri ve aralarındaki farkı açıkça
              anlatıyoruz.
            </SectionHeading>
            <HoverEffect items={PROGRAMS} className="-mx-2 mt-12" />
          </Container>
        </section>

        {/* Yanınızda */}
        <section id="yaninizda" className="bg-pine py-20 text-white sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">Farkımız</p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.15] text-white sm:text-[40px]">
                Başvuru bittiğinde işimiz bitmiyor.
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/75">
                Ortağımız Ottawa&apos;da yaşayan bir İngilizce öğretmeni. Öğrenci indiğinde onu karşılayan, okulun ilk
                gününde yanında olan ve velinin aradığında telefonu açan kişi o. Uzaktan bir ofis değil, aynı şehirde
                bir yetişkin.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <IconPlaneArrival size={28} stroke={1.5} className="text-white/70" />
                <p className="text-[15px] text-white/75">Ottawa dışındaki şehirlerde karşılama ve ziyaretler planlı yapılır.</p>
              </div>
            </div>
            <ul className="grid gap-3 self-center">
              {WITH_YOU.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-[16px] text-white/90">
                  <IconCheck size={18} stroke={2} className="mt-0.5 shrink-0 text-white/60" />
                  {t}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Süreç */}
        <section id="surec" className="py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Süreç" title="İlk görüşmeden ilk okul gününe">
              Ne zaman ne olacağını baştan bilin. Başvuru süresi okula ve programa göre değişiyor; ilk görüşmede size
              takvimi çıkarıyoruz.
            </SectionHeading>
            <div className="mt-14">
              <Timeline data={STEPS} />
            </div>
          </Container>
        </section>

        {/* Şehirler */}
        <section id="sehirler" className="border-y border-line bg-paper-2 py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Şehirler" title="Ottawa'dan başlayan dört şehir">
              Sadece ortağımızın gidip görebildiği şehirlerle çalışıyoruz.
            </SectionHeading>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CITIES.map((c) => (
                <article key={c.name} className="flex flex-col rounded-3xl border border-line bg-white p-6">
                  <p className="text-[13px] font-medium text-ink-3">{c.distance}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{c.name}</h3>
                  <p className="mt-1 text-[14px] font-medium text-maple">{c.lang}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{c.note}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Paketler */}
        <section id="paketler" className="py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Paketler" title="İhtiyacınız kadar destek">
              Ücretler görüşmeden sonra yazılı olarak verilir. Okul ücretlerine ekleme yapmıyoruz.
            </SectionHeading>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {PACKAGES.map((p) => (
                <article
                  key={p.name}
                  className={
                    p.featured
                      ? "flex flex-col rounded-3xl border border-maple bg-white p-7 shadow-[0_20px_50px_-30px_rgba(184,50,42,0.45)]"
                      : "flex flex-col rounded-3xl border border-line bg-white p-7"
                  }
                >
                  <div className="flex h-7 items-center">
                    {p.featured ? (
                      <span className="inline-flex h-7 items-center rounded-full bg-maple-soft px-3 text-[13px] font-semibold text-maple">
                        Önerdiğimiz
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-[15px] text-ink-2">{p.who}</p>
                  <ul className="mt-6 grid gap-3 border-t border-line pt-6">
                    {p.items.map((i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <IconCheck size={18} stroke={2} className="mt-0.5 shrink-0 text-maple" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <ButtonLink href="#gorusme" variant={p.featured ? "primary" : "secondary"} className="w-full">
                      Bu paketi konuşalım
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Görüşme */}
        <section id="gorusme" className="border-t border-line bg-paper-2 py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Ücretsiz görüşme" title="15 dakikada neyin mümkün olduğunu konuşalım">
                Formu doldurun, bir iş günü içinde size uygun saati yazalım. Görüşme telefonla ya da görüntülü yapılır.
              </SectionHeading>
              <ul className="mt-8 grid gap-3 text-[15px] text-ink-2">
                {[
                  "Öğrenciye uygun program ve şehir",
                  "Yaklaşık yıllık bütçe",
                  "Başvuru için gereken süre",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <IconCheck size={18} stroke={2} className="mt-0.5 shrink-0 text-maple" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <AppointmentForm />
          </Container>
        </section>

        {/* SSS */}
        <section id="sss" className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeading eyebrow="SSS" title="Sık sorulan sorular" />
            <div className="divide-y divide-line border-y border-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-2 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-12 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold text-ink">kanadayagidiyoruz</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-2">
              Kanada&apos;da lise ve dil programları için yurtdışı eğitim danışmanlığı. İstanbul ve Ottawa.
            </p>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">İletişim</p>
            <ul className="mt-3 grid gap-2 text-[15px] text-ink-2">
              <li>merhaba@kanadayagidiyoruz.com</li>
              <li>Instagram: @kanadayagidiyoruz</li>
            </ul>
          </div>
          <div id="kvkk">
            <p className="text-[14px] font-semibold text-ink">Kişisel veriler</p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
              Formdaki bilgileriniz yalnızca görüşmeyi ayarlamak için kullanılır, üçüncü kişilerle paylaşılmaz ve
              talebiniz üzerine silinir.
            </p>
          </div>
        </Container>
        <div className="border-t border-line">
          <Container className="flex flex-col gap-2 py-6 text-[13px] text-ink-3 sm:flex-row sm:justify-between">
            <p>© 2026 kanadayagidiyoruz</p>
            <p>Göçmenlik ve vize danışmanlığı vermiyoruz; bu konuda lisanslı danışmanlara (RCIC) yönlendiriyoruz.</p>
          </Container>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
