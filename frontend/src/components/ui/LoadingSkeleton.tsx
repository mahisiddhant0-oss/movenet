type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse rounded-xl bg-movenet-cloud ${className}`}
    />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div aria-label="Loading dashboard preview" className="grid gap-5 md:grid-cols-3" role="status">
      {["first", "second", "third"].map((key) => (
        <div className="rounded-3xl border border-movenet-border bg-white p-6" key={key}>
          <Skeleton className="size-11 rounded-2xl" />
          <Skeleton className="mt-6 h-5 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
};
