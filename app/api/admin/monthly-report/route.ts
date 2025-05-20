/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { month } = await req.json();

    if (!month || isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json(
        { success: false, message: "Invalid month" },
        { status: 400 }
      );
    }

    const [rows]: any[] = await pool.query(`CALL monthlyReport(?)`, [month]);

    return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Failed to generate monthly report:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
