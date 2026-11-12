import {
  Bell,
  Menu,
  Route,
  X,
  type LucideIcon
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Link, NavLink } from "react-router";

export type DashboardNavigationItem = {
  icon: LucideIcon;
  label: string;
  to: string;
};

type DashboardShellProps = {
  children: ReactNode;
  navigationItems: DashboardNavigationItem[];
  roleLabel: string;
  title: string;
};

type WorkspaceNavigationProps = {
  items: DashboardNavigationItem[];
  onNavigate?: () => void;
};

const WorkspaceNavigation = ({ items, onNavigate }: WorkspaceNavigationProps) => {
  return (
    <nav aria-label="Dashboard workspace previews" className="space-y-2">
      <p className="px-3 pb-2 text-xs font-bold tracking-[0.14em] text-movenet-muted uppercase">
        Workspace previews
      </p>

      {items.map(({ icon: Icon, label, to }) => (
        <NavLink
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
              isActive
                ? "bg-movenet-mint text-movenet-forest"
                : "text-movenet-muted hover:bg-movenet-cloud hover:text-movenet-forest"
            ].join(" ")
          }
          key={to}
          onClick={onNavigate}
          to={to}
        >
          <Icon aria-hidden="true" className="size-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export const DashboardShell = ({
  children,
  navigationItems,
  roleLabel,
  title
}: DashboardShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-movenet-surface">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-movenet-border bg-white p-5 lg:flex lg:flex-col">
        <Link className="flex items-center gap-3 rounded-xl" to="/">
          <span className="flex size-10 items-center justify-center rounded-xl bg-movenet-forest text-white shadow-sm">
            <Route aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-movenet-forest">
              MoveNet
            </span>
            <span className="block text-xs font-medium text-movenet-muted">
              Product workspace
            </span>
          </span>
        </Link>

        <div className="mt-10 flex-1">
          <WorkspaceNavigation items={navigationItems} />
        </div>

        <div className="rounded-2xl border border-movenet-border bg-movenet-surface p-4">
          <p className="text-xs font-bold tracking-[0.12em] text-movenet-emerald uppercase">
            Stage 2 preview
          </p>
          <p className="mt-2 text-sm leading-6 text-movenet-muted">
            Navigation and visual states are ready. Account data will connect in
            later stages.
          </p>
        </div>
      </aside>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close dashboard menu"
            className="absolute inset-0 bg-movenet-forest/30"
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
          />

          <aside className="relative flex h-full w-80 max-w-[85vw] flex-col bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                className="flex items-center gap-3 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
                to="/"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-movenet-forest text-white shadow-sm">
                  <Route aria-hidden="true" className="size-5" />
                </span>
                <span className="text-base font-bold tracking-tight text-movenet-forest">
                  MoveNet
                </span>
              </Link>

              <button
                aria-label="Close dashboard menu"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-movenet-border text-movenet-forest transition hover:bg-movenet-mint"
                onClick={() => setIsMobileMenuOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="mt-10">
              <WorkspaceNavigation
                items={navigationItems}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </aside>
        </div>
      ) : null}

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-movenet-border bg-white/90 px-6 py-4 backdrop-blur-xl lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                aria-label="Open dashboard menu"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-movenet-border text-movenet-forest transition hover:bg-movenet-mint lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                type="button"
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>

              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-movenet-emerald uppercase">
                  {roleLabel}
                </p>
                <h1 className="mt-1 text-lg font-bold tracking-tight text-movenet-text sm:text-xl">
                  {title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-movenet-mint px-3 py-1.5 text-xs font-bold text-movenet-forest sm:inline-flex">
                Interface preview
              </span>
              <span
                aria-label="Notifications will be available later"
                className="flex size-10 items-center justify-center rounded-xl border border-movenet-border text-movenet-muted"
                title="Notifications will be available later"
              >
                <Bell aria-hidden="true" className="size-5" />
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="mb-8 rounded-2xl border border-movenet-border bg-white px-4 py-3 text-sm leading-6 text-movenet-muted">
            <span className="font-bold text-movenet-forest">Preview only:</span>{" "}
            This dashboard has no authenticated account or live backend data yet.
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};
