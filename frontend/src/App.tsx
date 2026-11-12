import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Route as RouteIcon,
  ShieldCheck,
  Truck
} from "lucide-react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router";

import { DashboardPreviewPage } from "./pages/DashboardPreviewPage";
import { MarketingFooter } from "./components/layout/MarketingFooter";
import { MarketingHeader } from "./components/layout/MarketingHeader";
import { Button } from "./components/ui/Button";
import { LoginPage } from "./pages/LoginPage";
import { MarketingPage } from "./pages/MarketingPage";
import { RegistrationPage } from "./pages/RegistrationPage";

const platformPrinciples = [
  {
    Icon: RouteIcon,
    title: "Route-aware",
    description:
      "Designed around planned return journeys instead of disconnected listings."
  },
  {
    Icon: Truck,
    title: "Capacity-conscious",
    description:
      "Built to consider truck space, cargo needs, and operational fit."
  },
  {
    Icon: ShieldCheck,
    title: "Trust-focused",
    description:
      "Structured for explainable decisions and reliable booking workflows."
  }
];

const workflowSteps = [
  {
    number: "01",
    title: "Share a transport need",
    description:
      "A shipper describes pickup, delivery, timing, cargo, and capacity requirements."
  },
  {
    number: "02",
    title: "Publish planned capacity",
    description:
      "A transport agency shares a truck's availability and planned return journey."
  },
  {
    number: "03",
    title: "Understand the fit",
    description:
      "MoveNet will explain compatible opportunities using clear, rule-based matching."
  }
];

const audienceCards = [
  {
    title: "For shippers",
    description:
      "A clearer path to discover transport capacity that may fit a shipment's route and timing.",
    points: [
      "Express shipment requirements clearly",
      "Compare compatible transport offers",
      "Track the journey from offer to booking"
    ]
  },
  {
    title: "For transport agencies",
    description:
      "A focused way to surface useful return-load opportunities for planned truck movement.",
    points: [
      "Publish truck availability with context",
      "Evaluate potential loads before committing",
      "Improve visibility into capacity utilization"
    ]
  }
];

const moveToSection = (sectionId: string): void => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

