# ЛСМД Design System

Editorial design system for **ЛСМД — Лікарня Швидкої Медичної Допомоги** (Hospital of Emergency Medical Care). A medical-analytics platform — a dashboard product for healthcare institutions: analytics, reports, KPIs across hospitals. The natural-language **AI асистент** is one feature inside the dashboard (a tab for authorized users), not the whole product.

The visual language: warm paper, near-black ink, IBM Plex throughout, hairline borders, **one chromatic accent — medical red `#c0392b`** used sparingly for the brand mark, primary CTAs, active navigation, and links.

---

## Company / product context

ЛСМД is an **information / medical-analytics company**. The product is a hospital-dashboard platform:

| Surface | What it is |
|---|---|
| **Marketing pages** (Home, About, Pricing) | Slightly warmer voice — still restrained, but human enough for a marketing site |
| **Dashboard** (Analytics) | Charts, KPIs, hospital-wide metrics. The data spine is **Supabase / PostgreSQL**. |
| **AI Асистент tab** | Natural-language chat that translates questions into SQL against the hospital DB. One tab inside the dashboard, gated to authorized users. The original `hospital-agent` repo is the source for this surface. |

Tech: Supabase (DB), GitHub (repo), Netlify (deploy), Next.js 14, multi-provider AI (Groq / Gemini / OpenAI / Anthropic).

### Sources
- `julbly38-a11y/hospital-agent` — Next.js + Supabase, the live AI assistant code. Files in `scraps/`.
- `julbly38-a11y/lsmd` — empty at build time (no commits yet). The full dashboard product hasn't been pushed.
- `julbly38-a11y/medychna` — exists, contains a previous DS snapshot, not used as source.

---

## Index

```
README.md                ← you are here
SKILL.md                 ← agent-skill manifest
colors_and_type.css      ← tokens (incl. medical red --brand)
assets/                  ← logo mark, iconography notes
preview/                 ← design-system cards
ui_kits/
  asystent/              ← AI chat surface (the in-dashboard feature)
  dashboard/             ← marketing site + dashboard shell + Asystent tab
scraps/                  ← raw imports from hospital-agent
```

---

## CONTENT FUNDAMENTALS

**Language.** Ukrainian first. Russian accepted on input in the AI tab.

**Voice & person — two registers:**
- **Marketing pages** (Home, About, Pricing): slightly warmer second-person plural / inclusive "we" — `Ми перетворюємо медичні дані...`. Still restrained — short declarative sentences, no exclamation marks, no hype words ("revolutionary", "amazing"), no marketing puffery. One human sentence per section, then the proof.
- **Dashboard / AI tab**: imperative second-person familiar — `Запитуйте...`, `Натисни...`. Reads like the engineering pair-programmer it is.

**Tone.** Quiet confidence. The product proves itself with numbers, not adjectives. `20,491 госпіталізацій` does more work than any headline could.

**Casing.**
- Sentence case for prose, headlines, buttons.
- lowercase for mono microcopy: `показати SQL`, `безкоштовно`.
- UPPERCASE + 0.08em tracking, Plex Mono 500 — the signature label style for nav, sidebar sections, table headers, KPI captions: `АНАЛІТИКА`, `ПАЦІЄНТИ`, `СЕСІЯ`, `ЦЬОГО МІСЯЦЯ`.
- **ЛСМД** always uppercase (acronym).

**Punctuation.** Em-dash `—` is the joiner. Middle-dot `·` separates metadata. `○` empty result. `—` empty cell. Σ for totals. No emoji. Anywhere.

**Numbers.** Plex Mono 300 at large sizes for hero numbers. en-US locale separator: `20,491`. Currency: `$0.0042` for sub-cent, `$0.00` for zero.

**Examples (production copy).**
- `Запитуйте про госпіталізації, пацієнтів, лікарів, діагнози та статистику лікарні — відповідаю даними з бази.`
- `13 відділень · 202 лікарі`
- `Скільки пролікувала доктор Дубець за грудень?`
- `Показники по всіх відділеннях`

---

## VISUAL FOUNDATIONS

### Palette

