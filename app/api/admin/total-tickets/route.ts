import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM v_total_tickets_global;");

    return NextResponse.json(
      {
        data: rows,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch film statistics",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
