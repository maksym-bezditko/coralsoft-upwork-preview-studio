import type { CaseEditorState } from "@/lib/case-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./Field";

interface CaseCopyFieldsProps {
  state: CaseEditorState;
  onChange: <K extends keyof CaseEditorState>(
    key: K,
    value: CaseEditorState[K],
  ) => void;
}

/** Every text line on the cover. Layout-specific fields are labeled as such. */
export function CaseCopyFields({ state, onChange }: CaseCopyFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Product">
          <Input
            value={state.product}
            onChange={(e) => onChange("product", e.target.value)}
          />
        </Field>
        <Field label="Category">
          <Input
            value={state.category}
            onChange={(e) => onChange("category", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Domain / subtitle">
        <Input
          value={state.domain}
          onChange={(e) => onChange("domain", e.target.value)}
        />
      </Field>

      <Field label="Headline">
        <Textarea
          rows={3}
          value={state.headline}
          onChange={(e) => onChange("headline", e.target.value)}
        />
      </Field>

      <Field label="Summary" hint="C4">
        <Textarea
          rows={4}
          value={state.summary}
          onChange={(e) => onChange("summary", e.target.value)}
        />
      </Field>

      <Field label="Address bar / URL" hint="C1 C2">
        <Input
          value={state.urlHint}
          onChange={(e) => onChange("urlHint", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Meta line">
          <Input
            value={state.metaLine}
            onChange={(e) => onChange("metaLine", e.target.value)}
          />
        </Field>
        <Field label="Numeral" hint="C4">
          <Input
            value={state.numeral}
            onChange={(e) => onChange("numeral", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Screenshot placeholder">
        <Input
          value={state.screenHint}
          onChange={(e) => onChange("screenHint", e.target.value)}
        />
      </Field>
    </>
  );
}
