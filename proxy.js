import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Intercepts requests matching config.matcher before reaching pages
export async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
