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
      <div className="auth-box" style={{ textAlign: "center" }}>
        <p className="subtitle">กำลังโหลดข้อมูลผู้ใช้...</p>
      </div>
    );
  }

  const initial = user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U";

  return (
    <div className="auth-box">
      <div className="avatar">{initial}</div>

      <h1>Member Dashboard</h1>
      <p className="subtitle">พื้นที่เฉพาะสำหรับสมาชิกที่เข้าสู่ระบบแล้ว</p>

      <div className="user-info">
        <div className="user-info-row">
          <span className="user-info-label">Full Name:</span>
          <span className="user-info-value">{user.fullname}</span>
        </div>
        <div className="user-info-row">
          <span className="user-info-label">Email:</span>
          <span className="user-info-value">{user.email}</span>
        </div>
        <div className="user-info-row">
          <span className="user-info-label">Account ID:</span>
          <span className="user-info-value">#{user.id}</span>
        </div>
        <div className="user-info-row">
          <span className="user-info-label">Status:</span>
          <span className="user-info-value" style={{ color: "var(--success)" }}>● Active Member</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button type="button" onClick={handleLogout} className="btn-danger">
          🚪 Logout (ออกจากระบบ)
        </button>

        <Link href="/" className="btn btn-secondary">
          🏠 กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
