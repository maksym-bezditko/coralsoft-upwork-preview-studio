import type { ReactNode } from "react";
import { ImageSlot } from "./ImageSlot";

interface PhoneProps {
  className: string;
  src: string | null;
  hint: string;
  /** Rendered on the screen instead of the hint while there's no image. */
  empty?: ReactNode;
}

/** A single phone bezel (frame + screen slot + notch). */
export function Phone({ className, src, hint, empty }: PhoneProps) {
  return (
    <div className={`v-phone ${className}`}>
      <div className="screen">
        {!src && empty ? empty : <ImageSlot src={src} hint={hint} />}
      </div>
      <div className="notch" />
    </div>
  );
}

interface PhoneTrioProps {
  screens: [string | null, string | null, string | null];
  hints: [string, string, string];
  /** Position class names in [left, center, right] order. */
  classes?: [string, string, string];
}

/**
 * The 3-phone cascade used by V1 / V2. The center phone (index 1) is rendered
 * last to match the prototype's DOM order; CSS handles its larger size + z-index.
 */
export function PhoneTrio({
  screens,
  hints,
  classes = ["p-left", "p-center", "p-right"],
}: PhoneTrioProps) {
  return (
    <>
      <Phone className={classes[0]} src={screens[0]} hint={hints[0]} />
      <Phone className={classes[2]} src={screens[2]} hint={hints[2]} />
      <Phone className={classes[1]} src={screens[1]} hint={hints[1]} />
    </>
  );
}
