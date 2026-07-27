"use client";

import { Download } from "lucide-react";
import type { ExportFormat } from "@/lib/export";
import { Button } from "@/components/ui/button";

interface StageChromeProps {
  /** Left-hand readout, e.g. "1200 × 675 · C1". */
  spec: string;
  exporting: boolean;
  onExport: (format: ExportFormat) => void;
}

/** Top bar: spec readout + PNG / JPEG export buttons. */
export function StageChrome({ spec, exporting, onExport }: StageChromeProps) {
  return (
    <div className="relative z-[2] flex items-center justify-between border-b border-line bg-[rgba(15,15,16,0.6)] px-7 py-4 backdrop-blur-md">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-50">
        {spec}
      </span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          disabled={exporting}
          onClick={() => onExport("png")}
        >
          <Download size={16} />
          Export PNG
        </Button>
        <Button
          variant="primary"
          disabled={exporting}
          onClick={() => onExport("jpeg")}
        >
          <Download size={16} />
          Export JPEG
        </Button>
      </div>
    </div>
  );
}
