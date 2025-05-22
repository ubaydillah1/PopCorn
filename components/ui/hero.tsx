"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, CalendarDays, UserIcon, Building2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface HeroProps {
  title: string;
  posterPath: string;
  backdropPath?: string;
  rating: string;
  duration: string;
  releaseDate: string;
  genres: string[] | string;
  author_name: string;
  studio_name: string;
  synopsis: string;
  className?: string;
  showBookButton?: boolean;
  onBookButtonClick?: () => void;
}

function HeroInfoItem({
  icon: Icon,
  children,
  iconClassName,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  iconClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-1 text-sm text-gray-300", className)}
    >
      <Icon className={cn("h-4 w-4", iconClassName)} />
      <span>{children}</span>
    </div>
  );
}

function HeroContent({
  title,
  rating,
  duration,
  releaseDate,
  genres,
  author_name,
  studio_name,
  synopsis,
  className,
}: Omit<HeroProps, "posterPath"> & { className?: string }) {
  const genreList = Array.isArray(genres)
    ? genres
    : genres.split(",").map((g) => g.trim());

  return (
    <div className={cn("text-white", className)}>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>

      <div className="flex gap-4 mb-2 flex-wrap">
        <Badge variant="destructive">{rating}</Badge>
        <HeroInfoItem icon={Clock}>{duration}</HeroInfoItem>
        <HeroInfoItem icon={CalendarDays}>{releaseDate}</HeroInfoItem>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {genreList.map((genre) => (
          <Badge key={genre} variant="secondary">
            {genre}
          </Badge>
        ))}
      </div>

      <p className="text-sm text-gray-200 mb-4 max-w-xl">{synopsis}</p>

      <div className="text-sm text-gray-300 mb-4 flex gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-white" />
          <span className="text-white font-medium">{author_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2Icon className="w-4 h-4 text-white" />
          <span className="text-white font-medium">{studio_name}</span>
        </div>
      </div>
    </div>
  );
}

function Hero({
  title,
  posterPath,
  rating,
  duration,
  releaseDate,
  genres,
  author_name,
  studio_name,
  synopsis,
  className,
  showBookButton = true,
  onBookButtonClick,
}: HeroProps) {
  const formattedDate = new Date(releaseDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section
      className={cn(
        "relative w-full flex items-center justify-center my-[70px]",
        className
      )}
    >
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl w-full max-w-5xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] items-start">
          <div className="relative w-full h-full rounded-md overflow-hidden bg-blue-50 shadow-md">
            <Image
              src={posterPath}
              alt={posterPath}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col md:ml-8 items-center md:items-start flex-3 col-span-2 ">
            <HeroContent
              title={title}
              rating={rating}
              duration={duration}
              releaseDate={formattedDate}
              genres={genres}
              author_name={author_name}
              studio_name={studio_name}
              synopsis={synopsis}
              className="text-center md:text-left"
            />
            {showBookButton && onBookButtonClick && (
              <Button
                onClick={onBookButtonClick}
                className="w-full md:w-auto mt-2"
              >
                Book Ticket
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export { Hero };
