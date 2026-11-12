import { CheckCircle2, CircleAlert, Clock3, Info, type LucideIcon } from "lucide-react";

type StatusVariant = "danger" | "info" | "neutral" | "success" | "warning";

type StatusBadgeProps = {
  children: string;
  variant?: StatusVariant;
};

const variantStyles: Record<
  StatusVariant,
  { icon: LucideIcon; className: string }
> = {
  success: {
    icon: CheckCircle2,
    className: "bg-movenet-mint text-movenet-forest"
  },
  info: {
    icon: Info,
    className: "bg-blue-50 text-blue-800"
  },
  warning: {
    icon: Clock3,
    className: "bg-amber-50 text-amber-800"
  },
  danger: {
    icon: CircleAlert,
    className: "bg-red-50 text-red-700"
  },
  neutral: {
    icon: Info,
    className: "bg-movenet-cloud text-movenet-muted"
  }
};

export const StatusBadge = ({
  children,
  variant = "neutral"
}: StatusBadgeProps) => {
  const { className, icon: Icon } = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${className}`}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {children}
    </span>
  );
};
