# DESIGN.md — kanadayagidiyoruz

Rules for every UI change in this repo. Read this before touching any component.
If a rule and a request conflict, ask first; do not silently break a rule.

---

## 0. Audit (2026-11-24, state of `main` at `ab2a2b1`, before these rules were applied)

Status: all rows below were fixed in the redesign that introduced this file.

| Area | Found | Problem against these rules |
|---|---|---|
| Stack | Next.js 16.4.6, React 19.3, Tailwind 4.3.3, motion 14.14, @tabler/icons-react 3.52, clsx, tailwind-merge | OK, no peer conflicts (`npm ls` clean) |
| Tailwind config | **No `tailwind.config.*`.** Tailwind 4 is CSS-first; all tokens live in `src/app/globals.css` under `@theme inline` | Tokens must stay there; do not add a JS config |
| Fonts | One family, Instrument Sans (400–700) via `next/font/google` in `src/app/layout.tsx` | Cannot reach 200 or 800. Fallback stack contains `system-ui` |
| Colors | `paper`, `paper-2`, `ink`, `ink-2`, `ink-3`, `line`, `maple`, `maple-dark`, `maple-soft`, `pine` | Three hue families in use (maple, pine, plus tints). Hex literals repeated inside SVG/JSX |
| Type sizes | 11, 12, 13, 14, 15, 16, 17, 18, 20, 24, 34, 40, 56, 60 px | Too many steps; jumps of ~1.2x |
| Spacing | Off-grid utilities: `p-7`, `p-5`, `p-3`, `px-3.5`, `py-2.5`, `gap-2.5`, `mt-1.5`, `mt-0.5`, `mt-9`, `mt-7`, `pt-7`, `gap-14`, `gap-5`, `py-5`, `pb-7` … | Not on an 8px rhythm |
| Shadows | Ad-hoc `shadow-[...]` on header, chat, pricing card, hero cards | Not tokenized |
| shadcn/ui | **Not installed.** No `components.json`, no Radix. Inputs, select, checkbox, FAQ accordion and mobile menu are hand-rolled | Must move to primitives (section 5) |
| Forbidden patterns | "Programlar" = 3 rounded cards in a row (`HoverEffect`, `md:grid-cols-3`); "Paketler" = 3 rounded cards in a row (`lg:grid-cols-3`) | Both must be redesigned |

Uncommitted, not approved drafts in the working tree: `src/components/hero-visual.tsx`,
`src/components/city-map.tsx`, `src/components/parent-note.tsx` and edits to `page.tsx`,
`hover-effect.tsx`, `resizable-navbar.tsx`. They must be brought in line with this file before
they are committed.

---

## 1. Fonts

Exactly three families, loaded once in `src/app/layout.tsx` with `next/font/google`,
`subsets: ["latin", "latin-ext"]` (Turkish needs latin-ext: ç ğ ı İ ö ş ü).

| Role | Family | Weights used | CSS variable | Tailwind class |
|---|---|---|---|---|
| Display (h1, h2, big numbers) | **Bricolage Grotesque** (variable, wght 200–800, opsz 12–96) | 200, 800 | `--font-display` | `font-display` |
| Body (paragraphs, UI, buttons, forms) | **Hanken Grotesk** (variable, wght 100–900) | 400, 800 | `--font-body` | `font-body` (default on `body`) |
| Mono (labels, eyebrows, codes like IST → YOW, prices, dates) | **JetBrains Mono** (variable, wght 100–800) | 400 | `--font-mono` | `font-mono` |

Fallback stacks are generic keywords only: `sans-serif` for display and body, `monospace` for mono.
Set `adjustFontFallback: false` so next/font does not inject a metric-matched Arial face.

**NEVER use:** Inter, Roboto, Open Sans, Arial, system-ui (also not `ui-sans-serif`,
`-apple-system`, Helvetica, Geist as a "safe default"). No font may be declared anywhere except
`layout.tsx`, and no component sets `font-family` directly. `button, input, select, textarea`
inherit the font (`font: inherit` in `globals.css`).

