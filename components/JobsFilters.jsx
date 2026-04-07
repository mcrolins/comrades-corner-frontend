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

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-zinc-200 bg-white/80 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search title, company, location..."
        className="min-w-[260px] flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
      />

      <select
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
          push({ level: e.target.value });
        }}
        className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
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
        className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
      >
        <option value="">All types</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>

      <label className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700">
        <input
          type="checkbox"
          className="h-4 w-4 rounded"
          style={{ accentColor: "#f97316" }}
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
        className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
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
        className="cursor-pointer rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-200"
      >
        Clear
      </button>
    </div>
  );
}
