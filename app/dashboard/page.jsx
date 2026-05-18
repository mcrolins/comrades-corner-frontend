"use client";

import { useState, useEffect } from "react";
import LoginScreen from "./LoginScreen";
import DashboardShell from "./DashboardShell";
import { adminCheck } from "@/lib/adminApi";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    adminCheck()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#09090b", color: "#a1a1aa"
      }}>
        <div className="dash-loader" />
      </div>
    );
  }

  if (!user) return <LoginScreen onLogin={setUser} />;
  return <DashboardShell user={user} onLogout={() => setUser(null)} />;
}