---

## 2. Color

All color comes from CSS variables in `src/app/globals.css`. No hex, rgb or named colors in
components or SVGs; use `var(--…)`, `currentColor` or the Tailwind token class.

| Token | Value | Role |
|---|---|---|
| `--brand` | `#B8322A` (maple red) | **The one dominant color.** Primary buttons, hero color field, active states, links on hover, map routes |
| `--brand-ink` | `#8F241D` | Hover/pressed state of `--brand` only |
| `--accent` | `#2F4A3F` (pine) | **The one accent.** Used at most once per viewport: the "Farkımız" band, avatars, one highlight |
| `--paper` | `#FAF8F5` | Page background (neutral, not counted as a color) |
| `--ink` | `#1D1B19` | Text and dark surfaces (neutral) |
| `--muted` | `color-mix(in oklab, var(--ink) 62%, var(--paper))` | Secondary text |
| `--line` | `color-mix(in oklab, var(--ink) 12%, var(--paper))` | 1px borders, dividers |
| `--surface` | `color-mix(in oklab, var(--ink) 4%, var(--paper))` | Alternate section background |
| `--brand-tint` | `color-mix(in oklab, var(--brand) 10%, var(--paper))` | Selected state background |

Tints are derived with `color-mix` from the tokens above; never introduce a new hue.

**Banned:** purple, violet or indigo anywhere; any gradient on a white or paper background;
multi-color gradients; neon glows; glassmorphism blur panels other than the scrolled header.

---

## 3. Spacing and layout

- **8px rhythm.** Tailwind spacing values must be even: `2 4 6 8 10 12 16 20 24 32 40` (8 → 160px).
  `1` (4px) is allowed only for icon-to-text gaps and hairline offsets. No `.5` values, no odd values
  (`p-3`, `p-5`, `p-7`, `gap-5`, `mt-9` …).
- Line heights land on multiples of 8: body 16/24, lead 18/32, heading 48/56, display 144/136.
- Section padding: `py-20` mobile, `py-32` desktop. Container: `max-w-6xl px-6 sm:px-8`
  (`Container` from `@/components/ui/section`). Header uses the same container so the logo and
  section headings share one left edge.
- Radius tokens: `--radius-sm 8px`, `--radius-md 16px`, `--radius-lg 24px`, `--radius-full`.
  Buttons are `rounded-full`; inputs `radius-md`; panels `radius-lg`.
- Borders are always 1px (`border` + `--line` or `--brand`). 2px only for the focus ring.
- Control heights: 48px (md) and 40px (sm). Nothing else.

---

## 4. Type scale

Hierarchy comes from **weight extremes (200 vs 800)** and **3x size jumps**, not from many in-between sizes.

| Step | Size / line | Family | Weight | Use |
|---|---|---|---|---|
| Display | 144/136 desktop, `clamp(64px, 12vw, 144px)` | display | 800, with a 200 word for contrast | h1 only, one per page |
| Heading | 48/56 (mobile 40/48) | display | 800 (or 200 for a quiet heading) | h2 |
| Body | 16/24, lead 18/32 | body | 400; 800 for emphasis and card titles | Paragraphs, h3, buttons |
| Label | 14/24, uppercase, `tracking-[0.08em]` | mono | 400 | Eyebrows, metadata, prices, dates |

Allowed sizes: 14, 16, 18, 48, 144 (and the mobile clamps). Nothing between 18 and 48, nothing
between 48 and 144. Weights 500/600/700 are not used. Buttons: body 16, weight 800.

---

## 5. Components (reuse, do not hand-roll)

### 5.1 Already in the repo

