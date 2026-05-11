import Link from "next/link";

export default function JobCard({ job }) {
  const tags = [job.level, job.job_type, job.category].filter(Boolean);
  const postedDate = formatDate(job.created_at);

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group block rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm transition-all hover:scale-[1.01] hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/5 dark:bg-zinc-900/40 dark:hover:border-orange-500/30"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-5">
          {/* Mock Logo or Placeholder */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
            <span className="text-xl font-black">{job.company?.charAt(0) || "C"}</span>
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-black tracking-tight text-zinc-950 dark:text-white transition-colors group-hover:text-orange-500">
              {job.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-orange-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 6h4" />
                </svg>
                {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-orange-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {job.location || "Remote"}
              </span>
              {job.is_remote && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Remote
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
          {postedDate && (
            <span className="text-xs font-bold text-zinc-400">
              {postedDate}
            </span>
          )}
          <div className="flex gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {toLabel(tag)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatDate(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toLabel(value) {
  return String(value).replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
