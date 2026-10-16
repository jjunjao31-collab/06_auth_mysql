import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// GET /api/me — returns current authenticated user or 401
export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({ id: user.id, email: user.email, fullname: user.fullname });
}
