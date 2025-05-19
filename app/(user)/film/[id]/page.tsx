"use client";

import React, { use, useState } from "react";
import { notFound } from "next/navigation";
import { films } from "@/app/data/films";
import { Hero } from "@/components/ui/hero";
import { Dialog } from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const BookingDialog = dynamic(() => import("@/components/ui/booking-dialog"));
const RecommendedFilmCard = dynamic(() =>
  import("@/components/ui/card-recommended").then((mod) => mod.RecommendedFilmCard)
);

export default function FilmDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const film = films.find((film) => film.id === Number(id));
  const [open, setOpen] = useState(false);

  if (!film) return notFound();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const recommendedFilms = React.useMemo(() => films.filter((f) => f.id !== film.id), [film.id]);

  return (
    <div className="relative w-full">
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

      <section className="px-4 md:px-12 lg:px-32 pb-12">
        <h2 className="text-3xl font-bold mb-6">Recommended Films</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {recommendedFilms.map((film, index) => (
            <RecommendedFilmCard key={film.id} film={film} index={index} />
          ))}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <BookingDialog film={film} />
      </Dialog>
    </div>
  );
}
