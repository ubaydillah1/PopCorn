/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [authors] = await pool.query(
      "SELECT id, author_name AS name FROM authors"
    );
    const [studios] = await pool.query(
      "SELECT id, studio_name AS name FROM studios"
    );
    const [genres] = await pool.query(
      "SELECT id, genre_name AS name FROM genres"
    );

    return NextResponse.json({ authors, studios, genres }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
