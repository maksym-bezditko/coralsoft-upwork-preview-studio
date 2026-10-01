/**
 * The faint blueprint grid behind the portfolio / catalog covers, re-drawn as
 * vectors from the mockups so it stays crisp in the 2× export. Coordinates are
 * the stage's own 1000 × 750 px.
 *
 * Each entry is `[x1, y1, x2, y2, dashed]`.
 */
type Seg = [number, number, number, number, boolean];

const CATALOG: Seg[] = [
  // verticals
  [40, 0, 40, 137, true],
  [40, 454, 40, 750, true],
  [313.5, 61, 313.5, 142, false],
  [368, 34, 368, 150, true],
  [453, 61, 453, 180, false],
  [498, 344, 498, 423, false],
  [538.5, 466, 538.5, 564, false],
  [555, 107, 555, 181, false],
  [589, 253, 589, 535, true],
  [610, 24, 610, 224, false],
  [785, 26, 785, 104, true],
  [956.5, 0, 956.5, 559, false],
  [985, 272, 985, 345, false],
  [985, 364, 985, 503.5, false],
  [439, 622, 439, 750, true],
  // horizontals
  [0, 58.5, 52, 58.5, true],
  [347, 58.5, 446, 58.5, false],
  [463, 58.5, 1000, 58.5, true],
  [246, 94.5, 480, 94.5, false],
  [833, 94.5, 986, 94.5, false],
  [520, 141.5, 635, 141.5, false],
  [912, 203, 1000, 203, true],
  [500, 320.5, 640, 320.5, true],
  [468, 378, 640, 378, false],
  [894, 438, 1000, 438, true],
  [0, 463.5, 180, 463.5, true],
  [958, 504, 1000, 504, false],
  [433, 509.5, 640, 509.5, false],
  [0, 602, 162, 602, true],
  [392, 622, 470, 622, true],
];

const PORTFOLIO: Seg[] = [
  // verticals
  [40, 0, 40, 750, true],
  [314, 57, 314, 145, false],
  [368, 32, 368, 171, true],
  [453, 59, 453, 169, false],
  [544, 335, 544, 404, false],
  [594, 289, 594, 400, true],
  [609, 18, 609, 73, false],
  [652, 194, 652, 354, false],
  [784.5, 14, 784.5, 92, true],
  [956.5, 0, 956.5, 528, false],
  [985.5, 267, 985.5, 342, false],
  [985.5, 360, 985.5, 501, false],
  // horizontals
  [0, 58, 46, 58, true],
  [347, 56.5, 447, 56.5, true],
  [463, 50, 608, 50, false],
  [611, 45.5, 1000, 45.5, true],
  [246, 91, 472, 91, false],
  [831, 91, 1000, 91, false],
  [912, 202.5, 997, 202.5, true],
  [517, 320, 707, 320, false],
  [491, 377, 635, 377, false],
  [903, 438.5, 997, 438.5, true],
  [0, 461.5, 35, 461.5, false],
  [958, 502, 1000, 502, false],
  [0, 588, 35, 588, true],
];

/** The dashed elbow that runs down from the top edge and turns right. */
const ELBOW = {
  catalog: "M404 0 V134 Q404 140.5 410.5 140.5 H600",
  portfolio: "M404.5 0 V131 Q404.5 138 411.5 138 H472",
} as const;

// Presentation attributes rather than CSS classes: html-to-image serialises the
// SVG without the stylesheet, so class-styled strokes vanish from the export.
const SOLID = { stroke: "#e4e5e8" } as const;
const DASH = { stroke: "#d9dade", strokeDasharray: "5 4" } as const;

export function GridLines({ variant }: { variant: "catalog" | "portfolio" }) {
  const segs = variant === "catalog" ? CATALOG : PORTFOLIO;
  return (
    <svg
      className="pfc-grid"
      viewBox="0 0 1000 750"
      fill="none"
      strokeWidth={1}
      aria-hidden="true"
    >
      {segs.map(([x1, y1, x2, y2, dashed], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          {...(dashed ? DASH : SOLID)}
        />
      ))}
      <path d={ELBOW[variant]} {...DASH} />
    </svg>
  );
}
