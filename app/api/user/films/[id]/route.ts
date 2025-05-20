/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const filmId = id;

  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM v_film_detail WHERE film_id = ?",
      [filmId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
