import type { ScreenPos } from "@/lib/case-state";
import type { CoverCopy } from "@/components/covers/PortfolioCover";
import { Input } from "@/components/ui/input";
import { Field } from "./Field";
import { DropZone } from "./DropZone";
import { ScreenPosition } from "./ScreenPosition";

interface CoverCopyFieldsProps {
  value: CoverCopy;
  /** Hide the eyebrow and description, for covers that don't render them. */
  titleOnly?: boolean;
  onChange: <K extends keyof CoverCopy>(key: K, value: CoverCopy[K]) => void;
}

/** The four text lines of a portfolio / catalog cover. */
export function CoverCopyFields({ value, onChange, titleOnly = false }: CoverCopyFieldsProps) {
  return (
    <>
      {!titleOnly && (
        <Field label="Eyebrow">
          <Input
            value={value.coverEyebrow}
            onChange={(e) => onChange("coverEyebrow", e.target.value)}
          />
        </Field>
      )}
      <div className="grid grid-cols-2 gap-2">
        <Field label="Title · dark">
          <Input
            value={value.coverTitle}
            onChange={(e) => onChange("coverTitle", e.target.value)}
          />
        </Field>
        <Field label="Title · coral">
          <Input
            value={value.coverAccent}
            onChange={(e) => onChange("coverAccent", e.target.value)}
          />
        </Field>
      </div>
      {!titleOnly && (
        <Field label="Description">
          <Input
            value={value.coverDescription}
            onChange={(e) => onChange("coverDescription", e.target.value)}
          />
        </Field>
      )}
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
        {titleOnly ? "Long titles shrink to fit" : "Long titles shrink to fit · clear a field to hide it"}
      </p>
    </>
  );
}

interface CoverPhotoFieldProps {
  portrait: string | null;
  onPortrait: (value: string | null) => void;
  pos: ScreenPos;
  onPos: (value: ScreenPos) => void;
  scale: number;
  onScale: (value: number) => void;
}

/** Developer photo: drop zone plus offset / size controls once one is in. */
export function CoverPhotoField({
  portrait,
  onPortrait,
  pos,
  onPos,
  scale,
  onScale,
}: CoverPhotoFieldProps) {
  return (
    <>
      <DropZone label="Developer photo" value={portrait} onChange={onPortrait} />
      <p className="mt-[8px] font-mono text-[9px] uppercase tracking-[0.14em] text-fg-50">
        Use a cut-out PNG — it sits on the canvas with no frame
      </p>
      {portrait && (
        <ScreenPosition
          value={pos}
          onChange={onPos}
          scale={scale}
          onScaleChange={onScale}
        />
      )}
    </>
  );
}
