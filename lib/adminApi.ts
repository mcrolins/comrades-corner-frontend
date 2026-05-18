const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  return res;
}

export async function adminLogin(username: string, password: string) {
  const res = await apiFetch("/api/admin/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.non_field_errors?.[0] || data?.detail || "Login failed");
  }
  return res.json();
}

export async function adminLogout() {
  await apiFetch("/api/admin/logout/", { method: "POST" });
}

export async function adminCheck() {
  const res = await apiFetch("/api/admin/check/");
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAdminJobs() {
  const res = await apiFetch("/api/admin/jobs/");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function createJob(data: Record<string, unknown>) {
  const res = await apiFetch("/api/admin/jobs/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  return res.json();
}

export async function deleteJob(id: number) {
  const res = await apiFetch(`/api/admin/jobs/${id}/delete/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete job");
}

export async function updateJob(id: number, data: Record<string, unknown>) {
  const res = await apiFetch(`/api/admin/jobs/${id}/update/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update job");
  return res.json();
}

export async function fetchAnalytics() {
  const res = await apiFetch("/api/admin/analytics/");
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}
