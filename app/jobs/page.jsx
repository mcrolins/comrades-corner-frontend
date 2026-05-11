import Link from "next/link";
import JobsFilters from "@/components/JobsFilters";
import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/lib/jobsApi";

export default async function JobsPage({ searchParams }) {
  const sp = await searchParams;

  const params = {
    search: sp?.search ?? "",
    level: sp?.level ?? "",
    job_type: sp?.job_type ?? "",
    is_remote: sp?.is_remote ?? "",
    category: sp?.category ?? "",
    ordering: sp?.ordering ?? "-created_at",
  };

  const jobs = await fetchJobs(params);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-2xl shadow-orange-500/5 dark:border-white/5 dark:bg-zinc-900/50 dark:shadow-none sm:p-12">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/5" />
        
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Job Board
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl text-balance">
              Find your next career move at Comrades Corner.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
              We curate the best entry-level opportunities for graduates and interns. 
              Use the filters below to find roles that match your skills.
            </p>
          </div>

          <div className="grid shrink-0 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:min-w-[240px]">
            {[
              { label: "Active Roles", value: jobs.length + "+" },
              { label: "Target", value: "Early Career" },
              { label: "Updated", value: "Live Now" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50 dark:border dark:border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-black text-zinc-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-4 z-20">
        <div className="rounded-[2rem] border border-black/5 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-900/80">
          <JobsFilters initial={params} />
        </div>
      </section>

      {/* Jobs List Section */}
      <section className="grid gap-6">
        {jobs.length === 0 ? (
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-12 text-center shadow-sm dark:border-white/5 dark:bg-zinc-900/40">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-black text-zinc-950 dark:text-white">No results found</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
            <Link 
              href="/jobs"
              className="mt-6 inline-flex items-center font-bold text-orange-500 hover:text-orange-700"
            >
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
