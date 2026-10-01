# Coralsoft — Preview Studio

An internal tool for generating **Upwork Project Catalog** preview images. Three
studios share one editor shell and one stage size, switched from the sidebar:

| Route | Studio | Shows | Layouts |
|-------|--------|-------|---------|
| `/cases` | Portfolio · Web app | One desktop / web platform screenshot | 13 |
| `/` | Portfolio · Mobile app | Portrait + 3 phone screens | 7 |
| `/catalog` | Project catalog | Service cover with a developer photo | 1 |

Each studio's newest layout ("Portfolio · photo" / "Service · photo") is the
shared `PortfolioCover` (`components/covers/`): a 1:1 build of the design
mockups, with a developer photo placed straight on the canvas (no frame) next to
the screenshot or phones.

Any layout can be **archived** from its tile (hover → archive icon). Archived
layouts drop off the board and are listed at the bottom of the sidebar, under
"Reset all", each with a Restore button. The archive lives in its own
`localStorage` slot per studio, so "Reset all" never brings archived layouts back.

Every studio renders a **1000 × 750** stage and exports a pixel-accurate **2000 × 1500**
PNG or JPEG (a 2× capture). All work the same way: pick a layout variant, edit
the copy, drop in images, optionally re-tint the primary/secondary colors, and
export. Each keeps its own `localStorage` slot, so switching studios never
disturbs another's work in progress.

