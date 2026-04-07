import Link from "next/link";
import { fetchJob } from "@/lib/jobsApi";

export default async function JobDetailPage({ params }) {
  const resolvedParams = await params; // ✅ unwrap the Promise
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const job = await fetchJob(id);
  const applyHref = job.apply_url || (job.apply_email ? `mailto:${job.apply_email}` : null);
  const applyLabel = job.apply_url ? "Apply via website" : job.apply_email ? "Apply by email" : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/jobs"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:translate-x-0.5 hover:text-zinc-950"
      >
        <span aria-hidden="true">←</span>
        Back to jobs
      </Link>

      <section className="rounded-[2.25rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">
              Open role
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
              {job.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-zinc-700">
              {job.company} · {job.location || "Location TBD"} {job.is_remote ? "· Remote" : ""}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Tag text={job.level} />
              <Tag text={job.job_type} />
              {job.category ? <Tag text={job.category} /> : null}
              {job.deadline ? <Tag text={`Deadline: ${job.deadline}`} /> : null}
            </div>
          </div>

          <div className="w-full max-w-sm rounded-[1.75rem] border border-zinc-200 bg-zinc-50/90 p-5">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-zinc-500">
              Quick apply
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Review the role details and use the employer&apos;s preferred application channel below.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {applyHref ? (
                <a
                  href={applyHref}
                  target={job.apply_url ? "_blank" : undefined}
                  rel={job.apply_url ? "noreferrer" : undefined}
                  className="rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:bg-orange-600"
                >
                  {applyLabel}
                </a>
              ) : null}
              {job.apply_url && job.apply_email ? (
                <a
                  href={`mailto:${job.apply_email}`}
                  className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-black text-zinc-700 transition hover:bg-white"
                >
                  Apply by email
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-black tracking-tight text-zinc-950">Description</h2>
          <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-zinc-700">
            {job.description}
          </p>
        </article>

        <div className="grid gap-6">
          {job.requirements ? (
            <article className="rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Requirements
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-zinc-700">
                {job.requirements}
              </p>
            </article>
          ) : null}

          <article className="rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950">
              Role snapshot
            </h2>
            <div className="mt-5 grid gap-3">
              <Snapshot label="Company" value={job.company || "Not specified"} />
              <Snapshot label="Location" value={job.location || "Location TBD"} />
              <Snapshot label="Work mode" value={job.is_remote ? "Remote-friendly" : "On-site or unspecified"} />
              <Snapshot label="Category" value={job.category || "General"} />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function Tag({ text }) {
  if (!text) return null;
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
      {text}
    </span>
  );
}

function Snapshot({ label, value }) {
  return (
    <div className="rounded-[1.5rem] bg-white/80 px-4 py-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-zinc-900">{value}</p>
    </div>
  );
}
