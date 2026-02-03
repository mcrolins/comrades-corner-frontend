"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function cleanParams(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = v;
  }
  return out;
}

export default function JobsFilters({ initial }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [search, setSearch] = useState(initial.search || "");
  const [level, setLevel] = useState(initial.level || "");
  const [jobType, setJobType] = useState(initial.job_type || "");
  const [remote, setRemote] = useState(initial.is_remote === "true");
  const [ordering, setOrdering] = useState(initial.ordering || "-created_at");

  // Debounce search typing (simple)
  const [typingTimer, setTypingTimer] = useState(null);

  const base = useMemo(() => {
    // Keep any unknown params if you want; this keeps it simple:
    return Object.fromEntries(sp.entries());
  }, [sp]);

  function push(next) {
    const merged = cleanParams({ ...base, ...next });

    // Convert boolean to "true"/"" for DjangoFilterBackend
    if (merged.is_remote === false || merged.is_remote === "false") delete merged.is_remote;

    const qs = new URLSearchParams(merged).toString();
    router.push(`/jobs${qs ? `?${qs}` : ""}`);
  }

  function onSearchChange(value) {
    setSearch(value);
    if (typingTimer) clearTimeout(typingTimer);
    const t = setTimeout(() => push({ search: value }), 350);
    setTypingTimer(t);
  }

  const controlStyle = {
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "var(--background)",
    color: "var(--foreground)",
    fontSize: 14,
    lineHeight: 1.2,
  };

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search title, company, location..."
        style={{ ...controlStyle, minWidth: 280 }}
      />

      <select
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
          push({ level: e.target.value });
        }}
        style={controlStyle}
      >
        <option value="">All levels</option>
        <option value="intern">Internship</option>
        <option value="entry">Entry Level</option>
        <option value="junior">Junior</option>
        <option value="grad">Graduate Trainee</option>
      </select>

      <select
        value={jobType}
        onChange={(e) => {
          setJobType(e.target.value);
          push({ job_type: e.target.value });
        }}
        style={controlStyle}
      >
        <option value="">All types</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={remote}
          onChange={(e) => {
            setRemote(e.target.checked);
            push({ is_remote: e.target.checked ? "true" : "" });
          }}
        />
        Remote only
      </label>

      <select
        value={ordering}
        onChange={(e) => {
          setOrdering(e.target.value);
          push({ ordering: e.target.value });
        }}
        style={controlStyle}
      >
        <option value="-created_at">Newest</option>
        <option value="created_at">Oldest</option>
        <option value="deadline">Deadline (soonest)</option>
        <option value="-deadline">Deadline (latest)</option>
      </select>

      <button
        onClick={() => {
          setSearch("");
          setLevel("");
          setJobType("");
          setRemote(false);
          setOrdering("-created_at");
          router.push("/jobs?ordering=-created_at");
        }}
        style={{ ...controlStyle, padding: "10px 12px", cursor: "pointer" }}
      >
        Clear
      </button>
    </div>
  );
}
