import Link from "next/link";
import { fetchJob } from "@/lib/jobsApi";

export default async function JobDetailPage({ params }) {
  const resolvedParams = await params; // ✅ unwrap the Promise
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const job = await fetchJob(id);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <Link href="/jobs">← Back to jobs</Link>

      <h1 style={{ marginTop: 12, fontSize: 28, fontWeight: 900 }}>{job.title}</h1>
      <div style={{ opacity: 0.85, marginTop: 6 }}>
        {job.company} • {job.location || "—"} {job.is_remote ? "• Remote" : ""}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
        <Tag text={job.level} />
        <Tag text={job.job_type} />
        {job.category ? <Tag text={job.category} /> : null}
        {job.deadline ? <Tag text={`Deadline: ${job.deadline}`} /> : null}
      </div>

      <section style={{ marginTop: 16 }}>
        <h3>Description</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{job.description}</p>
      </section>

      {job.requirements ? (
        <section style={{ marginTop: 16 }}>
          <h3>Requirements</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{job.requirements}</p>
        </section>
      ) : null}

      <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {job.apply_url ? (
          <a href={job.apply_url} target="_blank" rel="noreferrer">
            Apply (Link)
          </a>
        ) : null}
        {job.apply_email ? <a href={`mailto:${job.apply_email}`}>Apply (Email)</a> : null}
      </div>
    </div>
  );
}

function Tag({ text }) {
  return (
    <span style={{ border: "1px solid #ddd", borderRadius: 999, padding: "6px 10px", fontSize: 12 }}>
      {text}
    </span>
  );
}
