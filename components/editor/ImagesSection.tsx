import type { EditorState } from "@/lib/state";
import { DropZone } from "./DropZone";

interface ImagesSectionProps {
  portrait: string | null;
  screens: EditorState["screens"];
  onPortrait: (value: string | null) => void;
  onScreen: (index: number, value: string | null) => void;
}

/** Portrait drop zone + 3-up screen thumbnails. */
export function ImagesSection({
  portrait,
  screens,
  onPortrait,
  onScreen,
}: ImagesSectionProps) {
  return (
    <>
      <DropZone label="Portrait" value={portrait} onChange={onPortrait} />
      <div className="mt-[10px] grid grid-cols-3 gap-[6px]">
        {[0, 1, 2].map((i) => (
          <DropZone
            key={i}
            compact
            label={`Screen 0${i + 1}`}
            value={screens[i]}
            onChange={(v) => onScreen(i, v)}
          />
        ))}
      </div>
    </>
  );
}
