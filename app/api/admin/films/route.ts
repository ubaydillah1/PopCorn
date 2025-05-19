/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/admin/films/route.ts
import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM v_film_detail");

    const data = (rows as any[]).map((row) => ({
      id: row.film_id,
      title: row.title,
      ageRating: row.age_rating,
      duration: row.duration,
      releaseDate: row.release_date,
      genre: row.genres?.split(", ").map((g: string) => g.trim()) || [],
      synopsis: row.synopsis,
      author: row.author_name,
      studio: row.studio_name,
      posterPath: row.poster_path,
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      backdropPath,
      posterPath,
      ageRating,
      duration,
      releaseDate,
      synopsis,
      authorId,
      studioId,
      genreIds,
    } = body;

    const genreString = genreIds.join(",");

    await pool.query(`CALL addFilmWithGenres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      title,
      backdropPath || "",
      posterPath,
      ageRating,
      duration,
      releaseDate,
      synopsis,
      authorId,
      studioId,
      genreString,
    ]);

    return NextResponse.json(
      { message: "Film added successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
