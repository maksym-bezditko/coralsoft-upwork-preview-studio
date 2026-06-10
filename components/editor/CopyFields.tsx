import type { EditorState } from "@/lib/state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./Field";

interface CopyFieldsProps {
  state: EditorState;
  onChange: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
}

/** Title / role / code tag / kicker text inputs. */
export function CopyFields({ state, onChange }: CopyFieldsProps) {
  return (
    <>
      <Field label="Service title">
        <Textarea
          rows={2}
          value={state.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </Field>
      <Field label="Role / subtitle">
        <Input
          value={state.role}
          onChange={(e) => onChange("role", e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Code tag">
          <Input
            value={state.codeTag}
            onChange={(e) => onChange("codeTag", e.target.value)}
          />
        </Field>
        <Field label="Kicker">
          <Input
            value={state.kicker}
            onChange={(e) => onChange("kicker", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}
