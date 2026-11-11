import { ArrowLeft, Menu, Route, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const navigationItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#audiences", label: "Who it helps" },
  { href: "#get-started", label: "Our vision" }
] as const;

const Brand = () => {
  return (
    <Link className="flex items-center gap-3 rounded-xl" to="/">
      <span className="flex size-10 items-center justify-center rounded-xl bg-movenet-forest text-white shadow-sm">
        <Route aria-hidden="true" className="size-5" />
      </span>

      <span>
        <span className="block text-base font-bold tracking-tight text-movenet-forest">
          MoveNet
        </span>
        <span className="block text-xs font-medium text-movenet-muted">
          Better loads. Fewer empty miles.
        </span>
      </span>
    </Link>
  );
};

export const MarketingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileNavigation = () => {
    setIsMenuOpen(false);
  };

  const isMarketingPage = location.pathname === "/";

  if (!isMarketingPage) {
    return (
      <header className="border-b border-movenet-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Brand />

          <Link
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-movenet-forest transition hover:bg-movenet-mint"
            to="/"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-movenet-border/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Brand />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigationItems.map((item) => (
            <a
              className="rounded-lg px-3 py-2 text-sm font-medium text-movenet-muted transition hover:bg-movenet-mint hover:text-movenet-forest"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-movenet-forest transition hover:bg-movenet-mint"
            to="/login"
          >
            Sign in
          </Link>

          <Link
            className="rounded-xl bg-movenet-forest px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-movenet-emerald"
            to="/register"
          >
            Get started
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="inline-flex size-10 items-center justify-center rounded-xl border border-movenet-border text-movenet-forest transition hover:bg-movenet-mint md:hidden"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      <div
        className={
          isMenuOpen
            ? "border-t border-movenet-border bg-white px-6 py-4 md:hidden"
            : "hidden"
        }
        id="mobile-navigation"
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto grid max-w-7xl gap-2"
        >
          {navigationItems.map((item) => (
            <a
              className="rounded-xl px-4 py-3 text-sm font-semibold text-movenet-forest transition hover:bg-movenet-mint"
              href={item.href}
              key={item.href}
              onClick={closeMobileNavigation}
            >
              {item.label}
            </a>
          ))}

          <Link
            className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-semibold text-movenet-forest transition hover:bg-movenet-mint"
            onClick={closeMobileNavigation}
            to="/login"
          >
            Sign in
          </Link>

          <Link
            className="rounded-xl bg-movenet-forest px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-movenet-emerald"
            onClick={closeMobileNavigation}
            to="/register"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
};