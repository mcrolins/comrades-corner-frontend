import Link from "next/link";
import { fetchJob } from "@/lib/jobsApi";

export default async function JobDetailPage({ params }) {
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const job = await fetchJob(id);
  const applyHref = job.apply_url || (job.apply_email ? `mailto:${job.apply_email}` : null);
  const applyLabel = job.apply_url ? "Apply via website" : job.apply_email ? "Apply by email" : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <nav>
        <Link
          href="/jobs"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-5 py-2.5 text-sm font-bold text-zinc-600 transition-all hover:bg-white hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all jobs
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-2xl shadow-orange-500/5 dark:border-white/5 dark:bg-zinc-900/50 dark:shadow-none sm:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/5" />
        
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              Now Hiring
            </div>
            
            <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl text-balance">
              {job.title}
            </h1>
            
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-medium text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 6h4" /></svg>
                {job.company}
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {job.location || "Remote"}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Tag text={job.level} primary />
              <Tag text={job.job_type} />
              <Tag text={job.category} />
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-4">
            {applyHref && (
              <a
                href={applyHref}
                target={job.apply_url ? "_blank" : undefined}
                rel={job.apply_url ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-4 text-base font-black text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95"
              >
                {applyLabel}
              </a>
            )}
            {job.apply_email && job.apply_url && (
              <a
                href={`mailto:${job.apply_email}`}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-8 py-4 text-base font-bold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Apply via Email
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Description Card */}
          <article className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-zinc-900/40 sm:p-10">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
              Role Description
            </h2>
            <div className="mt-8">
              <p className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                {job.description}
              </p>
            </div>
          </article>

          {/* Requirements Card */}
          {job.requirements && (
            <article className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-zinc-900/40 sm:p-10">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                Requirements & Qualifications
              </h2>
              <div className="mt-8">
                <p className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                  {job.requirements}
                </p>
              </div>
            </article>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <div className="sticky top-8 flex flex-col gap-6">
            <div className="rounded-[2rem] border border-black/5 bg-zinc-950 p-8 text-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
              <h3 className="text-xl font-black">Role Snapshot</h3>
              <div className="mt-8 space-y-6">
                <SnapshotItem icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="Employment Type" value={job.job_type} />
                <SnapshotItem icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>} label="Experience Level" value={job.level} />
                <SnapshotItem icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="Deadline" value={job.deadline || "Ongoing"} />
              </div>

              <div className="mt-10 rounded-2xl bg-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Pro Tip</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Tailor your CV to highlight skills matching this description for a better chance at being noticed!
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Tag({ text, primary = false }) {
  if (!text) return null;
  return (
    <span className={`rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider ${
      primary 
        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
    }`}>
      {text}
    </span>
  );
}

function SnapshotItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</p>
        <p className="mt-1 text-sm font-black text-white">{value || "Not specified"}</p>
      </div>
    </div>
  );
}
