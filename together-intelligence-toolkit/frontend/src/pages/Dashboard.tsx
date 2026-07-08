import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import { getHistory } from "@/services/api";
import type { RunRecord } from "@/types/api";

export default function Dashboard() {
  const [runs, setRuns] = useState<RunRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHistory().then(setRuns).catch((err) => setError(err.message));
  }, []);

  const breakdown = useMemo(() => {
    return runs.reduce<Record<string, number>>((acc, run) => {
      acc[run.status] = (acc[run.status] ?? 0) + 1;
      return acc;
    }, {});
  }, [runs]);

  return (
    <PageShell>
      <section className="max-w-4xl">
        <p className="mb-5 text-sm uppercase tracking-[0.18em] text-ink-secondary">
          Dashboard
        </p>
        <h1>Overview</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-secondary">
          A quiet view of recent intelligence workflows across discovery,
          diligence, and routing.
        </p>
      </section>

      {error ? <p className="mt-10 text-sm text-terracotta">{error}</p> : null}

      <section className="mt-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-border bg-white p-8">
          <p className="text-sm text-ink-secondary">Total runs</p>
          <p className="mt-6 font-serif text-7xl font-medium tracking-tight">
            {runs.length}
          </p>
          <div className="mt-8 space-y-3">
            {Object.entries(breakdown).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <StatusPill label={status} tone={status === "completed" ? "dark" : "accent"} />
                <span className="text-sm text-ink-secondary">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-8">
          <h2 className="text-[clamp(1.8rem,3vw,3rem)]">Recent runs</h2>
          <div className="mt-8 divide-y divide-border">
            {runs.slice(0, 8).map((run) => (
              <div key={run.id} className="flex items-center justify-between gap-6 py-4">
                <div>
                  <p className="font-medium capitalize">{run.module}</p>
                  <p className="mt-1 text-sm text-ink-secondary">
                    {formatDate(run.started_at)}
                  </p>
                </div>
                <StatusPill label={run.status} tone={run.status === "completed" ? "dark" : "accent"} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "Pending";
  return new Date(value).toLocaleString();
}
