export const DJANGO_API_BASE = process.env.DJANGO_API_BASE;
if (!DJANGO_API_BASE) {
  throw new Error("DJANGO_API_BASE is not set");
}

export function buildQuery(params: Record<string, any> = {}) {
  const qp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    qp.set(k, String(v));
  }
  return qp.toString();
}

export async function fetchJobs(params: Record<string, any> = {}) {
  const qs = buildQuery(params);
  const url = `${DJANGO_API_BASE}/jobs/${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
  return res.json();
}

export async function fetchJob(id: number | string) {
  console.log("fetchJob received id:", id);
  const cleanId = encodeURIComponent(String(id).trim());
  const url = `${DJANGO_API_BASE}/jobs/${cleanId}/`;
  console.log("fetchJob url:", url);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch job: ${res.status}`);
  return res.json();
}
