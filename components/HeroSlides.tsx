/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AlertCircle } from "lucide-react";

export default function HeroCarousel() {
  const [films, setFilms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/user/tickets/now-showing"
        );
        const result = await res.json();
        setFilms(result.data || []);
      } catch (err) {
        console.error("Failed to load now showing films:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading slides...</p>
      </section>
    );
  }

  if (!films.length) {
    return (
      <section className="h-[60vh] flex items-center justify-center flex-col text-gray-500">
        <AlertCircle size={40} />
        <p className="mt-2 text-lg">No currently playing films available.</p>
      </section>
    );
  }

  return (
    <section className="mb-12 w-full">
      <Carousel
        className="w-full relative"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {films.map((film, index) => (
            <CarouselItem key={film.id} className="w-full basis-full">
              <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-xl">
                <Image
                  src={
                    film.backdrop_path || film.poster_path || "/placeholder.jpg"
                  }
                  alt={film.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 px-4 md:px-12 lg:px-32 py-16 text-white">
                  <h1 className="mb-2 text-4xl font-bold">{film.title}</h1>
                  <p className="mb-4 max-w-md">
                    {film.synopsis?.slice(0, 120) ||
                      "Experience the thrill of cinema!"}
                  </p>
                  <Button size="lg" asChild>
                    <a href="#movies">Browse Movies</a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden lg:flex absolute top-1/2 md:left-12 lg:left-32 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2 md:p-3" />
        <CarouselNext className="hidden lg:flex absolute top-1/2 md:right-12 lg:right-32 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2 md:p-3" />
      </Carousel>
    </section>
  );
}
