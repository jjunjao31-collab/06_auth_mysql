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
    <>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <div className="app-container">
        <div className="glass-card">
          <div className="card-header">
            <div className="badge-assignment">
              <span className="icon">📝</span>
              <span>New Registration</span>
            </div>
            <h1 className="hero-title">Create Account</h1>
            <p className="hero-subtitle">ลงทะเบียนเพื่อเริ่มต้นใช้งานระบบสมาชิก</p>
          </div>

          {message && (
            <div className="alert-error">
              <span>⚠️</span>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">
                <span>Full Name (ชื่อ - นามสกุล)</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="เช่น ปิยพนธ์ เทศพันธุ์"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Email Address (อีเมล)</span>
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
                <span>Password (รหัสผ่าน)</span>
                <span className="form-label-hint">MIN 6 CHARACTERS</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <span>⏳</span> กำลังบันทึกข้อมูล...
                </>
              ) : (
                <>
                  <span>🚀</span> ลงทะเบียน (Register)
                </>
              )}
            </button>
          </form>

          <div className="footer-links-wrap">
            <span>มีบัญชีสมาชิกอยู่แล้ว? </span>
            <Link href="/login">เข้าสู่ระบบ (Login)</Link>
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
