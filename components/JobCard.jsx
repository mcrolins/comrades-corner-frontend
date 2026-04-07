import Link from "next/link";

export default function JobCard({ job }) {
  const tags = [job.level, job.job_type, job.category].filter(Boolean);
  const postedDate = formatDate(job.created_at);

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group block rounded-[1.75rem] border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/60 p-5 text-inherit no-underline shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_20px_44px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-orange-600">
            {job.title}
          </h3>
          <p className="mt-1 truncate text-sm font-semibold text-zinc-700">{job.company}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-600">
            <span className="rounded-full bg-zinc-100 px-3 py-1">{job.location || "Location TBD"}</span>
            {job.is_remote ? (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">Remote</span>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          {postedDate ? (
            <p className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600">
              {postedDate}
            </p>
          ) : null}
        </div>
      </div>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700"
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
