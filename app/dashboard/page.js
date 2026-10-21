"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <>
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
        <div className="app-container">
          <div className="glass-card" style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>⚡</div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Verifying Credentials</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>กำลังตรวจสอบสิทธิ์ผ่าน Proxy & JWT Token...</p>
          </div>
        </div>
      </>
    );
  }

  const initial = user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U";

  return (
    <>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <div className="app-container">
        {/* Top Status Bar */}
        <div className="top-status-bar">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>Authenticated Session</span>
          </div>
          <div className="system-tag">COOKIE: HTTPONLY</div>
        </div>

        <div className="glass-card">
          <div className="card-header" style={{ marginBottom: "20px" }}>
            <div className="badge-assignment">
              <span className="icon">🛡️</span>
              <span>Protected Area</span>
            </div>
            <h1 className="hero-title">Member Dashboard</h1>
            <p className="hero-subtitle">พื้นที่สมาชิกสำหรับผู้ผ่านการเข้าสู่ระบบแล้วเท่านั้น</p>
          </div>

          {/* User Profile Card */}
          <div className="dashboard-user-card">
            <div className="dashboard-avatar-large">
              <div className="dashboard-avatar-large-inner">{initial}</div>
            </div>
            <div className="dashboard-user-name">{user.fullname}</div>
            <div className="dashboard-user-email">{user.email}</div>
            <div className="dashboard-status-badge">
              <span className="status-dot"></span>
              <span>Active Member Verified</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-title">Account ID</span>
              <span className="metric-val">#{user.id}</span>
            </div>
            <div className="metric-item">
              <span className="metric-title">Authorization</span>
              <span className="metric-val" style={{ color: "#38bdf8" }}>Verified</span>
            </div>
            <div className="metric-item">
              <span className="metric-title">Session TTL</span>
              <span className="metric-val">1 Hour</span>
            </div>
            <div className="metric-item">
              <span className="metric-title">Database Storage</span>
              <span className="metric-val" style={{ color: "#a855f7" }}>MySQL / TiDB</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button type="button" onClick={handleLogout} className="btn-danger">
              <span>🚪</span>
              <span>ออกจากระบบ (Logout)</span>
            </button>

            <Link href="/" className="btn btn-secondary">
              <span>🏠</span>
              <span>กลับสู่หน้าหลัก (Home)</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
