import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Route,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon
} from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { Link } from "react-router";

import { MarketingFooter } from "../components/layout/MarketingFooter";
import { MarketingHeader } from "../components/layout/MarketingHeader";
import { Button } from "../components/ui/Button";
import { DataTable, type DataTableColumn } from "../components/ui/DataTable";
import {
  InputField,
  SelectField,
  TextAreaField
} from "../components/ui/FormField";
import { Modal } from "../components/ui/Modal";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Toast } from "../components/ui/Toast";

export type MarketingPageKind =
  | "about"
  | "agencies"
  | "how-it-works"
  | "shippers";

type Feature = {
  description: string;
  icon: LucideIcon;
  title: string;
};

type PageHeroProps = {
  action?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

const PageHero = ({ action, description, eyebrow, title }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden border-b border-movenet-border bg-white">
      <div
        aria-hidden="true"
        className="absolute -right-24 top-6 size-80 rounded-full bg-movenet-mint blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-16 size-72 rounded-full bg-movenet-cloud blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-movenet-border bg-movenet-mint px-4 py-2 text-xs font-bold tracking-[0.14em] text-movenet-forest uppercase">
          <span className="size-2 rounded-full bg-movenet-emerald" />
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-movenet-text sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-movenet-muted sm:text-xl">
          {description}
        </p>
        {action ? <div className="mt-9 flex justify-center">{action}</div> : null}
      </div>
    </section>
  );
};

const SectionHeading = ({
  description,
  eyebrow,
  title
}: Omit<PageHeroProps, "action">) => {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-movenet-text sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-movenet-muted">
        {description}
      </p>
    </div>
  );
};

const FeatureCard = ({ description, icon: Icon, title }: Feature) => {
  return (
    <article className="rounded-3xl border border-movenet-border bg-white p-7 shadow-sm">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-movenet-mint text-movenet-emerald">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-movenet-forest">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-movenet-muted">{description}</p>
    </article>
  );
};

const PublicPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-movenet-surface">
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
};

const workflowSteps: Feature[] = [
  {
    icon: ClipboardList,
    title: "Share shipment requirements",
    description:
      "A shipper will describe pickup, delivery, cargo, capacity, and timing in one structured request."
  },
  {
    icon: Truck,
    title: "Publish return-trip availability",
    description:
      "A transport agency will provide planned truck movement and the capacity that may be available."
  },
  {
    icon: Route,
    title: "Evaluate the fit",
    description:
      "Future matching will apply mandatory rules before ranking eligible options with an explanation."
  }
];

type DecisionPoint = {
  check: string;
  decision: string;
  whyItMatters: string;
};

const decisionPoints: DecisionPoint[] = [
  {
    check: "Route and detour context",
    decision: "Is the pickup and delivery reasonably compatible with the planned journey?",
    whyItMatters: "Nearby locations alone do not guarantee a practical road route."
  },
  {
    check: "Capacity and cargo fit",
    decision: "Can the truck safely carry the required type and amount of cargo?",
    whyItMatters: "A route match is not useful when capacity or cargo constraints fail."
  },
  {
    check: "Time-window feasibility",
    decision: "Can the shipment be served within the relevant pickup and delivery windows?",
    whyItMatters: "Operational timing is as important as geographic compatibility."
  },
  {
    check: "Clear explanation",
    decision: "Can the recommendation explain why it was included or excluded?",
    whyItMatters: "Users need a decision aid, not a black-box score."
  }
];

const decisionColumns: DataTableColumn<DecisionPoint>[] = [
  {
    id: "check",
    header: "Decision checkpoint",
    cell: (row) => <span className="font-semibold text-movenet-forest">{row.check}</span>
  },
  {
    id: "decision",
    header: "Future matching question",
    cell: (row) => row.decision
  },
  {
    id: "reason",
    header: "Why it matters",
    cell: (row) => <span className="text-movenet-muted">{row.whyItMatters}</span>
  }
];

const HowItWorksPage = () => {
  return (
    <PublicPageLayout>
      <PageHero
        action={
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-movenet-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-movenet-emerald"
            to="/solutions/shippers"
          >
            Explore shipper workflows
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        }
        description="MoveNet is being designed to turn planned return journeys into clearer transport opportunities—one reliable workflow at a time."
        eyebrow="How MoveNet is designed"
        title="From fragmented coordination to a clearer transport decision."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          description="The first product version focuses on a single, understandable workflow before attempting advanced multi-stop optimization."
          eyebrow="Three-step direction"
          title="A simple flow, built for real constraints."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <div className="relative" key={step.title}>
              <span className="absolute right-7 top-7 text-sm font-bold text-movenet-emerald">
                0{index + 1}
              </span>
              <FeatureCard {...step} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-movenet-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            description="These are design rules for the planned matching engine, not live platform results."
            eyebrow="What makes a fit useful"
            title="Start with the constraints that cannot be ignored."
          />
          <div className="mt-10">
            <DataTable
              caption="Planned matching decision checkpoints"
              columns={decisionColumns}
              getRowKey={(row) => row.check}
              rows={decisionPoints}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] bg-movenet-forest px-7 py-12 text-white sm:px-12 sm:py-16">
          <Clock3 aria-hidden="true" className="size-7 text-movenet-mint" />
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Matching, offers, and bookings are being built progressively.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-movenet-mint/85">
            MoveNet will not represent a recommendation as a confirmed booking. Each
            step has a different level of certainty and needs a clear explanation.
          </p>
        </div>
      </section>
    </PublicPageLayout>
  );
};

