interface ColorRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  swatches: string[];
}

const HEX_RE = /^#[0-9A-Fa-f]{0,6}$/;

/** Native color input + validated hex field + preset swatches. */
export function ColorRow({ label, value, onChange, swatches }: ColorRowProps) {
  return (
    <div className="mb-3 last:mb-0">
      <span className="mb-[6px] block text-xs text-fg-70">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="relative h-[38px] w-[38px] cursor-pointer overflow-hidden rounded-lg border border-line"
          style={{ background: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={`${label} color picker`}
          />
        </div>
        <input
          value={value.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value;
            if (HEX_RE.test(v)) onChange(v);
          }}
          aria-label={`${label} hex value`}
          className="min-w-[100px] flex-1 rounded-lg border border-line bg-bg-3 px-3 py-[10px] font-mono text-xs uppercase text-fg outline-none focus:border-pri"
        />
        <div className="mt-[6px] flex w-full gap-[6px]">
          {swatches.map((s) => (
            <button
              key={s}
              type="button"
              title={s}
              aria-label={s}
              onClick={() => onChange(s)}
              className="h-[22px] w-[22px] cursor-pointer rounded-full border border-white/10 p-0 transition-transform duration-150 hover:scale-110"
              style={{
                background: s,
                outline:
                  value.toLowerCase() === s.toLowerCase()
                    ? "2px solid #fff"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
