"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Full page reload to ensure cookie & proxy recognition on production
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch {
      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <div className="app-container">
        <div className="glass-card">
          <div className="card-header">
            <div className="badge-assignment">
              <span className="icon">🔐</span>
              <span>Secure Access</span>
            </div>
            <h1 className="hero-title">Welcome Back</h1>
            <p className="hero-subtitle">เข้าสู่ระบบเพื่อเข้าใช้งานพื้นที่สมาชิก</p>
          </div>

          {message && (
            <div className="alert-error">
              <span>⚠️</span>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                <span>Email Address</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Password</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <span>⏳</span> กำลังตรวจสอบ...
                </>
              ) : (
                <>
                  <span>⚡</span> เข้าสู่ระบบ (Login)
                </>
              )}
            </button>
          </form>

          <div className="footer-links-wrap">
            <span>ยังไม่มีบัญชีสมาชิก? </span>
            <Link href="/register">สมัครสมาชิก (Register)</Link>
            <div>
              <Link href="/" className="back-home-link">
                ← กลับสู่หน้าหลัก (Home)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
