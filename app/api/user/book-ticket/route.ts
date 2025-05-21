/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, scheduleId, seatIds } = body;

    if (
      !userId ||
      !scheduleId ||
      !Array.isArray(seatIds) ||
      seatIds.length === 0
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const seatIdString = seatIds.join(",");

    const conn = await pool.getConnection();
    try {
      await conn.query(`CALL bookTicket(?, ?, ?)`, [
        userId,
        scheduleId,
        seatIdString,
      ]);
    } finally {
      conn.release();
    }

    return NextResponse.json(
      { message: "Ticket booked successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Booking failed",
        error: error.sqlMessage || error.message || "Internal error",
      },
      { status: 500 }
    );
  }
}
