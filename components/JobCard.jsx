import Link from "next/link";

export default function JobCard({ job }) {
  const tags = [job.level, job.job_type, job.category].filter(Boolean);
  const postedDate = formatDate(job.created_at);

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group block rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/60 p-4 text-inherit no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60 focus-visible:ring-offset-2 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/40 dark:hover:border-zinc-700"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {job.title}
          </h3>
          <p className="mt-1 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">{job.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-200/70 px-2.5 py-1 dark:bg-zinc-800">{job.location || "Location TBD"}</span>
            {job.is_remote ? <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">Remote</span> : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          {postedDate ? (
            <p className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {postedDate}
            </p>
          ) : null}
        </div>
      </div>

      {tags.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {toLabel(tag)}
            </span>
          ))}
        </div>
      ) : null}
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
