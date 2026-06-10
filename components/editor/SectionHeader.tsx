interface SectionHeaderProps {
  children: React.ReactNode;
}

/** Mono uppercase label that opens each sidebar section. */
export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h2 className="mb-[14px] font-mono text-[10px] uppercase tracking-[0.22em] text-fg-50">
      {children}
    </h2>
  );
}
