import Link from "next/link";
import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/lib/jobsApi";

const quickStats = [
  { value: "2.4k+", label: "entry-level roles sourced weekly" },
  { value: "420+", label: "remote-friendly openings live now" },
  { value: "38", label: "career tracks across product and engineering" },
];

const featurePillars = [
  {
    title: "Search that respects how candidates actually browse",
    body: "Jump from keyword search into filters for remote work, experience level, contract type, and role category without losing momentum.",
  },
  {
    title: "Fresh listings instead of stale reposts",
    body: "The landing page routes candidates straight into the newest jobs feed so the first click is already useful.",
  },
  {
    title: "Built for early-career conversion",
    body: "The messaging is centered on interns, graduates, juniors, and career-switchers rather than generic enterprise hiring copy.",
  },
];

const categories = [
  { name: "Software Engineering", meta: "Backend, frontend, QA, platform" },
  { name: "Data & AI", meta: "Analytics, ML ops, BI, data engineering" },
  { name: "Design & Product", meta: "Product design, UX writing, PM" },
  { name: "IT & Support", meta: "Cloud, help desk, systems, security" },
  { name: "Marketing & Growth", meta: "Content, SEO, lifecycle, social" },
  { name: "Operations", meta: "People ops, finance, customer success" },
];

const candidateBenefits = [
  "Remote and hybrid roles surfaced quickly",
  "Clear entry-level filters with fewer dead ends",
  "Recent postings prioritized by default",
  "Job detail pages with direct apply actions",
];

