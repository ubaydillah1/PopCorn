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

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&h=400&fit=crop",
    title: "Now Showing",
    description:
      "Book your tickets for the latest blockbusters and enjoy the ultimate cinema experience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200&h=400&fit=crop",
    title: "Experience the Thrill",
    description:
      "Watch the best action films now playing in theaters near you.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200&h=400&fit=crop",
    title: "Romance & Drama",
    description: "Fall in love with heartfelt stories and emotional journeys.",
  },
];

export default function HeroCarousel() {
  return (
    <section className="mb-12 w-full">
      <Carousel
        className="w-full relative"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="w-full basis-full">
              <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-xl">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 px-4 md:px-12 lg:px-32 py-16 text-white">
                  <h1 className="mb-2 text-4xl font-bold">{slide.title}</h1>
                  <p className="mb-4 max-w-md">{slide.description}</p>
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
