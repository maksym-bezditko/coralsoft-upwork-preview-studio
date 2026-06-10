interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

/** Labeled form field wrapper used across the copy + image sections. */
export function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="mb-3 flex flex-col gap-[6px] last:mb-0">
      <span className="flex justify-between text-xs text-fg-70">
        {label}
        {hint && (
          <em className="font-mono text-[11px] not-italic text-fg-50">{hint}</em>
        )}
      </span>
      {children}
    </label>
  );
}
