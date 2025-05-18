/* eslint-disable react/no-unescaped-entities */
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Type definitions (optional for safety)
type Film = {
  id: number;
  title: string;
  poster: string;
  ageRating: string;
  duration: string;
  releaseDate: string;
  genres: string[];
};

type Author = {
  id: string;
  name: string;
  films: Film[];
};

// Dummy data
const authors: Author[] = [
  {
    id: "1",
    name: "Christopher Nolan",
    films: [
      {
        id: 1,
        title: "Inception",
        poster:
          "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
        ageRating: "13+",
        duration: "2h 28m",
        releaseDate: "2023-07-05",
        genres: ["Action", "Sci-Fi", "Thriller"],
      },
      {
        id: 2,
        title: "Interstellar",
        poster:
          "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
        ageRating: "13+",
        duration: "2h 49m",
        releaseDate: "2023-09-10",
        genres: ["Adventure", "Drama", "Sci-Fi"],
      },
    ],
  },
  {
    id: "2",
    name: "New Author",
    films: [], // intentionally empty
  },
];

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = authors.find((a) => a.id === id);
  if (!author) return notFound();

  return (
    <div className="px-4 md:px-12 lg:px-32 py-10">
      <h1 className="text-3xl font-bold mb-6">Author: {author.name}</h1>

      {author.films.length === 0 ? (
        <div className="h-60 flex flex-col items-center justify-center text-muted-foreground text-center border border-dashed rounded-lg p-8">
          <p className="text-lg font-semibold">No films found.</p>
          <p className="text-sm">This author hasn't added any films yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {author.films.map((film) => (
            <Card key={film.id} className="overflow-hidden pt-0 pb-2">
              <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={film.poster}
                  alt={film.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent>
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <Badge variant="destructive">{film.ageRating}</Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{film.duration}</span>
                  </div>
                </div>
                <h3 className="mb-1 line-clamp-1 text-lg font-bold">
                  {film.title}
                </h3>
                <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{film.releaseDate}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {film.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/film/${film.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