This is a clean **Next.js 15 + TypeScript + Tailwind v4** rebuild of the original
Babel-in-the-browser prototypes, with proper component architecture and type safety.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build (also runs ESLint + type-check)
pnpm start        # serve the production build
pnpm lint         # ESLint
pnpm typecheck    # strict tsc --noEmit
```

## Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds a static
export (`output: "export"`) and publishes `out/` to GitHub Pages. The workflow
reads the Pages base path from `actions/configure-pages` and passes it as
`NEXT_PUBLIC_BASE_PATH` so assets resolve under the project subpath, then drops a
`.nojekyll` file so `_next/*` is served.

Live URL: **https://maksym-bezditko.github.io/coralsoft-upwork-preview-studio/**

If the first run can't auto-enable Pages, set **Settings → Pages → Source** to
**GitHub Actions** once and re-run the workflow.

## How it works

- Each studio is one client page (`app/page.tsx`, `app/cases/page.tsx`) holding
  all its editor state in `useState`. Copy and layout mirror to `localStorage`
  (`coralsoft-upwork-editor-v1` / `coralsoft-case-editor-v1`); **images go to
  IndexedDB** instead (`lib/image-store.ts`). State is seeded from defaults on
  the server, then hydrated after mount — synchronously for copy, awaited for
  images — to avoid SSR mismatch.
- The sidebar edits state; the stage renders the selected variant live inside a
  fixed native-size frame that is scaled (display only) to fit the viewport.
- Export captures the **native-size** `#export-stage` node with `html-to-image`
  at `pixelRatio: 2`, so the download is 2× regardless of on-screen scale.
- Each variant pipes the editor colors into CSS custom properties — `--pri` /
  `--sec` for the mobile stage, five tokens for the case stage (see *Colour*
  below). The shared `variant.css` / `case.css` reference those vars, with
  `color-mix(...)` derivations, so the pickers retint the whole composition.

## Image quality

Nothing in the pipeline reduces image quality. Dropped images are kept
**byte-for-byte at full resolution** — no downscale, no re-encode
(`lib/image.ts` only decodes the file to validate it, then hands back the
original data URL). PNG export is lossless; the JPEG button runs at q=0.98 and
exists only for upload size limits.

Two browser ceilings had to be routed around to make that work:

- **`localStorage` ~5 MB quota** — solved by persisting images to IndexedDB.
- **Chrome discards CSS custom property values over ~2 MB.** `setProperty`
  succeeds but the computed value comes back empty, so piping a data URL
  through `--slot-img` made any screenshot above roughly 1.5 MB render as an
  empty slot — with no placeholder hint either, since `src` was truthy.
  `ImageSlot` now sets `background-image` / `background-position` inline
  instead; those have no such limit (verified painting a 18.6 MB source).

The quota was the sole reason the importer used to cap the longest edge at
1400px and fall back to JPEG q=0.9 — both visible losses: a 16:9 screenshot
ended up at 1400 × 787 when the C1 browser view needs 1124 × 908 device pixels
at 2× export, so `cover` upscaled it ~15%, and JPEG ringing shows badly on the
small mono type these layouts are full of. With both ceilings gone, the 2×
export is the only place resolution is decided.

## Mobile app layouts (`/`)

| ID | Name | Notes |
|----|------|-------|
| v1 | Dark editorial | Coralsoft house style; portrait + 3-phone cascade + title/role cards |
| v2 | Light premium | V1 composition inverted onto a warm off-white canvas |
| v3 | Editorial poster | Oversized stroke numeral, tall portrait, editorial title block |
| v4 | Coral forward | Primary-color canvas, dark cards, coral badge |
| v5 | Code terminal | Terminal-window portrait + live code-editor title card |
| v6 | Diagonal split | Dark/coral diagonal halves, portrait over the seam |

## Web case-study layouts (`/cases`)

Compositions ported from the `Case Study Previews.html` project in Claude Design
and re-laid out from its 1200 × 675 (16:9) prototype onto the 1000 × 750 (4:3)
Upwork stage. Every layout carries exactly one screenshot slot for a **web
platform screenshot**; C1/C2 frame it in a browser mock.

| ID | Name | Notes |
|----|------|-------|
| c1 | Editorial | Master: copy left, browser mock right, 3 stat cards under |
| c2 | Bleed premium | Browser bleeding off the right edge, stats on a heavy rule |
| c3 | Stat hero | Numbers forward — oversized figures along a bottom rule |
| c4 | Poster | Numeral + summary left, tinted panel right (screenshot over stat list) |
| c5 | Accent split | Accent-color canvas, angled panel, tall screen right |

Layout names describe the **composition, not a palette** — no template carries a
fixed colour scheme (see below).

Everything on the cover is editable: product, domain, category, meta line,
headline, summary, numeral, address bar, screenshot placeholder, the tech chips
(text + which ones take the accent color), and the three result numbers with
their captions. The **Case study** section one-click fills all of it from the six
production case studies in `lib/case-presets.ts`, keeping the layout, colors and
dropped screenshot. Chip capacity differs per layout (`CASE_TAG_LIMITS`) — rows
the current layout can't fit stay editable but are dimmed.

### Removing elements

**Clearing a field removes that element from the cover.** There is no separate
set of visibility toggles — an empty value is the off switch. The **headline**
and the **screenshot slot** are the only two that always render; everything else
(product, domain, category, meta line, summary, numeral, address bar, screenshot
placeholder, every chip, every stat) can be emptied away.

Each block drops its own wrapper rather than just its text, which is the part
that actually matters: an empty `.chips` would still hold a flex row, an empty
`.stats` would still draw C2's 2px rule and C5's cell borders, a `.kicker` with
no text would leave its accent dot floating in the header, and C3's rule would
underline nothing. Composite lines are assembled from whatever survives, so
clearing one part never leaves a dangling `·` or `—` separator. A product label
with no product promotes the domain and drops the gap above it (`.dom.solo`).

Partial removal works the same way: a blank chip row or a stat with no number
and no caption is skipped rather than rendered as an empty pill or card.

### Colour

Five colours drive every composition, all set in the sidebar: **background**,
**accent**, **headline + numbers**, **skills** and **other text**. They arrive as
`--bg` / `--pri` / `--head` / `--chip` / `--text`, and `case.css` derives every
border, card surface, chip fill, browser chrome tint and screenshot backing from
them with `color-mix()`. Nothing is hardcoded, so the same layout reads correctly
on a white, coral or dark canvas — set the background dark and the hairlines,
surfaces and wordmark all follow. The Coralsoft wordmark picks its white or
orange variant from the canvas's relative luminance.

C5 is the exception worth knowing: its canvas *is* the accent colour, so the
roles invert there — the product label and accent chips borrow the background
colour instead, since accent-on-accent would be invisible.

### Text size

The same five roles have a size control — **headline**, **product**, **skills**,
**numbers** and **body** — as `--fs-*` percentages (60–180%, default 100%) that
`case.css` multiplies into every `font-size` via `calc()`.

They are multipliers rather than absolute pixel values on purpose: the layouts
size the same role differently by design (the stat figures are 62px on C3, which
leads with numbers, and 25px on C5, which doesn't). A percentage moves a role
across every layout while keeping those relationships intact. The browser mock's
address bar is deliberately excluded — it is window chrome, not cover copy.

### Positioning long screenshots

Slots render the screenshot with `cover`, so a capture whose aspect ratio differs
from the slot overflows on one axis — a full-page marketing screenshot overflows
vertically by a lot. The **Screenshot** section's position control picks which
slice shows: nine anchors (top left → bottom right) for the common cases, plus X
/ Y sliders to land anywhere between them. It maps to the `background-position`
that `ImageSlot` sets inline.

## Component tree

```
app/
  layout.tsx                  # fonts (Outfit + JetBrains Mono via next/font), metadata
  page.tsx                    # Mobile app studio — owns state, wires sidebar + stage
  cases/page.tsx              # Web case-study studio — same shape, case state
  globals.css                 # Tailwind v4 @theme tokens + editor chrome + drop-zone CSS

components/editor/            # the left rail + stage chrome (shared by both studios)
  ModeSwitch.tsx              # segmented control between the two studios
  SectionHeader.tsx           # mono uppercase section label
  VariantPicker.tsx           # 2×3 grid of layout tiles (generic over id)
  Field.tsx                   # labeled form-field wrapper
  ColorRow.tsx                # color input + validated hex + preset swatches
  Colors.tsx                  # both color rows + reset-to-brand
  DropZone.tsx                # click/drag image picker with preview + clear
  StageChrome.tsx             # spec readout + PNG/JPEG export buttons
  StagePreview.tsx            # ResizeObserver-driven scaled native-size viewport
  ResetAll.tsx                # danger button behind a confirm dialog
  Sidebar.tsx                 # mobile app rail
  CopyFields.tsx              #   title / role / code tag / kicker inputs
  ImagesSection.tsx           #   portrait + 3-up screen thumbnails
  CaseSidebar.tsx             # case-study rail
  CasePresetPicker.tsx        #   one-click fill from the 6 production cases
  CaseCopyFields.tsx          #   every text line on the cover
  CaseColors.tsx              #   background / accent / headline / skills / text
  CaseFontSizes.tsx           #   per-role type scale sliders
  TagsField.tsx               #   editable tech chips + accent toggles
  StatsFields.tsx             #   editable result numbers + captions
  ScreenPosition.tsx          #   9-anchor + slider control for the screenshot slot
  SliderRow.tsx               # labelled range input + readout (shared)

components/variants/          # the 6 self-contained 1000×750 mobile compositions
  V1Dark / V2Light / V3Poster / V4Coral / V5Terminal / V6Split.tsx
  ImageSlot.tsx               # placeholder/preview slot (dashed hint ↔ cover image)
  PhoneTrio.tsx               # the 3-phone cascade + single Phone bezel
  Logo.tsx                    # Coralsoft wordmark (white / orange)
  index.tsx                   # variant id → component registry; imports variant.css
  variant.css                 # shared stylesheet (.uwe .v1..v6) — ported verbatim

components/cases/             # the 5 self-contained 1000×750 case-study covers
  C1Master / C2Light / C3Stat / C4Poster / C5Coral.tsx
  CaseParts.tsx               # CaseLogo / Kicker / ProductLabel / Chips / Stats / ScreenSlot
  types.ts                    # CaseVariantProps
  index.tsx                   # case id → component registry; imports case.css
  case.css                    # shared stylesheet (.cse .c1..c5) — colour-token driven

components/ui/                # shadcn-style primitives (button, input, textarea, dialog)

lib/
  state.ts                    # mobile types, defaults, swatches, localStorage load/save
  case-state.ts               # case types, defaults, chip limits, localStorage load/save
  case-presets.ts             # the 6 production case studies as one-click copy fills
  export.ts                   # html-to-image PNG/JPEG wrapper (2× upscale)
  image-store.ts              # IndexedDB image persistence (no localStorage quota)
  image.ts                    # import path — full-resolution, no downscale or re-encode
  cn.ts                       # clsx + tailwind-merge helper
```

## Assets

The Coralsoft wordmark lives in `public/assets/`:

- `logo-white.svg` — white version, used on every dark variant + sidebar.
- `logo.svg` — orange-on-transparent, used on the light V2 canvas.

Plain `<img>` (not `next/image`) is used for the logos and image slots so
`html-to-image` can reliably inline the same-origin SVG / data URLs at export.

## Notes & scope

- Strict TypeScript, no `any`; `pnpm build` passes with no ESLint warnings.
- State is single-slot (no named templates), client-only export, no auth — all
  intentionally out of scope for v1.
- Below ~900px the sidebar stacks above the stage; the preview still scales.
