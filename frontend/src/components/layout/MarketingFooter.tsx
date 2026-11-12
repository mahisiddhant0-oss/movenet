import { Route } from "lucide-react";
import { Link } from "react-router";

const footerLinks = [
  { label: "How it works", to: "/how-it-works" },
  { label: "For shippers", to: "/solutions/shippers" },
  { label: "For agencies", to: "/solutions/agencies" },
  { label: "About & contact", to: "/about" }
];

export const MarketingFooter = () => {
  return (
    <footer className="border-t border-movenet-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link className="inline-flex items-center gap-3 rounded-xl" to="/">
            <span className="flex size-10 items-center justify-center rounded-xl bg-movenet-forest text-white shadow-sm">
              <Route aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight text-movenet-forest">
                MoveNet
              </span>
              <span className="block text-xs font-medium text-movenet-muted">
                Smarter Routes. Better Loads.
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-6 text-movenet-muted">
            A logistics marketplace project in development, designed to make
            return-trip capacity easier to understand and use.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 lg:justify-end">
          {footerLinks.map((link) => (
            <Link
              className="font-semibold text-movenet-muted transition hover:text-movenet-forest"
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-movenet-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-movenet-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>MoveNet is in active development; marketplace features are not live yet.</p>
          <p>Built with clarity, safety, and explainability in mind.</p>
        </div>
      </div>
    </footer>
  );
};
