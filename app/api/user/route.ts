/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const [rows]: any = await pool.execute(
    "SELECT name, role FROM users WHERE id = ?",
    [id]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: rows[0].name,
    role: rows[0].role,
  });
}
