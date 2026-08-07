"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { ScreenPos } from "@/lib/case-state";
import { ImageSlot } from "@/components/variants/ImageSlot";

interface DraggableSlotProps {
  src: string | null;
  hint: string;
  pos: ScreenPos;
  /**
   * What `pos` means, mirroring how `case.css` applies it.
   *
   * `crop` — a screenshot filling its frame under `background-size: cover`.
   * `pos` is a `background-position` percentage, so it can only choose which
   * slice of the overflow shows, and 0–100 covers everything there is.
   *
   * `offset` — a photo translated freely, in percent of the frame, from
   * centre. Nothing is clamped: a person can be pushed clean off an edge,
   * which a crop window cannot express.
   */
  mode?: "crop" | "offset";
  /** Omit to make the slot static. */
  onPosChange?: (pos: ScreenPos) => void;
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/**
 * An image slot you can grab and drag.
 *
 * Both modes convert a pointer delta into a percentage, but they divide by
 * different things, because the percentage means different things.
 *
 * In `crop`, `background-position` interpolates across `frameSize - imageSize`,
 * so the delta is divided by that difference — not by the frame, which would
 * make the image race ahead of or lag behind the cursor. In `offset`, the
 * translate is a percentage of the frame itself, so the delta is divided by the
 * frame and nothing is clamped.
 *
 * Every measurement is in viewport pixels, so the CSS transform `StagePreview`
 * uses to fit the stage on screen cancels out and the image tracks the cursor
 * 1:1 at any zoom.
 */
export function DraggableSlot({
  src,
  hint,
  pos,
  mode = "crop",
  onPosChange,
}: DraggableSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Decoding is async, so the natural size is resolved up front rather than
  // read off a throwaway Image at pointerdown, where it would still be 0.
  const natural = useRef<{ w: number; h: number } | null>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    fromX: number;
    fromY: number;
    /** Pixels one whole percentage point of travel is worth, per axis. */
    perPointX: number;
    perPointY: number;
  } | null>(null);

  useEffect(() => {
    natural.current = null;
    if (!src) return;
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (alive) natural.current = { w: img.naturalWidth, h: img.naturalHeight };
    };
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  const begin = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!onPosChange || !src || e.button !== 0) return;
    const size = natural.current;
    // The wrapper, not the slot: in `offset` mode the slot itself is
    // translated, so its own rect has already moved.
    const frame = ref.current?.getBoundingClientRect();
    if (!size || !frame || !frame.width || !frame.height) return;

    // `crop` divides by the overflow, `offset` by the frame. Negated so the
    // maths below is one shared expression: in `crop` a drag right reveals the
    // image's left side (a lower percentage), in `offset` it simply moves right.
    const cover = Math.max(frame.width / size.w, frame.height / size.h);
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      fromX: pos.x,
      fromY: pos.y,
      perPointX:
        mode === "offset"
          ? frame.width / 100
          : -(size.w * cover - frame.width) / 100,
      perPointY:
        mode === "offset"
          ? frame.height / 100
          : -(size.h * cover - frame.height) / 100,
    };
    // Capture keeps the drag alive past the frame's edges. It throws on a
    // pointer id the element never received, which must not kill the drag.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* uncaptured drags still track via the element's own move events */
    }
    e.preventDefault();
  };

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !onPosChange) return;
    // In `crop` an axis where the image exactly fills the frame has no play at
    // all; in `offset` there is always play, and no ceiling on it.
    const axis = (delta: number, from: number, perPoint: number, current: number) => {
      if (Math.abs(perPoint) < 0.005) return current;
      const next = from + delta / perPoint;
      return mode === "offset" ? next : clamp(next);
    };
    const x = axis(e.clientX - d.startX, d.fromX, d.perPointX, pos.x);
    const y = axis(e.clientY - d.startY, d.fromY, d.perPointY, pos.y);
    if (x !== pos.x || y !== pos.y) onPosChange({ x, y });
  };

  const end = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* never captured */
    }
  };

  const grabbable = Boolean(onPosChange && src);

  return (
    <div
      ref={ref}
      className={grabbable ? "slot-wrap drag-slot" : "slot-wrap"}
      onPointerDown={begin}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      title={grabbable ? "Drag to reframe" : undefined}
    >
      {/* In `offset` mode the position is a transform applied by `case.css`,
          so no inline background-position — it would win over the `center`
          that translate is measured from. */}
      <ImageSlot
        src={src}
        hint={hint}
        position={mode === "crop" ? `${pos.x}% ${pos.y}%` : undefined}
      />
    </div>
  );
}
