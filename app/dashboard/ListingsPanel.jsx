"use client";
import { useState, useEffect } from "react";
import { fetchAdminJobs, createJob, deleteJob } from "@/lib/adminApi";

const LEVEL_OPTIONS = [
  { value: "attachment", label: "Attachment" },
  { value: "intern", label: "Internship" },
  { value: "entry", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "grad", label: "Graduate Trainee" },
];

const TYPE_OPTIONS = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const EMPTY_FORM = {
  title: "", company: "", location: "", is_remote: false,
  level: "entry", job_type: "full_time", category: "",
  description: "", requirements: "", apply_url: "", apply_email: "", deadline: "",
};

export default function ListingsPanel() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => { loadJobs(); }, []);
  useEffect(() => { setPage(1); }, [search]);

  async function loadJobs() {
    setLoading(true);
    try {
      const data = await fetchAdminJobs();
      setJobs(data);
    } catch { setError("Failed to load jobs"); }
    finally { setLoading(false); }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      if (!payload.deadline) delete payload.deadline;
      if (!payload.apply_url) delete payload.apply_url;
      if (!payload.apply_email) delete payload.apply_email;
      await createJob(payload);
      setForm(EMPTY_FORM);
      setShowForm(false);
      await loadJobs();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this listing?")) return;
    setDeleting(id);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch { setError("Delete failed"); }
    finally { setDeleting(null); }
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    return j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedJobs = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) return <div className="panel-loading">Loading listings…</div>;

  return (
    <div className="listings-panel">
      {error && <div className="listings-error">{error}<button onClick={() => setError("")}>✕</button></div>}

      {/* Toolbar */}
      <div className="listings-toolbar">
        <input
          className="listings-search"
          placeholder="Search listings…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          id="new-listing-btn"
          className="listings-add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ New Listing"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form className="listing-form" onSubmit={handleCreate}>
          <h3 className="form-title">Create New Listing</h3>
          <div className="form-grid">
            <label className="form-field">
              <span>Title *</span>
              <input required value={form.title} onChange={(e) => updateField("title", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Company *</span>
              <input required value={form.company} onChange={(e) => updateField("company", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Location</span>
              <input value={form.location} onChange={(e) => updateField("location", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Category</span>
              <input value={form.category} onChange={(e) => updateField("category", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Level</span>
              <select value={form.level} onChange={(e) => updateField("level", e.target.value)}>
                {LEVEL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label className="form-field">
              <span>Job Type</span>
              <select value={form.job_type} onChange={(e) => updateField("job_type", e.target.value)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label className="form-field form-check">
              <input type="checkbox" checked={form.is_remote} onChange={(e) => updateField("is_remote", e.target.checked)} />
              <span>Remote</span>
            </label>
            <label className="form-field">
              <span>Deadline</span>
              <input type="date" value={form.deadline} onChange={(e) => updateField("deadline", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Apply URL</span>
              <input type="url" value={form.apply_url} onChange={(e) => updateField("apply_url", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Apply Email</span>
              <input type="email" value={form.apply_email} onChange={(e) => updateField("apply_email", e.target.value)} />
            </label>
          </div>
          <label className="form-field form-full">
            <span>Description *</span>
            <textarea required rows={4} value={form.description} onChange={(e) => updateField("description", e.target.value)} />
          </label>
          <label className="form-field form-full">
            <span>Requirements</span>
            <textarea rows={3} value={form.requirements} onChange={(e) => updateField("requirements", e.target.value)} />
          </label>
          <button type="submit" className="form-submit" disabled={saving}>
            {saving ? "Creating…" : "Create Listing"}
          </button>
        </form>
      )}

      {/* Listings table */}
      <div className="listings-table-wrap">
        <table className="listings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Level</th>
              <th>Type</th>
              <th>Views</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
              <tr key={job.id}>
                <td className="listing-title">{job.title}</td>
                <td>{job.company}</td>
                <td><span className="listing-badge">{formatLabel(job.level)}</span></td>
                <td><span className="listing-badge type">{formatLabel(job.job_type)}</span></td>
                <td className="listing-views">{job.view_count}</td>
                <td className="listing-date">{new Date(job.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="listing-delete-btn"
                    onClick={() => handleDelete(job.id)}
                    disabled={deleting === job.id}
                  >
                    {deleting === job.id ? "…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {paginatedJobs.length === 0 && (
              <tr><td colSpan={7} className="listings-empty">No listings found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
        <p className="listings-count" style={{ margin: 0 }}>{filtered.length} total listings</p>
        
        {totalPages > 1 && (
          <div className="pagination-controls" style={{ marginTop: 0 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatLabel(val) {
  if (!val) return "—";
  return String(val).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
