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

  const [typingTimer, setTypingTimer] = useState(null);

  const base = useMemo(() => {
    return Object.fromEntries(sp.entries());
  }, [sp]);

  function push(next) {
    const merged = cleanParams({ ...base, ...next });
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

  const selectClasses = "rounded-2xl border border-black/5 bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-700 outline-none transition-all hover:bg-zinc-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700";

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative min-w-[300px] flex-1 group">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search jobs..."
          className="w-full rounded-2xl border border-black/5 bg-zinc-50 pl-12 pr-4 py-3 text-sm font-bold text-zinc-900 outline-none transition-all placeholder:text-zinc-500 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />
      </div>

      <select
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
          push({ level: e.target.value });
        }}
        className={selectClasses}
      >
        <option value="">All Levels</option>
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
        className={selectClasses}
      >
        <option value="">All Types</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>

      <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
        <input
          type="checkbox"
          className="h-5 w-5 rounded-lg border-none bg-zinc-200 text-orange-500 transition-all focus:ring-orange-500 dark:bg-zinc-700"
          style={{ accentColor: "#f97316" }}
          checked={remote}
          onChange={(e) => {
            setRemote(e.target.checked);
            push({ is_remote: e.target.checked ? "true" : "" });
          }}
        />
        Remote
      </label>

      <select
        value={ordering}
        onChange={(e) => {
          setOrdering(e.target.value);
          push({ ordering: e.target.value });
        }}
        className={selectClasses}
      >
        <option value="-created_at">Newest First</option>
        <option value="created_at">Oldest First</option>
        <option value="deadline">Deadline (Soonest)</option>
        <option value="-deadline">Deadline (Latest)</option>
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
        className="rounded-2xl px-6 py-3 text-sm font-black text-orange-600 transition-all hover:bg-orange-500/10 active:scale-95 dark:text-orange-400"
      >
        Reset
      </button>
    </div>
  );
}
