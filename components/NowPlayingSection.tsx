/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import FilmCard from "@/components/FilmCard";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

async function fetchNowPlaying() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/user/tickets/now-showing"
    );
    if (!res.ok) throw new Error("Failed to fetch now showing films");
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching now playing:", (error as Error).message);
    return null;
  }
}

export default function NowPlayingSection() {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/metadata")
      .then((res) => res.json())
      .then((data) => {
        const genreNames = data.genres?.map((g: any) => g.name) || [];
        setGenres(["All", ...genreNames]);
      })
      .catch((err) => console.error("Failed to fetch genres", err));
  }, []);

  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    fetchNowPlaying().then((data) => {
      if (data) setFilms(data);
    });
  }, []);

  return (
    <section className="mb-12 px-4 md:px-12 lg:px-32">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Now Playing</h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button key={genre} variant="outline" size="sm">
              {genre}
            </Button>
          ))}
        </div>
      </div>

      {films?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {films.map((film: any) => (
            <FilmCard
              key={film.id}
              film={{
                ...film,
                poster: film.poster_path,
                genres:
                  typeof film.genres === "string"
                    ? film.genres.split(",").map((g: string) => g.trim())
                    : [],
              }}
              variant="now-playing"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 p-10 text-gray-500">
          <AlertCircle size={40} />
          <p className="text-center text-lg">
            No currently playing films found.
          </p>
        </div>
      )}
    </section>
  );
}
