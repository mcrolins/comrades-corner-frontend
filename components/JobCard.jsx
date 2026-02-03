import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 800 }}>{job.title}</div>
          <div style={{ opacity: 0.8 }}>{job.company}</div>
          <div style={{ opacity: 0.7, marginTop: 4 }}>
            {job.location || "—"} {job.is_remote ? "• Remote" : ""}
          </div>
        </div>

        <div style={{ textAlign: "right", opacity: 0.8 }}>
          <div>{job.level}</div>
          <div style={{ fontSize: 12 }}>
            {job.created_at ? new Date(job.created_at).toLocaleDateString() : ""}
          </div>
        </div>
      </div>
    </Link>
  );
}
