import * as React from "react";
import { cn } from "@/lib/cn";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-lg border border-line bg-bg-3 px-3 py-[10px] text-sm text-fg transition-colors duration-150 outline-none focus:border-pri focus:bg-[#25252A]",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