| Import | Exports | Notes |
|---|---|---|
| `@/components/ui/button` | `Button`, `ButtonLink`, `buttonClass(variant, size)` | The only button. Variants `primary`, `secondary`, `ghost`; sizes `md` (48) and `sm` (40). Same 1px border and weight on every variant |
| `@/components/ui/section` | `Container`, `SectionHeading` | Every section uses both |
| `@/components/ui/resizable-navbar` | `ResizableNavbar`, `NavItem` | Aceternity Resizable Navbar. Only header |
| `@/components/ui/timeline` | `Timeline`, `TimelineEntry` | Aceternity Timeline. Process section |
| `@/components/ui/hover-effect` | `HoverEffect`, `HoverItem` | Aceternity Card Hover Effect. Must not be laid out as 3 cards in a row (see 6) |
| `@/components/ui/spotlight` | `Spotlight` | Hero background only |
| `@/components/ui/background-grid` | `BackgroundGrid` | Hero background only |
| `@/components/appointment-form` | `AppointmentForm` | 15-minute call form; posts to `/api/randevu` |
| `@/components/chat-widget` | `ChatWidget` | School assistant; posts to `/api/chat` |
| `@/lib/utils` | `cn` | clsx + tailwind-merge. Use for every conditional class |
| `@/lib/chat` | `answer`, types | Rule-based assistant. Never gives visa advice |
| `@/lib/form` | `validate`, `PROGRAMS`, `TIMES` | Form validation shared by client and API |

### 5.2 shadcn/ui primitives to add

shadcn is not installed and the shadcn registry is not reachable from the cloud build environment,
so primitives are added from shadcn's published source with the `radix-ui` npm package, at the
paths the shadcn CLI would use (a `components.json` is added so the CLI works later):

| Import | Replaces |
|---|---|
| `@/components/ui/input` | hand-rolled `<input>` in `AppointmentForm`, chat input |
| `@/components/ui/textarea` | form note field |
| `@/components/ui/label` | form `Label` helper |
| `@/components/ui/select` | native `<select>` with inline SVG arrow |
| `@/components/ui/checkbox` | KVKK consent checkbox |
| `@/components/ui/toggle-group` | "Kim için" and "Ne zaman" choice buttons |
| `@/components/ui/accordion` | FAQ `<details>` |
| `@/components/ui/sheet` | mobile menu in `ResizableNavbar` |
| `@/components/ui/separator` | `border-t` dividers |
| `@/components/ui/badge` | "İstanbul ve Ottawa" pill, package tag |

Do **not** add shadcn `button`: `@/components/ui/button` stays the single button. Each primitive is
restyled with the tokens above (fonts, 1px borders, 48px height, even spacing).

---

## 6. Forbidden

- Three rounded cards in a row (any `grid-cols-3` of same-shaped rounded boxes). Use a list, a
  table, a 2 + 1 asymmetric split, a horizontal scroller or one large feature with a side list.
- Centered-everything heroes. The hero is left-aligned text with a visual on the right
  (stacked on mobile).
- 0.1-opacity drop shadows on everything. Default is **no shadow**: separate with 1px `--line` or a
  surface change. One token, `--shadow-float`, only for layers that float over content:
  scrolled header, chat panel, hero visual cards.
- Purple or indigo gradients on white (section 2).
- Inter, Roboto, Open Sans, Arial, system-ui (section 1).
- Emoji in UI copy; stock "AI" wording ("seamless", "unlock", "elevate", "hayalinizdeki",
  "yolculuğunuz başlıyor"); fake testimonials, fake numbers or "en çok tercih edilen" style claims.
- Copy that presents the business as a school: "kurs", "eğitim merkezi", "dil okulu" (as us),
  "MEB onaylı sertifika".
- Any visa or study-permit advice in copy or in the assistant. Visa questions go to a licensed
  RCIC.

---

## 7. Before every UI commit

1. Fonts: computed `font-family` on all text is one of the three families.
2. Buttons: every action button (`Button`, `ButtonLink`, toggle items, chat chips) has a 1px border, weight 800, height 48 or 40. Form fields and accordion rows are not action buttons.
3. Header: logo left edge equals the section heading left edge at 390, 768, 1366 and 1600px.
4. No horizontal scroll at 390px.
5. `npm run lint` and `npm run build` pass.
