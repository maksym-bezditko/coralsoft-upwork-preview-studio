# Coralsoft — Upwork Preview Studio

An internal tool for generating **Upwork Project Catalog** preview images. Pick a
layout variant, edit the copy, drop in a portrait + screenshots, optionally
re-tint the primary/secondary colors, and export a pixel-accurate **2000 × 1500**
PNG or JPEG (a 2× capture of the 1000 × 750 stage) ready to upload to Upwork.

This is a clean **Next.js 15 + TypeScript + Tailwind v4** rebuild of the original
Babel-in-the-browser prototype, with proper component architecture and type safety.

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

## How it works

- A single client page (`app/page.tsx`) holds all editor state in `useState`
  and mirrors it to `localStorage` under `coralsoft-upwork-editor-v1`. State is
  seeded from defaults on the server, then hydrated from storage after mount to
  avoid SSR mismatch.
- The sidebar edits state; the stage renders the selected variant live inside a
  fixed 1000 × 750 frame that is scaled (display only) to fit the viewport.
- Export captures the **native-size** `#export-stage` node with `html-to-image`
  at `pixelRatio: 2`, so the download is 2000 × 1500 regardless of on-screen scale.
- Each variant pipes the editor colors into CSS custom properties
  (`--pri` / `--sec`); the shared `variant.css` references those vars (with
  `color-mix(...)` derivations) so the color pickers retint the whole composition.

## The 6 variants

| ID | Name | Notes |
|----|------|-------|
| v1 | Dark editorial | Coralsoft house style; portrait + 3-phone cascade + title/role cards |
| v2 | Light premium | V1 composition inverted onto a warm off-white canvas |
| v3 | Editorial poster | Oversized stroke numeral, tall portrait, editorial title block |
| v4 | Coral forward | Primary-color canvas, dark cards, coral badge |
| v5 | Code terminal | Terminal-window portrait + live code-editor title card |
| v6 | Diagonal split | Dark/coral diagonal halves, portrait over the seam |

## Component tree

```
app/
  layout.tsx                  # fonts (Outfit + JetBrains Mono via next/font), metadata
  page.tsx                    # client component — owns state, wires sidebar + stage
  globals.css                 # Tailwind v4 @theme tokens + editor chrome + drop-zone CSS

components/editor/            # the left rail + stage chrome
  Sidebar.tsx                 # composes every section below
  SectionHeader.tsx           # mono uppercase section label
  VariantPicker.tsx           # 2×3 grid of layout tiles
  Field.tsx                   # labeled form-field wrapper
  CopyFields.tsx              # title / role / code tag / kicker inputs
  ColorRow.tsx                # color input + validated hex + preset swatches
  Colors.tsx                  # both color rows + reset-to-brand
  DropZone.tsx                # click/drag image picker with preview + clear
  ImagesSection.tsx           # portrait + 3-up screen thumbnails
  StageChrome.tsx             # spec readout + PNG/JPEG export buttons
  StagePreview.tsx            # ResizeObserver-driven scaled 1000×750 viewport
  ResetAll.tsx                # danger button behind a confirm dialog

components/variants/          # the 6 self-contained 1000×750 compositions
  V1Dark / V2Light / V3Poster / V4Coral / V5Terminal / V6Split.tsx
  ImageSlot.tsx               # placeholder/preview slot (dashed hint ↔ cover image)
  PhoneTrio.tsx               # the 3-phone cascade + single Phone bezel
  Logo.tsx                    # Coralsoft wordmark (white / orange)
  index.tsx                   # variant id → component registry; imports variant.css
  variant.css                 # shared stylesheet (.uwe .v1..v6) — ported verbatim

components/ui/                # shadcn-style primitives (button, input, textarea, dialog)

lib/
  state.ts                    # types, defaults, swatches, localStorage load/save
  export.ts                   # html-to-image PNG/JPEG wrapper (2× upscale)
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
