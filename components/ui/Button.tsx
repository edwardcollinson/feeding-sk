import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-emerald text-white hover:bg-emerald/90",
  secondary:
    "bg-bubblegum text-white hover:bg-bubblegum/90",
  outline:
    "border-2 border-evergreen text-evergreen hover:bg-evergreen hover:text-offwhite",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
