import { NextResponse } from "next/server";

// POST /api/logout — delete token cookie
export async function POST() {
  const response = NextResponse.json({ status: "ok" });
  response.cookies.delete("token");
  return response;
}
