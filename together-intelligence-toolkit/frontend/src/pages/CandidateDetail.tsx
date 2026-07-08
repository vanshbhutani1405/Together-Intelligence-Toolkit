import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import ReportCard from "@/components/ReportCard";
import { getCandidateReports, getCandidates } from "@/services/api";
import type { Candidate, ReportRecord } from "@/types/api";

export default function CandidateDetail() {
  const { id } = useParams();
  const candidateId = Number(id);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Number.isNaN(candidateId)) {
      setError("Invalid candidate id");
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    getCandidateReports(candidateId)
      .then((data) => {
        if (!cancelled) {
          setReports(data);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    getCandidates()
      .then((data) => {
        if (!cancelled) {
          setCandidate(data.find((item) => item.id === candidateId) ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCandidate(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [candidateId, id]);

  const diligenceReport = reports.find((report) => report.report_type === "diligence");
  const recommendationReport = reports.find(
    (report) => report.report_type === "recommendation",
  );
  const visibleReports = [diligenceReport, recommendationReport].filter(
    (report): report is ReportRecord => Boolean(report),
  );

  return (
    <PageShell>
      <section className="max-w-4xl">
        <h1>Candidate Detail</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-secondary">
          Review the current diligence and routing output for this candidate.
        </p>
      </section>

      {loading ? <p className="mt-8 text-sm text-ink-secondary">Loading candidate reports...</p> : null}
      {error ? <p className="mt-8 text-sm text-terracotta">{error}</p> : null}

      {!loading && !error ? (
        <section className="mt-14 space-y-8">
          {candidate ? (
            <div className="rounded-xl border border-border bg-white p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-ink-secondary">
                Candidate
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,3rem)]">{candidate.company}</h2>
              <p className="mt-5 text-base leading-7 text-ink-secondary">
                {candidate.description}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBlock label="Similarity score" value={formatScore(candidate.similarity_score)} />
                <InfoBlock label="Confidence" value={formatScore(candidate.confidence)} />
              </div>
            </div>
          ) : null}

          {visibleReports.length > 0 ? (
            <div className="grid gap-6">
              {visibleReports.map((report) => (
                <ReportCard key={report.id} className="min-h-[240px]">
                  <div className="pr-12">
                    <p className="text-sm uppercase tracking-[0.16em] text-ink-secondary">
                      {report.report_type}
                    </p>
                    <h2 className="mt-4 text-[clamp(1.8rem,3vw,3rem)]">
                      {formatReportTitle(report.report_type)}
                    </h2>
                    <pre className="mt-5 overflow-auto whitespace-pre-wrap text-sm leading-6 text-ink-secondary">
                      {formatReportContent(report.content)}
                    </pre>
                  </div>
                </ReportCard>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-white p-6">
              <p className="text-lg leading-8 text-ink-secondary">
                No diligence or routing reports yet
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  className="inline-flex items-center gap-3 rounded-full border border-ink px-5 py-3 text-sm font-medium text-ink transition duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-ink"
                  to={`/diligence?candidate_id=${candidateId}`}
                >
                  Run Diligence
                </Link>
                <Link
                  className="inline-flex items-center gap-3 rounded-full border border-ink px-5 py-3 text-sm font-medium text-ink transition duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-ink"
                  to={`/route?candidate_id=${candidateId}`}
                >
                  Run Routing
                </Link>
              </div>
            </div>
          )}
        </section>
      ) : null}
    </PageShell>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-cream p-5">
      <p className="text-sm uppercase tracking-[0.16em] text-ink-secondary">{label}</p>
      <p className="mt-3 text-base text-ink">{value}</p>
    </div>
  );
}

function formatScore(value?: number | null) {
  if (typeof value !== "number") return "n/a";
  return value.toFixed(2);
}

function formatReportTitle(reportType: string) {
  if (reportType === "diligence") return "Diligence Report";
  if (reportType === "recommendation") return "Routing Report";
  return "Report";
}

function formatReportContent(content: unknown) {
  if (typeof content === "string") return content;
  return JSON.stringify(content, null, 2);
}
