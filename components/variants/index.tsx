import "./variant.css";

import type { ComponentType } from "react";
import type { VariantId } from "@/lib/state";
import type { VariantProps } from "./types";
import { V1Dark } from "./V1Dark";
import { V2Light } from "./V2Light";
import { V3Poster } from "./V3Poster";
import { V4Coral } from "./V4Coral";
import { V5Terminal } from "./V5Terminal";
import { V6Split } from "./V6Split";

export const VARIANT_COMPONENTS: Record<VariantId, ComponentType<VariantProps>> = {
  v1: V1Dark,
  v2: V2Light,
  v3: V3Poster,
  v4: V4Coral,
  v5: V5Terminal,
  v6: V6Split,
};

export type { VariantProps };
