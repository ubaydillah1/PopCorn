/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM v_recent_users;");

    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch recent users. Error: " + error.message },
      { status: 500 }
    );
  }
}
