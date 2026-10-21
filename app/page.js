import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <div className="app-container">
        {/* Top Status Bar */}
        <div className="top-status-bar">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>TiDB Cloud Connected</span>
          </div>
          <div className="system-tag">DIT205 • NEXT.JS 16</div>
        </div>

        {/* Main Showcase Glass Card */}
        <div className="glass-card">
          <div className="card-header">
            <div className="badge-assignment">
              <span className="icon">🎓</span>
              <span>Assignment 07 • Web Deploy on Cloud</span>
            </div>

            <h1 className="hero-title">Authentication System</h1>
            <div className="hero-subtitle">
              <span className="tech-chip">Next.js 16</span>
              <span>•</span>
              <span className="tech-chip">MySQL / TiDB</span>
              <span>•</span>
              <span className="tech-chip">Vercel</span>
            </div>
          </div>

          {/* บัตรข้อมูลนักศึกษา / Developer Credential Pass */}
          <div className="dev-id-card">
            <div className="dev-profile-wrap">
              <div className="dev-avatar-ring">
                <div className="dev-avatar-inner">ป</div>
              </div>
              <div className="dev-details">
                <span className="dev-label">ผู้พัฒนาและจัดทำระบบ</span>
                <span className="dev-name">ปิยพนธ์ เทศพันธุ์</span>
                <div className="dev-id-tag">
                  <span>รหัสนักศึกษา:</span>
                  <span className="badge-num">6801094</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Action Cards */}
          <div className="portal-grid">
            <Link href="/register" className="portal-card">
              <div className="portal-content">
                <div className="portal-icon">📝</div>
                <div className="portal-text">
                  <span className="portal-title">Register (สมัครสมาชิก)</span>
                  <span className="portal-desc">ลงทะเบียนผู้ใช้ใหม่ เข้ารหัสรหัสผ่านด้วย Bcrypt</span>
                </div>
              </div>
              <div className="portal-arrow">→</div>
            </Link>

            <Link href="/login" className="portal-card">
              <div className="portal-content">
                <div className="portal-icon">🔐</div>
                <div className="portal-text">
                  <span className="portal-title">Login (เข้าสู่ระบบ)</span>
                  <span className="portal-desc">ยืนยันตัวตนและรับ JWT Token ใน Cookie</span>
                </div>
              </div>
              <div className="portal-arrow">→</div>
            </Link>

            <Link href="/dashboard" className="portal-card">
              <div className="portal-content">
                <div className="portal-icon">📊</div>
                <div className="portal-text">
                  <span className="portal-title">Dashboard (พื้นที่สมาชิก)</span>
                  <span className="portal-desc">หน้าพิเศษเฉพาะสมาชิก ป้องกันด้วย Proxy Middleware</span>
                </div>
              </div>
              <div className="portal-arrow">→</div>
            </Link>
          </div>

          {/* System Security Features */}
          <div className="system-features-row">
            <div className="feat-pill">
              <span className="icon">🔒</span>
              <span>Bcrypt Salt 10</span>
            </div>
            <div className="feat-pill">
              <span className="icon">🍪</span>
              <span>HttpOnly Cookie</span>
            </div>
            <div className="feat-pill">
              <span className="icon">🛡️</span>
              <span>Proxy Middleware</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
