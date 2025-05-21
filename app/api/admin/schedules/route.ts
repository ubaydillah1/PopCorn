/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM v_schedule_list");
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filmId, roomId, showTime, price } = body;

    await pool.query("CALL addSchedule(?, ?, ?, ?)", [
      filmId,
      roomId,
      showTime,
      price,
    ]);

    return NextResponse.json({ message: "Schedule added successfully" });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: error.sqlMessage || error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
