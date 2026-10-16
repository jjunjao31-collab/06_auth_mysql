import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";

// POST /api/register — create new user
export async function POST(request) {
  try {
    const { email, password, fullname } = await request.json();

    if (!email || !password || !fullname) {
      return NextResponse.json(
        { status: "error", message: "email, password and fullname are required" },
        { status: 400 }
      );
    }

    // Check if email already registered
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return NextResponse.json(
        { status: "error", message: "Email already registered" },
        { status: 409 }
      );
    }

    // Store only bcrypt hash
    const hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (email, password, fullname) VALUES (?, ?, ?)",
      [email, hash, fullname]
    );

    return NextResponse.json({ status: "ok", id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}
