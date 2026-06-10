import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-[13px] font-normal transition-colors duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri/60",
  {
    variants: {
      variant: {
        ghost:
          "bg-bg-3 border border-line-2 text-fg hover:bg-[#2A2A2E]",
        primary:
          "bg-pri text-bg border border-pri font-medium hover:bg-[#FF8866] hover:border-[#FF8866]",
        outline:
          "bg-transparent border border-line text-fg-70 hover:border-line-2 hover:text-fg",
        danger:
          "bg-transparent border border-[rgba(255,107,107,0.25)] text-[#ff6b6b] hover:bg-[rgba(255,107,107,0.10)] hover:border-[rgba(255,107,107,0.5)]",
      },
      size: {
        default: "px-[14px] py-[9px]",
        full: "w-full px-3 py-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
