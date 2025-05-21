/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scheduleId = searchParams.get("scheduleId");

  if (!scheduleId) {
    return NextResponse.json(
      { message: "Missing scheduleId" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.query(
      `SELECT seat_id, seat_label FROM v_used_seats_by_schedule WHERE schedule_id = ?`,
      [scheduleId]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch used seats",
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
