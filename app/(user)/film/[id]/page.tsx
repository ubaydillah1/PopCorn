"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { films } from "@/app/data/films";
import { Hero } from "@/components/ui/hero";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface FilmDetailPageProps {
  params: Promise<{ id: string }>;
}

function RecommendedFilmCard({
  film,
  index,
}: {
  film: typeof films[number];
  index: number;
}) {
  const formattedDate = React.useMemo(() => {
    const date = new Date(new Date(film.releaseDate).getTime());
    date.setMonth(date.getMonth() + index + 1);
    return date.toISOString().split("T")[0];
  }, [film.releaseDate, index]);

  return (
    <Card
      key={`recommendation-${film.id}`}
      className="relative flex-shrink-0 snap-start w-[260px] sm:w-[300px] md:w-[340px] h-[180px] overflow-hidden rounded-lg "
    >
      <Image src={film.poster} alt={`Recommended: ${film.title}`} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <CardContent className="absolute bottom-0 text-white w-full p-3 z-10">
        <h3 className="text-base font-bold line-clamp-2">{film.title}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-300">
          <CalendarDays className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FilmDetailPage({ params }: FilmDetailPageProps) {
  const { id } = use(params);
  const film = films.find((film) => film.id === Number(id));

  if (!film) return notFound();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const recommendedFilms = React.useMemo(() => films.filter((f) => f.id !== film.id), [film.id]);

  return (
    <div className="relative w-full ">
      <Hero
        title={film.title}
        backdropPath={film.poster}
        posterPath={film.poster}
        rating={film.rating}
        duration={film.duration}
        releaseDate={film.releaseDate}
        genres={film.genres}
        author={film.author}
        studio={film.studio}
      />

      <section className="px-4 md:px-12 lg:px-32 pb-12 ">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Recommended Films</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {recommendedFilms.map((film, index) => (
            <RecommendedFilmCard key={film.id} film={film} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}