const LandingPage = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-movenet-surface"
      id="top"
    >
      <MarketingHeader />

      <main>
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-movenet-border bg-white"
          id="platform"
        >
          <div
            aria-hidden="true"
            className="absolute -right-28 top-8 size-80 rounded-full bg-movenet-mint blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 bottom-0 size-72 rounded-full bg-movenet-cloud blur-3xl"
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-movenet-border bg-movenet-mint px-4 py-2 text-xs font-bold tracking-[0.14em] text-movenet-forest uppercase">
                <span className="size-2 rounded-full bg-movenet-emerald" />
                Return-trip logistics, rethought
              </p>

              <h1
                className="mt-6 max-w-3xl text-5xl font-bold tracking-[-0.045em] text-movenet-text sm:text-6xl lg:text-7xl"
                id="hero-heading"
              >
                Smarter routes.
                <span className="block text-movenet-emerald">
                  Better loads.
                </span>
                Fewer empty miles.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-movenet-muted sm:text-xl">
                MoveNet is a logistics marketplace in development, designed to
                help shippers and transport agencies discover compatible
                return-trip load opportunities with clarity and confidence.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => moveToSection("how-it-works")}>
                  See the workflow
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>

                <Button
                  onClick={() => moveToSection("audiences")}
                  variant="secondary"
                >
                  Explore who it helps
                </Button>

                <Link
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-movenet-forest transition hover:bg-movenet-mint"
                  to="/dashboard/shipper"
                >
                  Preview a workspace
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                {platformPrinciples.map(({ Icon, description, title }) => (
                  <div
                    className="rounded-2xl border border-movenet-border bg-white/80 p-4 shadow-sm"
                    key={title}
                  >
                    <Icon
                      aria-hidden="true"
                      className="mb-3 size-5 text-movenet-emerald"
                    />
                    <p className="text-sm font-bold text-movenet-forest">
                      {title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-movenet-muted">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside
              aria-label="MoveNet matching concept"
              className="rounded-[2rem] border border-movenet-border bg-white p-6 shadow-[0_24px_70px_rgba(18,61,42,0.14)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-movenet-emerald uppercase">
                    Journey intelligence
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-movenet-forest">
                    A clearer return journey
                  </h2>
                </div>

                <span className="rounded-full bg-movenet-mint px-3 py-1.5 text-xs font-bold text-movenet-forest">
                  In development
                </span>
              </div>

              <div className="mt-7 rounded-2xl bg-movenet-surface p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-movenet-emerald shadow-sm">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-movenet-text">
                      Delivery completed
                    </p>
                    <p className="text-xs text-movenet-muted">
                      A truck begins its planned return journey.
                    </p>
                  </div>
                </div>

                <div className="my-4 ml-5 h-7 border-l border-dashed border-movenet-emerald" />

                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-movenet-forest text-white shadow-sm">
                    <RouteIcon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-movenet-text">
                      Compatible opportunity
                    </p>
                    <p className="text-xs text-movenet-muted">
                      Future matching will consider route, timing, and capacity.
                    </p>
                  </div>
                </div>

                <div className="my-4 ml-5 h-7 border-l border-dashed border-movenet-emerald" />

                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-movenet-mint text-movenet-emerald shadow-sm">
                    <Truck aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-movenet-text">
                      Better use of capacity
                    </p>
                    <p className="text-xs text-movenet-muted">
                      The product goal: fewer empty return miles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-movenet-border bg-white p-4">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-movenet-emerald"
                />
                <p className="text-sm leading-6 text-movenet-muted">
                  MoveNet will prioritize transparent explanations over
                  black-box recommendations.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          aria-labelledby="workflow-heading"
          className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
          id="how-it-works"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
              The product workflow
            </p>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight text-movenet-text sm:text-4xl"
              id="workflow-heading"
            >
              Built around a simple, auditable flow.
            </h2>
            <p className="mt-4 text-base leading-7 text-movenet-muted">
              The first product version will focus on one reliable workflow
              before attempting advanced route optimization.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {workflowSteps.map((step) => (
              <article
                className="rounded-3xl border border-movenet-border bg-white p-7 shadow-sm"
                key={step.number}
              >
                <span className="text-sm font-bold text-movenet-emerald">
                  {step.number}
                </span>
                <h3 className="mt-8 text-xl font-bold text-movenet-forest">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-movenet-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="audience-heading"
          className="border-y border-movenet-border bg-white"
          id="audiences"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
                Two sides, one better workflow
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-movenet-text sm:text-4xl"
                id="audience-heading"
              >
                Designed for the people moving India forward.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {audienceCards.map((audience) => (
                <article
                  className="rounded-3xl border border-movenet-border bg-movenet-surface p-7 sm:p-8"
                  key={audience.title}
                >
                  <h3 className="text-2xl font-bold text-movenet-forest">
                    {audience.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-movenet-muted">
                    {audience.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {audience.points.map((point) => (
                      <li
                        className="flex items-start gap-3 text-sm font-medium text-movenet-text"
                        key={point}
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 size-5 shrink-0 text-movenet-emerald"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
          id="get-started"
        >
          <div className="rounded-[2rem] bg-movenet-forest px-7 py-12 text-white sm:px-12 sm:py-16">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-mint uppercase">
              Stage 2 · Frontend foundation
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Building logistics technology that is clear, practical, and
              trustworthy.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-movenet-mint/85">
              MoveNet is actively being developed step by step—from polished
              interfaces to secure marketplace workflows and explainable route
              matching.
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route
          element={<MarketingPage kind="how-it-works" />}
          path="/how-it-works"
        />
        <Route
          element={<MarketingPage kind="shippers" />}
          path="/solutions/shippers"
        />
        <Route
          element={<MarketingPage kind="agencies" />}
          path="/solutions/agencies"
        />
        <Route element={<MarketingPage kind="about" />} path="/about" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route
          element={<DashboardPreviewPage role="shipper" />}
          path="/dashboard/shipper"
        />
        <Route
          element={<DashboardPreviewPage role="agency" />}
          path="/dashboard/agency"
        />
        <Route
          element={<DashboardPreviewPage role="admin" />}
          path="/dashboard/admin"
        />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
