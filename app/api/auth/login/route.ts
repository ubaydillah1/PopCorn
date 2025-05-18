/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function POST(req: Request) {
  const { id } = await req.json();

  const [rows]: any = await pool.execute(
    "SELECT role FROM users WHERE id = ?",
    [id]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ role: rows[0].role });
}
