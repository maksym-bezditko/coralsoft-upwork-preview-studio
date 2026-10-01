"use client";

import "@/components/variants/variant.css";
import "./cover.css";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import type { ScreenPos } from "@/lib/case-state";
import { DraggableSlot } from "@/components/cases/DraggableSlot";
import { Phone } from "@/components/variants/PhoneTrio";
import { GridLines } from "./GridLines";
import { SILHOUETTE } from "./silhouettes";

/**
 * Which cover. All three share the canvas, wordmark, two-tone title and the
 * person on the right; they differ in what sits under the copy:
 *
 * - `catalog` — a service cover: chat bubbles, a bigger photo.
 * - `web` — a portfolio case: one browser window with a screenshot.
 * - `mobile` — a portfolio case: three phones with app screens.
 */
export type CoverKind = "catalog" | "web" | "mobile";

/** The editable copy every cover carries. */
export interface CoverCopy {
  coverEyebrow: string;
  coverTitle: string; // first title line, dark
  coverAccent: string; // second title line, coral
  coverDescription: string;
}

/** The person photo — free offset from centre, plus size, in percent. */
export interface CoverPhoto {
  coverPhotoPos: ScreenPos;
  coverPhotoScale: number;
}

export interface PortfolioCoverProps extends CoverCopy, CoverPhoto {
  kind: CoverKind;
  portrait: string | null;
  /** Fires while the photo is dragged on the stage. */
  onPhotoPosChange?: (pos: ScreenPos) => void;
  /** `web` only. */
  screenshot?: string | null;
  screenPos?: ScreenPos;
  onScreenPosChange?: (pos: ScreenPos) => void;
  /** `mobile` only. */
  screens?: readonly (string | null)[];
}

/**
 * Shrinks a single-line title until it fits `max` px. The mockup sizes are the
 * ceiling; a longer word steps down rather than running into the photo.
 */
function useFitWidth(text: string, max: number) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.removeProperty("--fit");
      const w = el.scrollWidth;
      if (w > max) el.style.setProperty("--fit", String(max / w));
    };
    fit();
    // The webfont may land after the first measure, changing every width.
    let alive = true;
    void document.fonts?.ready.then(() => {
      if (alive) fit();
    });
    return () => {
      alive = false;
    };
  }, [text, max]);
  return ref;
}

/** Title width ceilings: clear of the head on the catalog cover, and of the
 *  decorative window on the portfolio ones. */
const TITLE_MAX: Record<CoverKind, number> = { catalog: 570, web: 470, mobile: 470 };

export function PortfolioCover(props: PortfolioCoverProps) {
  const { kind, coverEyebrow, coverTitle, coverAccent, coverDescription } = props;
  const portfolio = kind !== "catalog";
  // The web cover gives the screenshot the room: no eyebrow, no description.
  const titleOnly = kind === "web";
  const line1 = useFitWidth(coverTitle, TITLE_MAX[kind]);
  const line2 = useFitWidth(coverAccent, TITLE_MAX[kind]);

  const style = {
    "--photo-scale": props.coverPhotoScale,
    "--photo-x": props.coverPhotoPos.x,
    "--photo-y": props.coverPhotoPos.y,
  } as CSSProperties;

  return (
    <div className={`pfc pfc-${kind}`} style={style}>
      <GridLines variant={portfolio ? "portfolio" : "catalog"} />
      <span className="pfc-sq pfc-sq-1" />
      <span className="pfc-sq pfc-sq-2" />

      {portfolio ? <MiniWindow /> : <CatalogBubbles />}

      <Photo {...props} />

      <div className="pfc-logo">coralsoft</div>
      {!titleOnly && coverEyebrow && <div className="pfc-eyebrow">{coverEyebrow}</div>}
      <h2 className="pfc-title">
        <span ref={line1} className="pfc-l1">
          {coverTitle}
        </span>
        <span ref={line2} className="pfc-l2">
          {coverAccent}
        </span>
      </h2>
      {!titleOnly && coverDescription && <p className="pfc-desc">{coverDescription}</p>}

      {kind === "web" && (
        <Browser
          src={props.screenshot ?? null}
          pos={props.screenPos ?? { x: 50, y: 0 }}
          onPosChange={props.onScreenPosChange}
        />
      )}
      {kind === "mobile" && <Phones screens={props.screens ?? []} />}
    </div>
  );
}

