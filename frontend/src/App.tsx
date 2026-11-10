import { CheckCircle2, Route } from "lucide-react";

const App = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-movenet-surface px-6 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-movenet-mint bg-white p-8 shadow-xl shadow-movenet-forest/10 sm:p-12">
        <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-movenet-forest text-white">
          <Route aria-hidden="true" className="size-7" />
        </div>

        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-movenet-emerald uppercase">
          MoveNet
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-movenet-text sm:text-4xl">
          Frontend foundation is ready.
        </h1>

        <p className="mt-4 text-base leading-7 text-movenet-muted">
          React, TypeScript, Vite, and Tailwind CSS are now configured for
          MoveNet.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-movenet-mint px-4 py-3 text-movenet-forest">
          <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" />
          <p className="text-sm font-medium">
            Ready for the premium interface in Stage 2.
          </p>
        </div>

        <a
          className="mt-8 inline-flex rounded-xl bg-movenet-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-movenet-emerald focus-visible:ring-2 focus-visible:ring-movenet-emerald focus-visible:ring-offset-2 focus-visible:outline-none"
          href="http://localhost:4000/api/v1/health"
          rel="noreferrer"
          target="_blank"
        >
          Check API health
        </a>
      </section>
    </main>
  );
};

export default App;