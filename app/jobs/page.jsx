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
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <div
        style={{
          padding: "14px 16px",
          
          borderRadius: 12,
          background: "var(--background)",
          marginBottom: 10,
          fontWeight: 700,
        }}
      >
      
      <h1 style={{ fontSize: 28, fontWeight: 800 }}> Comrades Corner Entry-level Jobs</h1>
       Number 1 source for entry-level tech jobs.</div>
      <div style={{ marginTop: 12 }}>
        <JobsFilters initial={params} />
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {jobs.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No jobs match your filters.</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
      </div>
    
  );
}
