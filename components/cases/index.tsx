import "./case.css";

import type { ComponentType } from "react";
import type { ClassicCaseVariantId } from "@/lib/case-state";
import type { CaseVariantProps } from "./types";
import { C1Master } from "./C1Master";
import { C2Light } from "./C2Light";
import { C3Stat } from "./C3Stat";
import { C4Poster } from "./C4Poster";
import { C5Coral } from "./C5Coral";
import {
  P1Photo,
  P2Photo,
  P3Photo,
  P4Photo,
  P5Photo,
  P6Photo,
  P7Photo,
} from "./PhotoLayouts";

export const CASE_COMPONENTS: Record<
  ClassicCaseVariantId,
  ComponentType<CaseVariantProps>
> = {
  c1: C1Master,
  c2: C2Light,
  c3: C3Stat,
  c4: C4Poster,
  c5: C5Coral,
  p1: P1Photo,
  p2: P2Photo,
  p3: P3Photo,
  p4: P4Photo,
  p5: P5Photo,
  p6: P6Photo,
  p7: P7Photo,
};

export type { CaseVariantProps };
