"use client";
import { useState, useEffect } from "react";
import { fetchAnalytics } from "@/lib/adminApi";

function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card" style={{ borderColor: accent + "30" }}>
      <p className="stat-label">{label}</p>
      <p className="stat-value" style={{ color: accent }}>{value}</p>
    </div>
  );
}

function MiniBar({ items, colorFn }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="mini-bar-list">
      {items.map((item, idx) => (
        <div key={idx} className="mini-bar-row">
          <span className="mini-bar-label">{formatLabel(item.level || item.job_type)}</span>
          <div className="mini-bar-track">
            <div
              className="mini-bar-fill"
              style={{
                width: `${(item.count / max) * 100}%`,
                background: colorFn(idx),
              }}
            />
          </div>
          <span className="mini-bar-count">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

function DemandTable({ title, jobs, accent }) {
  return (
    <div className="demand-card">
      <h3 className="demand-title" style={{ color: accent }}>{title}</h3>
      <div className="demand-list">
        {jobs.map((j) => (
          <div key={j.id} className="demand-row">
            <div>
              <p className="demand-job-title">{j.title}</p>
              <p className="demand-job-company">{j.company}</p>
            </div>
            <span className="demand-views">{j.view_count} views</span>
          </div>
        ))}
        {jobs.length === 0 && <p className="demand-empty">No data yet</p>}
      </div>
    </div>
  );
}

function VisitChart({ dailyVisits }) {
  if (!dailyVisits?.length) return <p className="chart-empty">No visit data yet</p>;
  const max = Math.max(...dailyVisits.map((d) => d.count), 1);
  return (
    <div className="visit-chart">
      {dailyVisits.map((d, i) => (
        <div key={i} className="chart-col">
          <div className="chart-bar-wrapper">
            <div
              className="chart-bar"
              style={{ height: `${(d.count / max) * 100}%` }}
              title={`${d.day}: ${d.count} visits`}
            />
          </div>
          <span className="chart-label">{d.day?.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

function RecentVisitsTable({ visits }) {
  return (
    <div className="visits-table-wrap">
      <table className="visits-table">
        <thead>
          <tr>
            <th>Session</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Duration</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v.id}>
              <td className="visit-session">{v.session_key?.slice(0, 10)}…</td>
              <td>{formatDt(v.clock_in)}</td>
              <td>{v.clock_out ? formatDt(v.clock_out) : <span className="visit-active">Active</span>}</td>
              <td>{v.duration_seconds != null ? formatDuration(v.duration_seconds) : "—"}</td>
              <td className="visit-ip">{v.ip_address || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AnalyticsPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchAnalytics()
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel-loading">Loading analytics…</div>;
  if (err) return <div className="panel-error">{err}</div>;

  const colors = ["#f97316", "#0ea5e9", "#8b5cf6", "#10b981", "#ec4899"];

  return (
    <div className="analytics-panel">
      {/* KPI row */}
      <div className="stats-grid">
        <StatCard label="Total Listings" value={data.total_jobs} accent="#f97316" />
        <StatCard label="Total Visitors" value={data.total_visits} accent="#0ea5e9" />
        <StatCard label="Active Now" value={data.active_visitors} accent="#10b981" />
        <StatCard label="Visits Today" value={data.visits_today} accent="#8b5cf6" />
        <StatCard label="Avg. Session" value={formatDuration(data.avg_session_seconds)} accent="#ec4899" />
      </div>

      {/* Daily visits chart */}
      <div className="analytics-section">
        <h2 className="section-title">Daily Visits (14 days)</h2>
        <div className="chart-card">
          <VisitChart dailyVisits={data.daily_visits} />
        </div>
      </div>

      {/* Distributions */}
      <div className="distrib-grid">
        <div className="distrib-card">
          <h2 className="section-title">By Level</h2>
          <MiniBar items={data.level_distribution} colorFn={(i) => colors[i % colors.length]} />
        </div>
        <div className="distrib-card">
          <h2 className="section-title">By Type</h2>
          <MiniBar items={data.type_distribution} colorFn={(i) => colors[(i + 2) % colors.length]} />
        </div>
      </div>

      {/* Demand */}
      <div className="demand-grid">
        <DemandTable title="🔥 Most Demanding" jobs={data.most_demanding} accent="#f97316" />
        <DemandTable title="❄️ Least Demanding" jobs={data.least_demanding} accent="#0ea5e9" />
      </div>

      {/* Recent visits */}
      <div className="analytics-section">
        <h2 className="section-title">Recent Visitor Sessions</h2>
        <RecentVisitsTable visits={data.recent_visits} />
      </div>
    </div>
  );
}

function formatLabel(val) {
  if (!val) return "—";
  return String(val).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDt(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDuration(seconds) {
  if (seconds == null || seconds === 0) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}
