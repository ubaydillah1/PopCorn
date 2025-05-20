/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function POST() {
  try {
    await pool.query("CALL cancelOldTickets()");
    return NextResponse.json(
      { success: true, message: "Old tickets cancelled successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Failed to cancel old tickets:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to cancel old tickets.",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
