import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-movenet-forest text-white shadow-sm hover:bg-movenet-emerald hover:shadow-md",
  secondary:
    "border border-movenet-border bg-white text-movenet-forest hover:border-movenet-emerald hover:bg-movenet-mint",
  ghost:
    "text-movenet-forest hover:bg-movenet-mint"
};

export const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    className
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};