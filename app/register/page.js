"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch {
      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h1>Create Account</h1>
      <p className="subtitle">ลงทะเบียนผู้ใช้ใหม่เพื่อเข้าสู่ระบบ</p>

      {message && <div className="error">⚠️ {message}</div>}

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name (ชื่อ-นามสกุล)</label>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="เช่น ปิยพนธ์ เทศพันธุ์"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address (อีเมล)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Password (รหัสผ่านอย่างน้อย 6 ตัวอักษร)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "กำลังลงทะเบียน..." : "Register"}
        </button>
      </form>

      <div className="footer-link">
        Already have an account? <Link href="/login">Login</Link>
        <br />
        <Link href="/" style={{ display: "inline-block", marginTop: "12px", color: "var(--text-muted)" }}>
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
