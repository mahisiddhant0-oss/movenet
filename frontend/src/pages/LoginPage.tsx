import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Route,
  ShieldCheck
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router";

import { MarketingHeader } from "../components/layout/MarketingHeader";
import { Button } from "../components/ui/Button";

export const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormMessage(
      "Authentication will be connected in Stage 3. No sign-in request has been sent and no details have been stored."
    );
  };

  return (
    <div className="min-h-screen bg-movenet-surface">
      <MarketingHeader />

      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-movenet-forest px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute -right-24 top-10 size-72 rounded-full bg-movenet-emerald/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 size-80 rounded-full bg-movenet-mint/15 blur-3xl"
          />

          <div className="relative">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-movenet-mint">
              <Route aria-hidden="true" className="size-6" />
            </span>

            <p className="mt-10 text-sm font-bold tracking-[0.14em] text-movenet-mint uppercase">
              Welcome back
            </p>

            <h1 className="mt-4 max-w-md text-5xl font-bold tracking-tight">
              Better movement begins with clearer decisions.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-movenet-mint/85">
              MoveNet is being designed to make return-trip logistics more
              visible, explainable, and useful for shippers and transport
              agencies.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-movenet-mint"
              />
              <p className="text-sm text-movenet-mint/90">
                Purpose-built for logistics workflows.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-movenet-mint"
              />
              <p className="text-sm text-movenet-mint/90">
                Secure authentication arrives in Stage 3.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-bold tracking-[0.14em] text-movenet-emerald uppercase">
              Sign in
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-movenet-text">
              Continue to MoveNet
            </h2>

            <p className="mt-3 text-sm leading-6 text-movenet-muted">
              Use your work email when secure account access becomes available.
            </p>

            <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
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

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-movenet-text"
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-movenet-border bg-white px-4 py-3 pr-12 text-sm text-movenet-text shadow-sm transition placeholder:text-movenet-muted/70 focus:border-movenet-emerald focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
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

              {formMessage ? (
                <p
                  aria-live="polite"
                  className="rounded-xl border border-movenet-border bg-movenet-mint px-4 py-3 text-sm leading-6 text-movenet-forest"
                >
                  {formMessage}
                </p>
              ) : null}

              <Button className="w-full" type="submit">
                Sign in to MoveNet
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-movenet-muted">
              New to MoveNet?{" "}
              <Link
                className="font-bold text-movenet-emerald transition hover:text-movenet-forest"
                to="/register"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 rounded-xl bg-white px-4 py-3 text-center text-xs leading-5 text-movenet-muted shadow-sm">
              This is a Stage 2 interface preview. Authentication, password
              hashing, and secure sessions will be implemented in Stage 3.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};