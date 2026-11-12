import {
  Building2,
  ClipboardList,
  LayoutDashboard,
  ShieldCheck,
  Truck,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";

import {
  DashboardShell,
  type DashboardNavigationItem
} from "../components/layout/DashboardShell";
import {
  EmptyState,
  ErrorState,
  LoadingState
} from "../components/ui/DataState";
import { DashboardSkeleton } from "../components/ui/LoadingSkeleton";
import { StatusBadge } from "../components/ui/StatusBadge";

export type DashboardRole = "admin" | "agency" | "shipper";

type PreviewState = "empty" | "error" | "loading";

type FocusArea = {
  description: string;
  icon: LucideIcon;
  title: string;
};

type DashboardConfig = {
  emptyDescription: string;
  emptyTitle: string;
  focusAreas: FocusArea[];
  roleLabel: string;
  subtitle: string;
  title: string;
};

const navigationItems: DashboardNavigationItem[] = [
  {
    icon: ClipboardList,
    label: "Shipper workspace",
    to: "/dashboard/shipper"
  },
  {
    icon: Truck,
    label: "Agency workspace",
    to: "/dashboard/agency"
  },
  {
    icon: ShieldCheck,
    label: "Admin workspace",
    to: "/dashboard/admin"
  }
];

const dashboardConfigs: Record<DashboardRole, DashboardConfig> = {
  shipper: {
    roleLabel: "Shipper workspace",
    title: "Plan every shipment with clarity.",
    subtitle:
      "This is the future home for shipment requests, transport offers, and booking updates.",
    emptyTitle: "No shipment data is connected yet",
    emptyDescription:
      "Load posting and shipment retrieval will be added with the Stage 4 marketplace APIs.",
    focusAreas: [
      {
        icon: ClipboardList,
        title: "My shipments",
        description:
          "Create, review, and track transportation requirements in one place."
      },
      {
        icon: Building2,
        title: "Transport offers",
        description:
          "Compare provider offers only after real marketplace data is available."
      },
      {
        icon: LayoutDashboard,
        title: "Booking history",
        description:
          "See confirmed booking and shipment-event history after booking workflows exist."
      }
    ]
  },
  agency: {
    roleLabel: "Transport agency workspace",
    title: "Turn planned capacity into useful journeys.",
    subtitle:
      "This workspace will bring fleet availability, compatible loads, and operational visibility together.",
    emptyTitle: "No fleet or load data is connected yet",
    emptyDescription:
      "Truck, driver, availability, and load APIs are scheduled for the Stage 4 marketplace build.",
    focusAreas: [
      {
        icon: Truck,
        title: "Fleet availability",
        description:
          "Publish truck capacity and planned return movement with the right context."
      },
      {
        icon: ClipboardList,
        title: "Compatible loads",
        description:
          "Review route-aware load opportunities after matching is implemented."
      },
      {
        icon: UsersRound,
        title: "Drivers and operations",
        description:
          "Manage driver context and operational information in later marketplace stages."
      }
    ]
  },
  admin: {
    roleLabel: "Platform administration workspace",
    title: "Keep the marketplace reliable and accountable.",
    subtitle:
      "This workspace will support verification, oversight, reporting, and clear operational follow-up.",
    emptyTitle: "No platform records are connected yet",
    emptyDescription:
      "Administrative APIs and audit records are planned for Stage 9 after the marketplace workflow exists.",
    focusAreas: [
      {
        icon: Building2,
        title: "Agency verification",
        description:
          "Review agency records and verification workflows when they are implemented."
      },
      {
        icon: UsersRound,
        title: "User oversight",
        description:
          "View account and platform operations only through future authorized admin APIs."
      },
      {
        icon: LayoutDashboard,
        title: "Platform reporting",
        description:
          "Show measured platform health and reports after reliable data collection exists."
      }
    ]
  }
};

const stateOptions: { label: string; value: PreviewState }[] = [
  { label: "Empty", value: "empty" },
  { label: "Loading", value: "loading" },
  { label: "Error", value: "error" }
];

type DashboardPreviewPageProps = {
  role: DashboardRole;
};

export const DashboardPreviewPage = ({ role }: DashboardPreviewPageProps) => {
  const [previewState, setPreviewState] = useState<PreviewState>("empty");
  const config = dashboardConfigs[role];

  const renderDataState = () => {
    if (previewState === "loading") {
      return (
        <div className="space-y-5">
          <LoadingState
            description="This local preview shows the loading state that will be used while future dashboard APIs are responding. No request is being made now."
            title="Preparing workspace data"
          />
          <DashboardSkeleton />
        </div>
      );
    }

    if (previewState === "error") {
      return (
        <ErrorState
          description="This is a visual error-state preview only. No API request has failed because dashboard data is not connected yet."
          title="Unable to load workspace data"
        />
      );
    }

    return (
      <EmptyState
        description={config.emptyDescription}
        title={config.emptyTitle}
      />
    );
  };

  return (
    <DashboardShell
      navigationItems={navigationItems}
      roleLabel={config.roleLabel}
      title="MoveNet dashboard preview"
    >
      <section aria-labelledby="dashboard-preview-heading">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-movenet-border bg-white p-7 shadow-sm sm:p-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
              {config.roleLabel}
            </p>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight text-movenet-text sm:text-4xl"
              id="dashboard-preview-heading"
            >
              {config.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-movenet-muted">
              {config.subtitle}
            </p>
          </div>

          <StatusBadge variant="warning">Data connection: pending</StatusBadge>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {config.focusAreas.map(({ description, icon: Icon, title }) => (
            <article
              className="rounded-3xl border border-movenet-border bg-white p-6 shadow-sm"
              key={title}
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-movenet-mint text-movenet-emerald">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-movenet-forest">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-movenet-muted">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="state-preview-heading" className="mt-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
              Reusable feedback states
            </p>
            <h2
              className="mt-2 text-2xl font-bold tracking-tight text-movenet-text"
              id="state-preview-heading"
            >
              Design for every data outcome.
            </h2>
          </div>

          <div
            aria-label="Preview data state"
            className="inline-flex rounded-xl border border-movenet-border bg-white p-1"
            role="group"
          >
            {stateOptions.map((option) => (
              <button
                aria-pressed={previewState === option.value}
                className={
                  previewState === option.value
                    ? "rounded-lg bg-movenet-forest px-3 py-2 text-sm font-semibold text-white"
                    : "rounded-lg px-3 py-2 text-sm font-semibold text-movenet-muted transition hover:bg-movenet-mint hover:text-movenet-forest"
                }
                key={option.value}
                onClick={() => setPreviewState(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">{renderDataState()}</div>
      </section>
    </DashboardShell>
  );
};
