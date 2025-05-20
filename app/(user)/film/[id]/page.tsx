"use client";

import React, { use, useState } from "react";
import { notFound } from "next/navigation";
import { films } from "@/app/data/films";
import { Hero } from "@/components/ui/hero";
import { Dialog } from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const BookingDialog = dynamic(() => import("@/components/ui/booking-dialog"));

export default function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const film = films.find((film) => film.id === Number(id));
  const [open, setOpen] = useState(false);

  if (!film) return notFound();

  return (
    <div className="w-full flex justify-center items-center py-[40px]">
      <Hero
        title={film.title}
        backdropPath={film.poster}
        posterPath={film.poster}
        rating={String(film.rating)}
        duration={film.duration}
        releaseDate={film.releaseDate}
        genres={film.genres}
        author={film.author}
        studio={film.studio}
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