export default async function Home() {
  const featuredJobs = await getFeaturedJobs();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,36,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,#fffdf8_0%,#ffffff_36%,#f7f7f2_100%)] text-zinc-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex flex-col gap-4 rounded-full border border-black/10 bg-white/80 px-5 py-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-lg font-black tracking-tight text-zinc-950">
            Comrades Corner
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-700">
            <a href="#features" className="transition hover:text-zinc-950">
              Features
            </a>
            <a href="#categories" className="transition hover:text-zinc-950">
              Categories
            </a>
            <a href="#featured-jobs" className="transition hover:text-zinc-950">
              Live jobs
            </a>
            <Link
              href="/jobs?ordering=-created_at"
              className="rounded-full bg-zinc-950 px-4 py-2 text-white transition hover:bg-orange-500"
            >
              Browse jobs
            </Link>
          </div>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              Early-career jobs for people who want signal, not noise
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-balance text-zinc-950 sm:text-6xl lg:text-7xl">
                A modern entry-level job board for graduates, interns, and junior talent.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
                Discover newly posted roles, narrow them down fast, and jump directly into
                application flows that do not waste your time.
              </p>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:grid-cols-[1.2fr_0.9fr_0.8fr_auto]">
              <div className="rounded-[1.5rem] bg-zinc-100 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">Keyword</p>
                <p className="mt-2 text-base font-semibold text-zinc-900">Frontend, support, data analyst</p>
              </div>
              <div className="rounded-[1.5rem] bg-zinc-100 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">Level</p>
                <p className="mt-2 text-base font-semibold text-zinc-900">Entry / Graduate</p>
              </div>
              <div className="rounded-[1.5rem] bg-zinc-100 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">Mode</p>
                <p className="mt-2 text-base font-semibold text-zinc-900">Remote or hybrid</p>
              </div>
              <Link
                href="/jobs?ordering=-created_at"
                className="flex items-center justify-center rounded-[1.5rem] bg-orange-500 px-6 py-3 text-base font-bold text-white transition hover:bg-orange-600"
              >
                Start searching
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-medium text-zinc-600">
              {candidateBenefits.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200 bg-white/80 px-4 py-2 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-sky-200/50 blur-3xl md:block" />
            <div className="absolute -right-6 bottom-10 hidden h-36 w-36 rounded-full bg-orange-200/60 blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-[0_30px_120px_rgba(15,23,42,0.2)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-400">
                    Candidate Pulse
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Today&apos;s momentum</h2>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Updated live
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {quickStats.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] bg-white/6 p-5 ring-1 ring-white/10">
                    <p className="text-3xl font-black text-white">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-gradient-to-r from-orange-500 to-amber-400 p-5 text-zinc-950">
                <p className="text-xs font-black uppercase tracking-[0.24em]">What candidates want</p>
                <p className="mt-3 text-lg font-semibold leading-7">
                  Fewer irrelevant postings, faster filtering, and job cards that help you decide
                  whether to click.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="grid gap-6 rounded-[2.25rem] border border-black/10 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="space-y-4">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-600">Why this works</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Landing-page sections that behave like a real job product, not a brochure.
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-700">
              The homepage introduces the value proposition, exposes the main search path, and
              previews live inventory so users understand the board before they commit to browsing.
            </p>
          </div>

          <div className="grid gap-4">
            {featurePillars.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-0.5 hover:bg-white"
              >
                <h3 className="text-xl font-black tracking-tight text-zinc-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-700">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="categories" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">Browse by track</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                Categories candidates actually understand at a glance.
              </h2>
            </div>
            <Link
              href="/jobs?ordering=-created_at"
              className="text-sm font-bold text-zinc-700 underline decoration-orange-400 underline-offset-4 transition hover:text-zinc-950"
            >
              View all open roles
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/jobs?ordering=-created_at`}
                className="group rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-zinc-950"
              >
                <p className="text-sm font-black uppercase tracking-[0.26em] text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-2xl font-black tracking-tight text-zinc-950">{category.name}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-700">{category.meta}</p>
                <span className="mt-6 inline-flex text-sm font-bold text-orange-600 transition group-hover:translate-x-1">
                  Explore roles
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="featured-jobs"
          className="rounded-[2.25rem] border border-black/10 bg-zinc-950 px-6 py-7 text-white shadow-[0_30px_120px_rgba(15,23,42,0.18)]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-300">Live preview</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Featured roles from the current jobs feed.
              </h2>
            </div>
            <Link
              href="/jobs?ordering=-created_at"
              className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-zinc-950"
            >
              Open full listings
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {featuredJobs.length ? (
              featuredJobs.map((job: { id: string | number }) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-white/5 p-8 text-sm leading-7 text-zinc-300 lg:col-span-3">
                Live jobs could not be loaded for the homepage preview. The main jobs page still
                remains the primary search destination once `DJANGO_API_BASE` is available.
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 pb-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2.25rem] border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-600">Trust markers</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950">
              What a modern job-board homepage needs
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Strong hero headline and clear CTA",
                "Search-first routing into real inventory",
                "Feature explanation with product language",
                "Category navigation that reduces bounce",
                "Live role preview for credibility",
                "Closing section that drives repeat browsing",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-zinc-100 px-4 py-4 text-sm font-semibold text-zinc-800">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] bg-orange-500 p-6 text-white shadow-[0_24px_80px_rgba(249,115,22,0.28)]">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-100">Ready to browse</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Start with the newest listings and refine from there.
            </h2>
            <p className="mt-4 text-base leading-7 text-orange-50">
              The homepage now pushes candidates toward `/jobs` with the newest entries already
              prioritized.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/jobs?ordering=-created_at"
                className="rounded-full bg-white px-5 py-3 text-sm font-black text-orange-600 transition hover:bg-zinc-950 hover:text-white"
              >
                Browse newest jobs
              </Link>
              <Link
                href="/jobs?is_remote=true&ordering=-created_at"
                className="rounded-full border border-white/35 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-orange-600"
              >
                Remote only
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

async function getFeaturedJobs() {
  try {
    const jobs = await fetchJobs({ ordering: "-created_at" });
    return Array.isArray(jobs) ? jobs.slice(0, 3) : [];
  } catch {
    return [];
  }
}
