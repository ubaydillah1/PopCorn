/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM v_user_booking_summary");

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user booking summary:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
