import Link from "next/link";

export default function Home() {
  return (
    <div className="auth-box">
      <div className="student-badge">
        <span>🎓 Assignment 07 • Web Deploy on Cloud</span>
      </div>

      <h1>Auth System</h1>
      <p className="subtitle">Next.js + MySQL (TiDB Cloud) + Vercel</p>

      {/* บัตรแสดงข้อมูลนักศึกษาตามโจทย์ */}
      <div className="student-card">
        <div className="label">ข้อมูลผู้จัดทำ</div>
        <div className="name">ปิยพนธ์ เทศพันธุ์</div>
        <div className="id">รหัสนักศึกษา: 6801094</div>
      </div>

      <div className="nav-list">
        <Link href="/register" className="nav-link-card">
          <span>📝 Register (สมัครสมาชิก)</span>
          <span>→</span>
        </Link>
        <Link href="/login" className="nav-link-card">
          <span>🔐 Login (เข้าสู่ระบบ)</span>
          <span>→</span>
        </Link>
        <Link href="/dashboard" className="nav-link-card">
          <span>📊 Dashboard (พื้นที่สมาชิก)</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
