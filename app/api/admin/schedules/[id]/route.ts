/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { filmId, roomId, showTime, price } = body;

    await pool.query("CALL editSchedule(?, ?, ?, ?, ?)", [
      parseInt(params.id),
      filmId,
      roomId,
      showTime,
      price,
    ]);

    return NextResponse.json({ message: "Schedule updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.sqlMessage || error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query("CALL deleteSchedule(?)", [parseInt(params.id)]);
    return NextResponse.json({ message: "Schedule deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.sqlMessage || error.message },
      { status: 400 }
    );
  }
}
