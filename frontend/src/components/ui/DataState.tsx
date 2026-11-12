import {
  AlertTriangle,
  Inbox,
  LoaderCircle,
  type LucideIcon
} from "lucide-react";
import type { ReactNode } from "react";

type DataStateProps = {
  action?: ReactNode;
  description: string;
  title: string;
};

type StateCardProps = DataStateProps & {
  icon: LucideIcon;
  iconClassName: string;
  role?: "alert" | "status";
  spinning?: boolean;
};

const StateCard = ({
  action,
  description,
  icon: Icon,
  iconClassName,
  role,
  spinning = false,
  title
}: StateCardProps) => {
  return (
    <section
      aria-live={role ? "polite" : undefined}
      className="rounded-3xl border border-dashed border-movenet-border bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      role={role}
    >
      <span
        className={`mx-auto flex size-12 items-center justify-center rounded-2xl ${iconClassName}`}
      >
        <Icon
          aria-hidden="true"
          className={spinning ? "size-6 animate-spin" : "size-6"}
        />
      </span>

      <h2 className="mt-5 text-xl font-bold tracking-tight text-movenet-text">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-movenet-muted">
        {description}
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
};

export const LoadingState = (props: DataStateProps) => {
  return (
    <StateCard
      {...props}
      icon={LoaderCircle}
      iconClassName="bg-movenet-mint text-movenet-emerald"
      role="status"
      spinning
    />
  );
};

export const EmptyState = (props: DataStateProps) => {
  return (
    <StateCard
      {...props}
      icon={Inbox}
      iconClassName="bg-movenet-cloud text-movenet-forest"
    />
  );
};

export const ErrorState = (props: DataStateProps) => {
  return (
    <StateCard
      {...props}
      icon={AlertTriangle}
      iconClassName="bg-red-50 text-red-700"
      role="alert"
    />
  );
};
