import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type Variant = "gold" | "outline" | "outlineDark" | "whatsapp" | "maroon";
type Size = "md" | "lg" | "sm";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  gold: "bg-gradient-to-b from-gold-light to-gold text-maroon-950 hover:from-[#efd896] hover:to-gold-light shadow-[0_6px_20px_-8px_rgba(200,162,78,0.7)]",
  outline: "border border-gold/80 text-gold-light hover:bg-gold hover:text-maroon-950",
  outlineDark: "border border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-ivory",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  maroon: "bg-maroon-800 text-ivory hover:bg-maroon-700",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-9 text-base",
};

export function Button({
  variant = "gold",
  size = "md",
  href,
  external,
  onClick,
  type = "button",
  disabled,
  className,
  ariaLabel,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide whitespace-nowrap transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );
  const motionProps = { whileTap: { scale: 0.97 }, whileHover: { y: -1 } };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} className={classes} aria-label={ariaLabel} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
}
