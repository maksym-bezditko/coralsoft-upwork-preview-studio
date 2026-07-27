import "./case.css";

import type { ComponentType } from "react";
import type { CaseVariantId } from "@/lib/case-state";
import type { CaseVariantProps } from "./types";
import { C1Master } from "./C1Master";
import { C2Light } from "./C2Light";
import { C3Stat } from "./C3Stat";
import { C4Poster } from "./C4Poster";
import { C5Coral } from "./C5Coral";

export const CASE_COMPONENTS: Record<
  CaseVariantId,
  ComponentType<CaseVariantProps>
> = {
  c1: C1Master,
  c2: C2Light,
  c3: C3Stat,
  c4: C4Poster,
  c5: C5Coral,
};

export type { CaseVariantProps };
