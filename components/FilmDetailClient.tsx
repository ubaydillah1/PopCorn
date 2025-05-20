/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Hero } from "@/components/ui/hero";
import BookingDialog from "@/components/ui/booking-dialog";

export default function FilmDetailClient({ film }: { film: any }) {
  const [open, setOpen] = useState(false);

  const genres = Array.isArray(film.genres)
    ? film.genres
    : film.genres.split(", ").map((g: string) => g.trim());

  return (
    <div className="w-full flex justify-center items-center">
      <Hero
        title={film.title}
        posterPath={film.poster_path}
        rating={film.age_rating}
        duration={film.duration}
        releaseDate={film.release_date}
        genres={genres}
        author_name={film.author_name}
        studio_name={film.studio_name}
        synopsis={film.synopsis}
        showBookButton={true}
        onBookButtonClick={() => setOpen(true)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <BookingDialog film={film} />
      </Dialog>
    </div>
  );
}
