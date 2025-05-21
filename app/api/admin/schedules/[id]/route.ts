/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { filmId, roomId, showTime, price } = body;
    const { id } = await params;

    await pool.query("CALL editSchedule(?, ?, ?, ?, ?)", [
      parseInt(id),
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query("CALL deleteSchedule(?)", [parseInt(id)]);
    return NextResponse.json({ message: "Schedule deleted successfully" });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: error.sqlMessage || error.message },
      { status: 400 }
    );
  }
}
