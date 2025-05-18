import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroCarousel from "@/components/HeroSlides";

const samplePoster =
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop";

const films = [
  {
    id: 1,
    title: "Avengers: Endgame",
    poster: samplePoster,
    ageRating: 4.8,
    duration: "3h 2m",
    releaseDate: "2023-05-15",
    genres: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster: samplePoster,
    ageRating: 4.9,
    duration: "2h 22m",
    releaseDate: "2023-06-10",
    genres: ["Drama"],
  },
  {
    id: 3,
    title: "Inception",
    poster: samplePoster,
    ageRating: 4.7,
    duration: "2h 28m",
    releaseDate: "2023-07-05",
    genres: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster: samplePoster,
    ageRating: 4.9,
    duration: "2h 32m",
    releaseDate: "2023-08-20",
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: 5,
    title: "Pulp Fiction",
    poster: samplePoster,
    ageRating: 4.8,
    duration: "2h 34m",
    releaseDate: "2023-09-12",
    genres: ["Crime", "Drama"],
  },
  {
    id: 6,
    title: "Forrest Gump",
    poster: samplePoster,
    ageRating: 4.7,
    duration: "2h 22m",
    releaseDate: "2023-10-05",
    genres: ["Drama", "Romance"],
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full">
      <HeroCarousel />

      <section id="movies" className="mb-12 px-4 md:px-12 lg:px-32">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Now Playing</h2>
          <div className="flex flex-wrap gap-2">
            {["All", "Action", "Drama", "Comedy"].map((genre) => (
              <Button key={genre} variant="outline" size="sm">
                {genre}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {films.map((film) => (
            <Card key={film.id} className="overflow-hidden pt-0! pb-2">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "1/1" }}
              >
                <Image
                  src={film.poster}
                  alt={film.title}
                  fill
                  className="absolute inset-0 object-cover transition-transform duration-300 hover:scale-105 !block"
                />
              </div>
              <CardContent>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Badge variant="destructive">{film.ageRating}</Badge>
                  </div>
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
      </section>

      <section className="mb-12 px-4 md:px-12 lg:px-32">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Coming Soon</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {films.slice(0, 4).map((film, index) => (
            <Card
              key={`upcoming-${index}`}
              className="overflow-hidden pt-0! pb-2"
            >
              <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={film.poster}
                  alt={`Upcoming: ${film.title}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute right-3 top-3">
                  <Badge className="bg-red-500 hover:bg-red-600 text-black font-bold px-3 py-2">
                    Coming Soon
                  </Badge>
                </div>
              </div>
              <CardContent className="pb-4">
                <h3 className="mb-1 line-clamp-1 text-lg font-bold">
                  {film.title}
                </h3>
                <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {
                      new Date(
                        new Date(film.releaseDate).getTime() +
                          1000 * 60 * 60 * 24 * 30 * (index + 1)
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
