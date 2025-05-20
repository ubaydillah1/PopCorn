/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM v_now_showing");

    return NextResponse.json(
      {
        data: rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch now showing films",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
