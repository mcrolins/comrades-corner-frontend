"use client";
import { useState } from "react";
import { adminLogout } from "@/lib/adminApi";
import AnalyticsPanel from "./AnalyticsPanel";
import ListingsPanel from "./ListingsPanel";
import "./dashboard.css";

const NAV_ITEMS = [
  { key: "analytics", label: "Analytics", icon: "📊" },
  { key: "listings", label: "Listings", icon: "📋" },
];

export default function DashboardShell({ user, onLogout }) {
  const [tab, setTab] = useState("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await adminLogout();
    onLogout();
  }

  return (
    <div className="dash-root">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="dash-sidebar-header">
          <div className="dash-brand">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Comrades Corner</span>
          </div>
        </div>

        <nav className="dash-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`dash-nav-btn ${tab === item.key ? "active" : ""}`}
              onClick={() => { setTab(item.key); setSidebarOpen(false); }}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <div className="dash-user-info">
            <div className="dash-avatar">{user.username?.[0]?.toUpperCase() || "A"}</div>
            <div>
              <p className="dash-user-name">{user.username}</p>
              <p className="dash-user-role">Administrator</p>
            </div>
          </div>
          <button id="admin-logout-btn" className="dash-logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        <header className="dash-topbar">
          <button className="dash-hamburger" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="dash-page-title">
            {NAV_ITEMS.find((i) => i.key === tab)?.label}
          </h1>
        </header>

        <div className="dash-content">
          {tab === "analytics" && <AnalyticsPanel />}
          {tab === "listings" && <ListingsPanel />}
        </div>
      </main>
    </div>
  );
}
