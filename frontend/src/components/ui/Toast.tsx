import {
  CheckCircle2,
  CircleAlert,
  Info,
  X,
  type LucideIcon
} from "lucide-react";

type ToastVariant = "error" | "info" | "success";

type ToastProps = {
  description: string;
  onDismiss?: () => void;
  title: string;
  variant?: ToastVariant;
};

const variantStyles: Record<
  ToastVariant,
  { icon: LucideIcon; iconClassName: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClassName: "text-movenet-emerald"
  },
  info: {
    icon: Info,
    iconClassName: "text-blue-700"
  },
  error: {
    icon: CircleAlert,
    iconClassName: "text-red-700"
  }
};

export const Toast = ({
  description,
  onDismiss,
  title,
  variant = "info"
}: ToastProps) => {
  const { icon: Icon, iconClassName } = variantStyles[variant];

  return (
    <div
      aria-live="polite"
      className="flex items-start gap-3 rounded-2xl border border-movenet-border bg-white p-4 shadow-lg"
      role={variant === "error" ? "alert" : "status"}
    >
      <Icon aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${iconClassName}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-movenet-text">{title}</p>
        <p className="mt-1 text-sm leading-6 text-movenet-muted">{description}</p>
      </div>

      {onDismiss ? (
        <button
          aria-label="Dismiss notification"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-movenet-muted transition hover:bg-movenet-mint hover:text-movenet-forest"
          onClick={onDismiss}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </div>
  );
};
