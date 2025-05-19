/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM v_total_revenue_global;");

    const totalRevenue = (rows as any)[0]?.total_revenue ?? 0;

    return NextResponse.json({ total_revenue: totalRevenue });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch total revenue, error:" + (error as Error) },
      { status: 500 }
    );
  }
}
