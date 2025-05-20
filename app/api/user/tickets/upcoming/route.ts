/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM v_upcoming");

    return NextResponse.json(
      {
        success: true,
        data: rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch upcoming films",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
