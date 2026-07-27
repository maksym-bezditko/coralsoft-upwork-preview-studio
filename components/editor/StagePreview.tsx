"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface StagePreviewProps {
  /** Ref attached to the native-size #export-stage node (the capture target). */
  exportRef: RefObject<HTMLDivElement | null>;
  /** Native stage size in px — 1000×750 for Upwork, 1200×675 for case studies. */
  width: number;
  height: number;
  children: React.ReactNode;
}

/**
 * Centers the native-size frame and scales it down to fit the available area
 * (`scale = min(w/width, h/height, 1)`). Scaling is display-only — the inner
 * #export-stage keeps its native box so exports stay pixel-accurate.
 */
export function StagePreview({
  exportRef,
  width,
  height,
  children,
}: StagePreviewProps) {
  const padRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const pad = padRef.current;
    if (!pad) return;
    const fit = () => {
      const w = pad.clientWidth - 64;
      const h = pad.clientHeight - 64;
      const s = Math.min(w / width, h / height, 1);
      setScale(s > 0 ? s : 1);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(pad);
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div
      ref={padRef}
      className="relative z-[1] flex items-center justify-center overflow-hidden"
    >
      <div
        className="origin-center transition-transform duration-200 ease-out"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          id="export-stage"
          ref={exportRef}
          style={{ width, height }}
          className="shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_var(--color-line)]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
