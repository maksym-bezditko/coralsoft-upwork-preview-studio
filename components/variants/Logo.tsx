import { asset } from "@/lib/basePath";

interface LogoProps {
  /** `light` uses the orange-on-transparent mark (for the V2 light canvas). */
  variant?: "white" | "light";
  className?: string;
}

/**
 * Coralsoft wordmark. Plain <img> (not next/image) so html-to-image can inline
 * the same-origin SVG when exporting the stage. White on dark canvases, orange
 * on the V2 light canvas.
 */
export function Logo({ variant = "white", className = "logo" }: LogoProps) {
  const src =
    variant === "light" ? asset("/assets/logo.svg") : asset("/assets/logo-white.svg");
  return <img className={className} src={src} alt="Coralsoft" />;
}
