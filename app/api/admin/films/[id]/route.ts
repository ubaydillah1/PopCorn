/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filmId = parseInt(id);
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
    const formattedReleaseDate = new Date(releaseDate)
      .toISOString()
      .split("T")[0];

    await pool.query(
      `CALL editFilmWithGenres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        filmId,
        title,
        backdropPath || "",
        posterPath,
        ageRating,
        duration,
        formattedReleaseDate,
        synopsis,
        authorId,
        studioId,
        genreString,
      ]
    );

    return NextResponse.json(
      { message: "Film updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const filmId = parseInt(id);

    await pool.query(`CALL deleteFilmById(?)`, [filmId]);

    return NextResponse.json(
      { message: "Film deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
