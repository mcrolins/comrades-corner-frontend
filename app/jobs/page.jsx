import JobsFilters from "@/components/JobsFilters";
import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/lib/jobsApi";

export default async function JobsPage({ searchParams }) {
  const sp = await searchParams; // ✅ unwrap Promise in Next.js 16

  // These come from the URL: /jobs?search=...&level=... etc.
  const params = {
    search: sp?.search ?? "",
    level: sp?.level ?? "",
    job_type: sp?.job_type ?? "",
    is_remote: sp?.is_remote ?? "",
    category: sp?.category ?? "",
    ordering: sp?.ordering ?? "-created_at",
  };

  // Server-side search/filtering because we send params to Django
  const jobs = await fetchJobs(params);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2.25rem] border border-black/10 bg-white/80 px-6 py-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">
              Job board
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
              Comrades Corner entry-level jobs
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-700 sm:text-lg">
              Browse recent openings for interns, graduates, juniors, and early-career talent with
              filters that keep the search focused.
            </p>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-zinc-200 bg-white/75 p-4 sm:grid-cols-3 lg:min-w-[360px]">
            {[
              { label: "Sorted by", value: "Newest first" },
              { label: "Best for", value: "Junior talent" },
              { label: "Work modes", value: "Remote + hybrid" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-zinc-50 px-3 py-2">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <JobsFilters initial={params} />
      </section>

      <section className="grid gap-4">
        {jobs.length === 0 ? (
          <div className="rounded-[1.75rem] border border-zinc-200 bg-white/80 p-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
            <p className="text-lg font-semibold text-zinc-900">No jobs match your filters.</p>
            <p className="mt-2 text-sm text-zinc-600">
              Try broadening the search terms or clearing one of the filters.
            </p>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </section>
    </main>
  );
}
