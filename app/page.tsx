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
  { name: "Industrial Attachment", meta: "Internships, practicums, on-the-job training" },
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,36,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%)] dark:bg-zinc-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-12 sm:px-8 lg:px-10">
        
        {/* Navigation */}
        <nav className="sticky top-6 z-50 flex flex-col gap-4 rounded-2xl md:rounded-full border border-black/5 bg-white/70 px-6 py-4 shadow-xl shadow-black/5 backdrop-blur-xl md:flex-row md:items-center md:justify-between dark:border-white/5 dark:bg-zinc-900/80">
          <Link href="/" className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">
            Comrades Corner
          </Link>
          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="transition hover:text-orange-500 dark:hover:text-orange-400">Features</a>
            <a href="#categories" className="transition hover:text-orange-500 dark:hover:text-orange-400">Categories</a>
            <a href="#featured-jobs" className="transition hover:text-orange-500 dark:hover:text-orange-400">Live Jobs</a>
            <Link
              href="/jobs?ordering=-created_at"
              className="rounded-full bg-zinc-950 px-6 py-2.5 text-white transition hover:bg-orange-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-orange-500 dark:hover:text-white"
            >
              Browse Jobs
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-5 py-2 text-sm font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Future-Proof Your Career
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-8xl text-balance leading-[1.1]">
                Modern job board for the next generation.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-2xl">
                Discover curated roles for graduates, interns, and junior talent. Narrow them down fast and apply in seconds.
              </p>
            </div>

            <div className="grid gap-4 rounded-[2.5rem] border border-black/5 bg-white p-5 shadow-2xl shadow-black/5 dark:border-white/5 dark:bg-zinc-900/50 sm:grid-cols-[1.2fr_0.9fr_0.8fr_auto]">
              <div className="rounded-2xl bg-zinc-50 px-5 py-4 dark:bg-zinc-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Keyword</p>
                <p className="mt-1 text-base font-bold text-zinc-900 dark:text-white">Engineering, Data...</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 px-5 py-4 dark:bg-zinc-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Level</p>
                <p className="mt-1 text-base font-bold text-zinc-900 dark:text-white">Entry / Junior</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 px-5 py-4 dark:bg-zinc-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mode</p>
                <p className="mt-1 text-base font-bold text-zinc-900 dark:text-white">Remote First</p>
              </div>
              <Link
                href="/jobs?ordering=-created_at"
                className="flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-4 text-base font-black text-white transition hover:bg-orange-600 hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-500/20"
              >
                Search
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-widest text-zinc-500">
              {candidateBenefits.map((item) => (
                <span key={item} className="rounded-full border border-zinc-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/5" />
            <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px] dark:bg-orange-500/5" />

            <div className="relative overflow-hidden rounded-[3rem] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-2xl dark:border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic tracking-tighter">MOMENTUM</h2>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">Live</div>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {quickStats.map((item) => (
                  <div key={item.label}>
                    <p className="text-4xl font-black text-white">{item.value}</p>
                    <p className="mt-2 text-sm font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 p-6 text-zinc-950">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">User Feedback</p>
                <p className="mt-3 text-lg font-bold leading-tight">
                  &quot;The fastest way to find internships that don&apos;t feel like dead ends.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">Our Philosophy</p>
            <h2 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
              Built for signal, not noise.
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              We focus on the candidate experience first. No spam, no ghosting, just high-quality roles.
            </p>
          </div>

          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {featurePillars.map((feature) => (
              <article key={feature.title} className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-sm transition hover:border-orange-500/20 dark:border-white/5 dark:bg-zinc-900/40">
                <h3 className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">{feature.title}</h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600">Exploration</p>
              <h2 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
                Browse by career track.
              </h2>
            </div>
            <Link href="/jobs" className="text-sm font-black text-orange-600 underline decoration-2 underline-offset-8 transition hover:text-orange-700">
              View All Tracks
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href="/jobs"
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-8 transition-all hover:-translate-y-1 hover:border-orange-500/30 dark:border-white/5 dark:bg-zinc-900/40"
              >
                <div>
                  <span className="text-4xl font-black text-zinc-100 dark:text-white/5 transition-colors group-hover:text-orange-500/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-zinc-950 dark:text-white group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {category.meta}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 transition-all group-hover:translate-x-2">
                  Explore <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section id="featured-jobs" className="rounded-[3rem] border border-black/5 bg-zinc-950 p-10 text-white shadow-2xl dark:border-white/10 dark:bg-zinc-900/60 sm:p-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">Live Inventory</p>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Featured Openings</h2>
            </div>
            <Link href="/jobs" className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black transition hover:bg-white hover:text-zinc-950">
              Open Full List
            </Link>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {featuredJobs.length ? (
              featuredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="rounded-3xl border border-dashed border-white/20 p-12 text-center text-zinc-500 lg:col-span-2">
                Loading live opportunities...
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-[3rem] bg-orange-500 p-12 text-white shadow-2xl shadow-orange-500/30 sm:p-20">
          <div className="mx-auto max-w-4xl text-center space-y-10">
            <h2 className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.1]">
              Ready to find your first role?
            </h2>
            <p className="text-xl font-bold text-white/90 sm:text-2xl">
              Stop scrolling, start applying. The newest listings are waiting for you.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/jobs" className="rounded-2xl bg-white px-10 py-5 text-lg font-black text-orange-600 transition hover:bg-zinc-950 hover:text-white hover:scale-105 active:scale-95 shadow-xl">
                Browse Newest Jobs
              </Link>
              <Link href="/jobs?is_remote=true" className="rounded-2xl border-2 border-white/30 px-10 py-5 text-lg font-black transition hover:bg-white/10">
                Remote Only
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-6 border-t border-black/5 py-12 dark:border-white/5 md:flex-row">
          <p className="text-sm font-bold text-zinc-500 dark:text-zinc-500">
            © 2026 Comrades Corner. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-orange-500">Twitter</a>
            <a href="#" className="hover:text-orange-500">LinkedIn</a>
            <a href="#" className="hover:text-orange-500">GitHub</a>
          </div>
        </footer>

      </section>
    </main>
  );
}

async function getFeaturedJobs() {
  try {
    const jobs = await fetchJobs({ ordering: "-created_at" });
    return Array.isArray(jobs) ? jobs.slice(0, 4) : [];
  } catch {
    return [];
  }
}
