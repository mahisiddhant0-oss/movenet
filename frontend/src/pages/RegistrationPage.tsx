import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Route,
  Truck,
  UserRound
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router";

import { MarketingHeader } from "../components/layout/MarketingHeader";
import { Button } from "../components/ui/Button";

type AccountType = "shipper" | "agency";

export const RegistrationPage = () => {
  const [accountType, setAccountType] = useState<AccountType>("shipper");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setFormMessage(
        "The passwords do not match. Please correct them before continuing."
      );
      return;
    }

    setFormMessage(
      "Registration will be connected in Stage 3. No account has been created and no details have been saved."
    );
  };

  return (
    <div className="min-h-screen bg-movenet-surface">
      <MarketingHeader />

      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-movenet-forest px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute -right-20 top-12 size-72 rounded-full bg-movenet-emerald/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-16 size-80 rounded-full bg-movenet-mint/15 blur-3xl"
          />

          <div className="relative">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-movenet-mint">
              <Route aria-hidden="true" className="size-6" />
            </span>

            <p className="mt-10 text-sm font-bold tracking-[0.14em] text-movenet-mint uppercase">
              Start with clarity
            </p>

            <h1 className="mt-4 max-w-md text-5xl font-bold tracking-tight">
              Help make every journey more useful.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-movenet-mint/85">
              MoveNet brings shipment needs and planned truck availability into
              one product workflow—starting with the people who make logistics
              happen every day.
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/15 bg-white/10 p-5">
            <p className="text-sm font-bold text-white">
              The first version will focus on:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-movenet-mint/90">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0"
                />
                Clear shipment and availability details
              </li>
              <li className="flex items-start gap-3 text-sm text-movenet-mint/90">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0"
                />
                Explainable route-fit recommendations
              </li>
              <li className="flex items-start gap-3 text-sm text-movenet-mint/90">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0"
                />
                Safer offer and booking workflows
              </li>
            </ul>
          </div>
        </aside>

        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-xl">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
              Create account
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-movenet-text">
              Join the MoveNet journey
            </h2>

            <p className="mt-3 text-sm leading-6 text-movenet-muted">
              Set up the interface details now. Secure account creation will be
              connected in Stage 3.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-movenet-text"
                  htmlFor="fullName"
                >
                  Full name
                </label>
                <input
                  autoComplete="name"
                  className="w-full rounded-xl border border-movenet-border bg-white px-4 py-3 text-sm text-movenet-text shadow-sm transition placeholder:text-movenet-muted/70 focus:border-movenet-emerald focus:outline-none"
                  id="fullName"
                  name="fullName"
                  placeholder="Your full name"
                  required
                  type="text"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-movenet-text"
                  htmlFor="email"
                >
                  Work email
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-movenet-border bg-white px-4 py-3 text-sm text-movenet-text shadow-sm transition placeholder:text-movenet-muted/70 focus:border-movenet-emerald focus:outline-none"
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-movenet-text">
                  I am joining as a
                </legend>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={
                      accountType === "shipper"
                        ? "cursor-pointer rounded-2xl border-2 border-movenet-emerald bg-movenet-mint p-4"
                        : "cursor-pointer rounded-2xl border border-movenet-border bg-white p-4 transition hover:border-movenet-emerald"
                    }
                  >
                    <input
                      checked={accountType === "shipper"}
                      className="sr-only"
                      name="accountType"
                      onChange={() => setAccountType("shipper")}
                      type="radio"
                      value="shipper"
                    />
                    <UserRound
                      aria-hidden="true"
                      className="size-5 text-movenet-emerald"
                    />
                    <span className="mt-3 block text-sm font-bold text-movenet-forest">
                      Shipper
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-movenet-muted">
                      I need to move goods.
                    </span>
                  </label>

                  <label
                    className={
                      accountType === "agency"
                        ? "cursor-pointer rounded-2xl border-2 border-movenet-emerald bg-movenet-mint p-4"
                        : "cursor-pointer rounded-2xl border border-movenet-border bg-white p-4 transition hover:border-movenet-emerald"
                    }
                  >
                    <input
                      checked={accountType === "agency"}
                      className="sr-only"
                      name="accountType"
                      onChange={() => setAccountType("agency")}
                      type="radio"
                      value="agency"
                    />
                    <Truck
                      aria-hidden="true"
                      className="size-5 text-movenet-emerald"
                    />
                    <span className="mt-3 block text-sm font-bold text-movenet-forest">
                      Transport agency
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-movenet-muted">
                      I manage truck capacity.
                    </span>
                  </label>
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-movenet-text"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-movenet-border bg-white px-4 py-3 pr-12 text-sm text-movenet-text shadow-sm transition placeholder:text-movenet-muted/70 focus:border-movenet-emerald focus:outline-none"
                      id="password"
                      minLength={8}
                      name="password"
                      placeholder="At least 8 characters"
                      required
                      type={isPasswordVisible ? "text" : "password"}
                    />

                    <button
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-movenet-muted transition hover:text-movenet-forest"
                      onClick={() =>
                        setIsPasswordVisible((currentValue) => !currentValue)
                      }
                      type="button"
                    >
                      {isPasswordVisible ? (
                        <EyeOff aria-hidden="true" className="size-5" />
                      ) : (
                        <Eye aria-hidden="true" className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-movenet-text"
                    htmlFor="confirmPassword"
                  >
                    Confirm password
                  </label>
                  <input
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-movenet-border bg-white px-4 py-3 text-sm text-movenet-text shadow-sm transition placeholder:text-movenet-muted/70 focus:border-movenet-emerald focus:outline-none"
                    id="confirmPassword"
                    minLength={8}
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    required
                    type={isPasswordVisible ? "text" : "password"}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm leading-6 text-movenet-muted">
                <input
                  className="mt-1 size-4 rounded border-movenet-border accent-movenet-emerald"
                  name="previewAcknowledgement"
                  required
                  type="checkbox"
                />
                I understand this Stage 2 preview cannot create a real account
                yet.
              </label>

              {formMessage ? (
                <p
                  aria-live="polite"
                  className="rounded-xl border border-movenet-border bg-movenet-mint px-4 py-3 text-sm leading-6 text-movenet-forest"
                >
                  {formMessage}
                </p>
              ) : null}

              <Button className="w-full" type="submit">
                Create account
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-movenet-muted">
              Already have an account?{" "}
              <Link
                className="font-bold text-movenet-emerald transition hover:text-movenet-forest"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};