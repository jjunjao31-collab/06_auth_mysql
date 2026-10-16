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
        // Full page navigation as required by tutorial to ensure cookie & proxy pickup
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
    <div className="auth-box">
      <h1>Welcome Back</h1>
      <p className="subtitle">เข้าสู่ระบบเพื่อเข้าถึงแดชบอร์ด</p>

      {message && <div className="error">⚠️ {message}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
        </button>
      </form>

      <div className="footer-link">
        No account yet? <Link href="/register">Register</Link>
        <br />
        <Link href="/" style={{ display: "inline-block", marginTop: "12px", color: "var(--text-muted)" }}>
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