const shipperFeatures: Feature[] = [
  {
    icon: ClipboardList,
    title: "Structured shipment details",
    description:
      "Replace scattered calls and messages with consistent cargo, route, timing, and capacity information."
  },
  {
    icon: Route,
    title: "Compatible transport discovery",
    description:
      "Review relevant opportunities after route-aware matching is implemented."
  },
  {
    icon: Building2,
    title: "Offer comparison",
    description:
      "Keep recommendations, commercial offers, and confirmed bookings distinct."
  },
  {
    icon: LayoutDashboard,
    title: "Shipment visibility",
    description:
      "Future booking and shipment-event records will make status easier to follow."
  }
];

const ShipperSolutionsPage = () => {
  return (
    <PublicPageLayout>
      <PageHero
        action={
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-movenet-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-movenet-emerald"
            to="/register"
          >
            Explore the account preview
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        }
        description="MoveNet is designed to give shippers a clearer way to express a transport need and evaluate relevant capacity when marketplace data becomes available."
        eyebrow="Designed for shippers"
        title="A clearer way to find transport capacity for the shipment you need to move."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {shipperFeatures.map((feature) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </section>

      <section className="border-y border-movenet-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-movenet-border bg-movenet-surface p-8">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-muted uppercase">
              Typical fragmented process
            </p>
            <h2 className="mt-4 text-2xl font-bold text-movenet-text">
              Calls, spreadsheets, and uncertain availability.
            </h2>
            <p className="mt-4 text-sm leading-7 text-movenet-muted">
              Coordination can be distributed across informal channels, making it
              harder to compare route, capacity, timing, and commercial decisions.
            </p>
          </article>

          <article className="rounded-3xl bg-movenet-forest p-8 text-white">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-mint uppercase">
              MoveNet direction
            </p>
            <h2 className="mt-4 text-2xl font-bold">
              Structured request, compatible options, transparent decision.
            </h2>
            <p className="mt-4 text-sm leading-7 text-movenet-mint/85">
              The goal is not to remove human judgment. It is to make the information
              needed for a transport decision easier to understand.
            </p>
          </article>
        </div>
      </section>
    </PublicPageLayout>
  );
};

const agencyFeatures: Feature[] = [
  {
    icon: Truck,
    title: "Fleet context",
    description:
      "Future agency records will capture truck availability, capacity, route, and driver context."
  },
  {
    icon: MapPin,
    title: "Return-load discovery",
    description:
      "Surface potential loads that may fit a planned journey after matching is implemented."
  },
  {
    icon: ShieldCheck,
    title: "Decision support",
    description:
      "Explain capacity, time, and detour considerations before an agency makes an offer."
  },
  {
    icon: LayoutDashboard,
    title: "Utilization visibility",
    description:
      "Future dashboards can show measured operational information only after data is connected."
  }
];

const AgencySolutionsPage = () => {
  return (
    <PublicPageLayout>
      <PageHero
        action={
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-movenet-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-movenet-emerald"
            to="/dashboard/agency"
          >
            Preview the agency workspace
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        }
        description="MoveNet is being designed to turn planned truck movement into a clearer view of potential return-load opportunities."
        eyebrow="Designed for transport agencies"
        title="Make planned capacity easier to evaluate and use."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {agencyFeatures.map((feature) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </section>

      <section className="border-y border-movenet-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl rounded-[2rem] border border-movenet-border bg-movenet-mint p-8 sm:p-10">
            <Users aria-hidden="true" className="size-7 text-movenet-emerald" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-movenet-forest">
              Human teams stay in control.
            </h2>
            <p className="mt-4 text-base leading-7 text-movenet-muted">
              MoveNet can recommend possible opportunities, but transport agencies
              retain the commercial and operational decision. A recommendation is not
              an instruction and is never a guarantee of profit or feasibility.
            </p>
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
};

const AboutPage = () => {
  const [isPrinciplesModalOpen, setIsPrinciplesModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleContactPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsToastVisible(true);
  };

  return (
    <PublicPageLayout>
      <PageHero
        action={
          <Button onClick={() => setIsPrinciplesModalOpen(true)} variant="secondary">
            Read build principles
          </Button>
        }
        description="MoveNet is being built as a careful, staged response to a fragmented logistics workflow—not as a finished product making unmeasured claims."
        eyebrow="About MoveNet"
        title="Thoughtful technology for a complex logistics workflow."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            description="Empty return journeys, fragmented coordination, and limited visibility into useful capacity can make logistics decisions harder than they need to be."
            eyebrow="The problem"
            title="MoveNet begins with the return journey."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-3xl border border-movenet-border bg-white p-7 shadow-sm">
              <StatusBadge variant="success">Built and verified</StatusBadge>
              <h3 className="mt-5 text-xl font-bold text-movenet-forest">
                Reliable local foundation
              </h3>
              <p className="mt-3 text-sm leading-6 text-movenet-muted">
                React, Express, PostgreSQL/PostGIS, Redis, Docker services, and health
                checks are in place locally.
              </p>
            </article>

            <article className="rounded-3xl border border-movenet-border bg-white p-7 shadow-sm">
              <StatusBadge variant="info">In development</StatusBadge>
              <h3 className="mt-5 text-xl font-bold text-movenet-forest">
                Frontend experience
              </h3>
              <p className="mt-3 text-sm leading-6 text-movenet-muted">
                Public pages, routes, authentication previews, dashboard shells, and
                reusable feedback states are implemented.
              </p>
            </article>

            <article className="rounded-3xl border border-movenet-border bg-white p-7 shadow-sm sm:col-span-2">
              <StatusBadge variant="warning">Next engineering focus</StatusBadge>
              <h3 className="mt-5 text-xl font-bold text-movenet-forest">
                Secure accounts, marketplace records, and geographic matching.
              </h3>
              <p className="mt-3 text-sm leading-6 text-movenet-muted">
                The next stages add actual authentication, trucks, loads, availability,
                PostGIS workflows, and deterministic matching. None of those workflows
                are represented as live today.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-movenet-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionHeading
            description="This contact experience is visual only until a real communication channel is selected and connected."
            eyebrow="Contact preview"
            title="Share a future collaboration idea."
          />

          <form className="rounded-3xl border border-movenet-border bg-movenet-surface p-6 shadow-sm sm:p-8" onSubmit={handleContactPreview}>
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                autoComplete="name"
                id="contact-name"
                label="Your name"
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
              <InputField
                autoComplete="email"
                id="contact-email"
                label="Email address"
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
            </div>

            <div className="mt-5">
              <SelectField
                id="contact-topic"
                label="What would you like to discuss?"
                name="topic"
                options={[
                  { label: "Product feedback", value: "product-feedback" },
                  { label: "Logistics workflow insight", value: "workflow-insight" },
                  { label: "Potential collaboration", value: "collaboration" }
                ]}
                required
              />
            </div>

            <div className="mt-5">
              <TextAreaField
                id="contact-message"
                label="Message"
                name="message"
                placeholder="Tell us what you would like to discuss."
                required
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-5 text-movenet-muted">
                This preview does not send or store your message. A real contact
                channel will be connected only after a destination is chosen.
              </p>
              <Button type="submit">
                Preview contact response
                <MessageSquare aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Modal
        actions={<Button onClick={() => setIsPrinciplesModalOpen(false)}>Close</Button>}
        isOpen={isPrinciplesModalOpen}
        onClose={() => setIsPrinciplesModalOpen(false)}
        title="How MoveNet is being built"
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-movenet-emerald" />
            Build a dependable single-load workflow before advanced optimization.
          </li>
          <li className="flex gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-movenet-emerald" />
            Keep recommendations explainable and clearly separate from bookings.
          </li>
          <li className="flex gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-movenet-emerald" />
            Use PostgreSQL transactions for future booking truth, not cache state.
          </li>
        </ul>
      </Modal>

      {isToastVisible ? (
        <div className="fixed right-5 bottom-5 z-[70] w-[min(24rem,calc(100vw-2.5rem))]">
          <Toast
            description="Contact submissions are not connected yet, so this message has not been sent or stored."
            onDismiss={() => setIsToastVisible(false)}
            title="Preview only"
            variant="info"
          />
        </div>
      ) : null}
    </PublicPageLayout>
  );
};

type MarketingPageProps = {
  kind: MarketingPageKind;
};

export const MarketingPage = ({ kind }: MarketingPageProps) => {
  if (kind === "how-it-works") {
    return <HowItWorksPage />;
  }

  if (kind === "shippers") {
    return <ShipperSolutionsPage />;
  }

  if (kind === "agencies") {
    return <AgencySolutionsPage />;
  }

  return <AboutPage />;
};