**Single chromatic accent — medical red.** Reserved for brand identity, primary CTAs, active nav links, and the logo mark. Most of the UI remains monochrome.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#f5f4f0` | Page background — warm paper |
| `--bg2` | `#eeecea` | Code blocks, table headers |
| `--surface` | `#ffffff` | Cards, sidebar, inputs |
| `--border` | `#d8d5cf` | Hairline dividers |
| `--text` | `#1a1917` | Primary ink |
| `--text2` | `#6b6760` | Secondary text |
| `--text3` | `#9c9890` | Tertiary, labels, placeholders |
| **`--brand`** | **`#c0392b`** | **Medical red — logo, CTAs, links, active nav** |
| `--brand-hover` | `#a93222` | CTA hover |
| `--brand-soft` | `#fbecea` | Soft brand-tinted badges/chips |
| `--green` | `#16a34a` | Success / positive delta |
| `--amber` | `#b45309` | Warning |

**Accent rules.**
1. Maximum **one red element per visible surface** (nav active state OR primary button OR logo mark — never several).
2. Red is **never** a fill behind text-on-text — it stays a signal color.
3. The chat surface (AI Асистент) keeps its monochrome inverted-ink CTAs to preserve the existing product's calm — no red bubbles, no red send button. Brand red appears in the dashboard chrome around it.

### Typography
- **IBM Plex Sans** — body, prose, examples. Weights 300/400/500.
- **IBM Plex Mono** — display headings, labels, metadata, table cells, code, logo wordmark, KPI numbers. Weights 300/400/500.
- The light-weight mono headline (Plex Mono 300, 28–48px) is the editorial signature.

### Spacing — 4-pt grid
Common rhythms: `16/20/24/32/40px`. Sidebar 260px. Marketing hero 80px vertical.

### Backgrounds
Flat `--bg`. **No gradients. No patterns. No imagery in the system.** Real product photography (if added later) should be desaturated, warm, document-style — flag it explicitly for review.

### Borders
One width: `1px`. One color: `--border`. Sometimes `--text` on selected states.

### Corner radii
`4px` tables/code, `6px` chips/cards, `8px` inputs/buttons. Asymmetric chat bubbles: `18 18 4 18` user, `4 18 18 18` agent.

### Shadows
**None.** Elevation = white surface + 1px border.

### Animation
`0.15s` fast, `cubic-bezier(0.4, 0, 0.2, 1)`. The only keyframe in production is the typing-dot pulse.

### Hover & press
- Default → bg lifts to `--bg`, border may appear, secondary text bumps to primary.
- Brand button → bg deepens to `--brand-hover`, no scale.
- Press → no shrink, no flash.
- Disabled → `opacity: 0.3`.

### Layout rules
Marketing: centered max-width 1080px, generous vertical rhythm. Dashboard: 260px fixed sidebar + fluid main, dock-pinned input where applicable.

---

## ICONOGRAPHY

Brand has **no icon set**. Icons are typographic — single Plex Mono characters: `+ → ↓ ↑ Σ ▼ ▲ ○ · ! —`.

If a real icon is genuinely needed, use **Lucide** (stroke 1.5, 16px, `currentColor`). This is a substitution — flag it. Logo mark is a Plex Mono `+` rendered in `--brand` (red) on light surfaces, ink-color on red surfaces.

---

## CAVEATS

- **`lsmd` repo is empty.** Built from `hospital-agent` (the AI tab) + the platform vision you described. Push real dashboard code and I'll align pixel-for-pixel.
- **No real chart library yet** — dashboard mocks use fake bars/sparklines built with CSS/SVG. Confirm Recharts / D3 / Visx preference before production.
- **Fonts loaded from Google.** Vendor-locally on request.
- **No real product photography.** If you want a hero image, send one — I won't invent imagery.
- **AI Асистент chat keeps monochrome CTAs** by design (preserve the calm of the existing product). Brand red lives in the dashboard chrome around it. Confirm or override.

## **What I need from you to make this perfect**

1. **Push the real dashboard code** to `lsmd` (or another repo) — the existing UI kit is informed-guess, not pixel-faithful.
2. **Confirm chart library** so I align styles.
3. **Real customer logos / photos** for the marketing site, if any exist.
4. **Confirm the red accent** by looking at the new preview cards — too saturated, too dark, or just right?
