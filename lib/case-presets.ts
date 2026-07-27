import type { CaseStat, CaseTag } from "./case-state";

/**
 * The editable copy of a case-study cover — everything except the layout,
 * the colors, and the dropped screenshot. Applying a preset overwrites exactly
 * these fields and leaves the rest of the editor state alone.
 */
export interface CaseCopy {
  product: string;
  domain: string;
  category: string;
  metaLine: string;
  headline: string;
  summary: string;
  numeral: string;
  urlHint: string;
  techTags: CaseTag[];
  stats: CaseStat[];
  screenHint: string;
}

export interface CasePreset {
  id: string;
  label: string;
  copy: CaseCopy;
}

const META = "Coralsoft · 2026";

/** `accent` marks the chips rendered in the primary color. */
function tags(list: string[], accent: number[]): CaseTag[] {
  return list.map((text, i) => ({ text, accent: accent.includes(i) }));
}

/**
 * The six production case studies, ported from the `cases-data.js` corpus in
 * the Claude Design project (Case Study Previews.html). Only the cover-facing
 * fields are carried over — the long-form brief / modules / architecture blocks
 * live with the written case study, not the preview image.
 */
export const CASE_PRESETS: CasePreset[] = [
  {
    id: "tres-community-intelligence",
    label: "TRES",
    copy: {
      product: "TRES",
      domain: "jointres.co",
      category: "B2B SaaS",
      metaLine: META,
      headline: "AI-powered community intelligence for brand partnerships",
      summary:
        "A B2B SaaS platform connecting brands with communities — built end-to-end as a monorepo with a real-time Convex backend, a hybrid AI search engine across 85,000 communities, Stripe partnership payments, and a Shopify affiliate app.",
      numeral: "01",
      urlHint: "jointres.co",
      techTags: tags(
        [
          "Convex backend",
          "Typesense + LLM ranking",
          "Anthropic Claude",
          "Stripe Connect",
          "Shopify embedded app",
          "Monorepo",
        ],
        [3, 4, 5],
      ),
      stats: [
        { num: "85K", lbl: "Enriched research communities in the production corpus" },
        { num: "28×", lbl: "Corpus growth during the Coralsoft engagement" },
        { num: "6", lbl: "Distinct product surfaces sharing one typed backend" },
      ],
      screenHint: "TRES — drop desktop screen",
    },
  },
  {
    id: "hostmost-event-finance",
    label: "HostMost",
    copy: {
      product: "HostMost",
      domain: "Event & group finance app · iOS & Android",
      category: "Mobile",
      metaLine: META,
      headline:
        "Event planning, shared expenses and a poker chip ledger — in one app",
      summary:
        "A greenfield cross-platform mobile app that brings event planning, shared expenses, debt settlement, and group chat into one place — designed, built, and shipped to the App Store and Google Play by Coralsoft.",
      numeral: "02",
      urlHint: "coralsoft.io/cases/hostmost",
      techTags: tags(
        [
          "React Native + Expo",
          "Supabase",
          "Real-time finances",
          "Poker chip ledger",
          "EAS + OTA updates",
          "iOS & Android",
        ],
        [0, 1],
      ),
      stats: [
        { num: "70+", lbl: "Incremental PostgreSQL migrations through v1.1.31" },
        { num: "34+", lbl: "App routes shipped across six feature domains" },
        {
          num: "6",
          lbl: "Feature domains — events, finance, chips, messaging, venues, social graph",
        },
      ],
      screenHint: "HostMost — drop app screen",
    },
  },
  {
    id: "kluuu-ai-quiz-platform",
    label: "KLUUU",
    copy: {
      product: "KLUUU",
      domain: "AI quiz platform",
      category: "EdTech",
      metaLine: META,
      headline: "No-code prototype rebuilt as a production EdTech SaaS",
      summary:
        "A no-code Lovable prototype rebuilt from scratch into a production-grade EdTech SaaS — with a multimodal AI quiz generation pipeline, seven question types, Stripe subscriptions, and gamified learning streaks.",
      numeral: "03",
      urlHint: "coralsoft.io/cases/kluuu",
      techTags: tags(
        [
          "React + TypeScript",
          "Supabase Edge Functions",
          "Google Gemini AI",
          "Stripe",
          "EN / DE i18n",
          "Freemium SaaS",
        ],
        [1, 2, 4, 5],
      ),
      stats: [
        { num: "7", lbl: "Distinct question types with dedicated components and validation" },
        { num: "11", lbl: "Supabase Edge Functions covering the entire backend surface" },
        { num: "<10s", lbl: "From file upload to first interactive question" },
      ],
      screenHint: "KLUUU — drop quiz screen",
    },
  },
  {
    id: "haizel-digital-business-card",
    label: "HAIZEL",
    copy: {
      product: "HAIZEL",
      domain: "Blkbook · professional networking PWA",
      category: "SaaS",
      metaLine: META,
      headline:
        "A digital business card built to replace the paper one — and LinkedIn",
      summary:
        "A mobile-first progressive web app that replaces the paper business card with a fully customisable digital identity — built from zero to production by Coralsoft.",
      numeral: "04",
      urlHint: "blkbook.app",
      techTags: tags(
        [
          "Next.js 16",
          "Supabase",
          "Google Gemini AI",
          "Apple Wallet",
          "PWA",
          "Invite-only SaaS",
        ],
        [1, 2, 4],
      ),
      stats: [
        {
          num: "15",
          lbl: "Typed profile component types — Hero, Portfolio, Timeline, Press, Quote…",
        },
        { num: "6+", lbl: "Role-based default stacks so users never start from blank" },
        { num: "0→1", lbl: "Full-stack greenfield build, zero codebase to production launch" },
      ],
      screenHint: "HAIZEL — drop profile screen",
    },
  },
  {
    id: "calido-ai-social-planning",
    label: "Calido",
    copy: {
      product: "Calido",
      domain: "caleido.ai · consumer social PWA",
      category: "Consumer",
      metaLine: META,
      headline: "Codebase rescue plus a flagship AI planner — shipped",
      summary:
        "A social hangout coordination app rescued from an incomplete, fragile codebase — stabilised, completed, and shipped to production by Coralsoft with a flagship AI planning assistant at its core.",
      numeral: "05",
      urlHint: "caleido.ai",
      techTags: tags(
        [
          "Next.js 15",
          "Redux Toolkit + RTK Query",
          "AI chat assistant",
          "Google Places",
          "Firebase FCM",
          "PWA",
        ],
        [1, 2],
      ),
      stats: [
        { num: "7", lbl: "Structured AI response types rendered as rich UI, not text walls" },
        { num: "3", lbl: "Notification channels built — push, web push, SMS" },
        { num: "0→1", lbl: "Broken MVP rescued to a shippable production product" },
      ],
      screenHint: "Calido — drop app screen",
    },
  },
  {
    id: "wemetvia-backend-testing",
    label: "WeMetVia",
    copy: {
      product: "WeMetVia",
      domain: "API engine test suite",
      category: "Backend",
      metaLine: META,
      headline: "A backend test suite built where the runtime did not allow one",
      summary:
        "A full backend test suite built from scratch for a Deno-based Supabase Edge Functions API — unit tests, integration tests, schema validation, a production-grade mock layer, and CI/CD quality gates across 13 feature modules.",
      numeral: "06",
      urlHint: "coralsoft.io/cases/wemetvia",
      techTags: tags(
        ["Deno 2.x", "Vitest", "Hono", "Supabase", "Zod", "Stripe + Twilio"],
        [0, 1, 4],
      ),
      stats: [
        { num: "50", lbl: "Test files across 13 feature modules" },
        { num: "26", lbl: "Geofence edge case tests for nearby discovery flows" },
        { num: "0", lbl: "Live database calls in the entire test suite" },
      ],
      screenHint: "WeMetVia — drop coverage report screen",
    },
  },
];