/** The person — a silhouette placeholder until a photo is dropped in. No frame:
 *  a cut-out PNG sits straight on the canvas. */
function Photo({
  kind,
  portrait,
  coverPhotoPos,
  onPhotoPosChange,
}: PortfolioCoverProps) {
  if (!portrait) {
    return (
      <>
        <svg className="pfc-silhouette" viewBox="0 0 1000 750" aria-hidden="true">
          <path
            d={kind === "catalog" ? SILHOUETTE.catalog : SILHOUETTE.portfolio}
            fill="#d0d0d3"
          />
        </svg>
        <span className="pfc-photo-hint">Your photo</span>
      </>
    );
  }
  return (
    <div className="pfc-photo">
      <DraggableSlot
        src={portrait}
        hint=""
        pos={coverPhotoPos}
        mode="offset"
        onPosChange={onPhotoPosChange}
      />
    </div>
  );
}

function PlaceholderIcon() {
  return (
    <svg className="pfc-ph-icon" viewBox="0 0 80 64" fill="#a4a5aa" aria-hidden="true">
      <rect x="2.5" y="2.5" width="75" height="59" rx="5" fill="none" stroke="#a4a5aa" strokeWidth={5} />
      <circle cx="58" cy="19" r="7" />
      <path d="M13 53 L33 29 L45 43 L52 36 L67 53 Z" />
    </svg>
  );
}

function Browser({
  src,
  pos,
  onPosChange,
}: {
  src: string | null;
  pos: ScreenPos;
  onPosChange?: (pos: ScreenPos) => void;
}) {
  return (
    <div className="pfc-browser">
      <div className="pfc-browser-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="pfc-browser-view">
        {src ? (
          <DraggableSlot src={src} hint="" pos={pos} onPosChange={onPosChange} />
        ) : (
          <div className="pfc-empty">
            <PlaceholderIcon />
            <span>Project screenshot</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** The same phone hardware the classic mobile layouts use (`.v-phone`),
 *  placed where the mockup puts its three screens. */
function Phones({ screens }: { screens: readonly (string | null)[] }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Phone
          key={i}
          className={`pfc-phone pfc-phone-${i + 1}`}
          src={screens[i] ?? null}
          hint=""
          empty={
            <div className="pfc-empty">
              <PlaceholderIcon />
              <span>Screen 0{i + 1}</span>
            </div>
          }
        />
      ))}
    </>
  );
}

/** Three chat bubbles under the catalog copy. */
function CatalogBubbles() {
  return (
    <div aria-hidden="true">
      <div className="pfc-bub pfc-bub-a pink tail-l">
        <i style={{ width: 139.5 }} />
        <i style={{ width: 97 }} />
      </div>
      <div className="pfc-bub pfc-bub-b gray tail-l">
        <b />
        <b />
        <b />
      </div>
      <div className="pfc-bub pfc-bub-c pink tail-r">
        <i style={{ width: 77.5 }} />
        <i style={{ width: 54 }} />
      </div>
    </div>
  );
}

/** The faded app window + chat bubbles behind the portfolio title. */
function MiniWindow() {
  return (
    <div className="pfc-deco" aria-hidden="true">
      <div className="pfc-mini">
        <div className="pfc-mini-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="pfc-mini-row" style={{ top: 47 }}>
          <b />
          <i style={{ width: 89 }} />
        </div>
        <div className="pfc-mini-row" style={{ top: 75 }}>
          <b />
          <i style={{ width: 56 }} />
        </div>
      </div>
      <div className="pfc-bub pfc-bub-d gray tail-l">
        <i style={{ width: 74 }} />
        <i style={{ width: 64 }} />
        <i style={{ width: 45 }} />
      </div>
      <div className="pfc-bub pfc-bub-e pink tail-r">
        <i style={{ width: 73 }} />
        <i style={{ width: 51 }} />
      </div>
      <div className="pfc-bub pfc-bub-f gray">
        <b className="w" />
        <b />
        <b />
      </div>
    </div>
  );
}
