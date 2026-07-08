import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { getCandidates } from "@/services/api";
import type { Candidate } from "@/types/api";

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCandidates().then(setCandidates).catch((err) => setError(err.message));
  }, []);

  return (
    <PageShell>
      <section className="max-w-4xl">
        <h1>Candidates</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-secondary">
          A compact list of discovered candidates with their current similarity and confidence signals.
        </p>
      </section>

      {error ? <p className="mt-8 text-sm text-terracotta">{error}</p> : null}

      <section className="mt-14 overflow-hidden rounded-xl border border-border bg-white">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-sm text-ink-secondary">
              <th className="px-6 py-5 font-medium">Company</th>
              <th className="px-6 py-5 font-medium">Similarity</th>
              <th className="px-6 py-5 font-medium">Confidence</th>
              <th className="px-6 py-5 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="px-6 py-5">
                  <Link className="hover:text-ink" to={`/candidates/${candidate.id}`}>
                    {candidate.company}
                  </Link>
                </td>
                <td className="px-6 py-5 text-sm text-ink-secondary">
                  {formatScore(candidate.similarity_score)}
                </td>
                <td className="px-6 py-5 text-sm text-ink-secondary">
                  {formatScore(candidate.confidence)}
                </td>
                <td className="px-6 py-5 text-sm text-ink-secondary">
                  {formatDate(candidate.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}

function formatScore(value?: number | null) {
  if (typeof value !== "number") return "n/a";
  return value.toFixed(2);
}

function formatDate(value?: string | null) {
  if (!value) return "Pending";
  return new Date(value).toLocaleString();
}