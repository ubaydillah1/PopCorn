import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface FilmCardProps {
  film: {
    id: number;
    title: string;
    poster: string;
    ageRating: number;
    duration: string;
    releaseDate: string;
    genres: string[];
  };
  variant?: "now-playing" | "upcoming";
  index?: number; // optional, only for "upcoming"
}

export default function FilmCard({
  film,
  variant = "now-playing",
  index = 0,
}: FilmCardProps) {
  const adjustedDate =
    variant === "upcoming"
      ? new Date(
          new Date(film.releaseDate).getTime() +
            1000 * 60 * 60 * 24 * 30 * (index + 1)
        )
          .toISOString()
          .split("T")[0]
      : film.releaseDate;

  return (
    <Card className="overflow-hidden pt-0! pb-2">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          src={film.poster}
          alt={film.title}
          fill
          className="absolute inset-0 object-cover transition-transform duration-300 hover:scale-105"
        />
        {variant === "upcoming" && (
          <div className="absolute right-3 top-3">
            <Badge className="bg-red-500 hover:bg-red-600 text-black font-bold px-3 py-2">
              Coming Soon
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="pb-4">
        {variant === "now-playing" && (
          <div className="mb-2 flex items-center justify-between text-sm">
            <Badge variant="destructive">{film.ageRating}</Badge>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{film.duration}</span>
            </div>
          </div>
        )}

        <h3 className="mb-1 line-clamp-1 text-lg font-bold">{film.title}</h3>

        <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{adjustedDate}</span>
        </div>

        {variant === "now-playing" && (
          <div className="flex flex-wrap gap-1">
            {film.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {variant === "now-playing" && (
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full">
            <Link href={`/film/${film.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
