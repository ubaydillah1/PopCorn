/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT most_booked_film FROM v_most_booked_film;"
    );
    const filmName = (rows as any)[0]?.most_booked_film ?? null;

    return NextResponse.json({ most_booked_film: filmName });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch most booked film. Error: " + error.message },
      { status: 500 }
    );
  }
}
