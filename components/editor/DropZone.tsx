"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { fileToDataURL } from "@/lib/state";
import { cn } from "@/lib/cn";

interface DropZoneProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  compact?: boolean;
}

/** Click-or-drop image picker with preview + clear-on-hover overlay. */
export function DropZone({ label, value, onChange, compact = false }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const pick = async (file: File | null | undefined) => {
    if (!file) return;
    onChange(await fileToDataURL(file));
  };

  return (
    <div
      className={cn(
        "dropzone group",
        drag && "drag",
        value && "has",
        compact && "compact",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        void pick(e.dataTransfer.files?.[0]);
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => void pick(e.target.files?.[0])}
      />
      {value ? (
        <>
          <div
            className="dz-preview"
            style={{ backgroundImage: `url(${value})` }}
          />
          <div className="dz-overlay">
            <span className="dz-overlay-text">{label}</span>
            <button
              type="button"
              className="dz-clear"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              Clear
            </button>
          </div>
        </>
      ) : (
        <div className="dz-empty">
          <Upload size={22} strokeWidth={1.6} />
          <span>{label}</span>
          <em>Click or drop image</em>
        </div>
      )}
    </div>
  );
}
