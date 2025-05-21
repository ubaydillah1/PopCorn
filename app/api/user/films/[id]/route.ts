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
    // Ambil detail film
    const [filmRows]: any = await pool.query(
      "SELECT * FROM v_film_detail WHERE film_id = ?",
      [filmId]
    );

    if (filmRows.length === 0) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }

    const film = filmRows[0];

    // Ambil showtimes untuk film ini
    const [showtimeRows]: any = await pool.query(
      `SELECT schedule_id, show_time AS time, room AS room_name
   FROM v_schedule_list
   WHERE film_id = ?`,
      [filmId]
    );

    film.showtimes = showtimeRows;

    console.log(film);

    return NextResponse.json(film, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
