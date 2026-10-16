import "./style.css";

export const metadata = {
  title: "Auth System | ปิยพนธ์ เทศพันธุ์ (6801094)",
  description: "Next.js Authentication with MySQL and TiDB Cloud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
