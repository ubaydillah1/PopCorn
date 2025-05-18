import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/HeroSlides";
import FilmCard from "@/components/FilmCard";

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
            <FilmCard key={film.id} film={film} variant="now-playing" />
          ))}
        </div>
      </section>

      <section className="mb-12 px-4 md:px-12 lg:px-32">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Coming Soon</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {films.slice(0, 4).map((film, index) => (
            <FilmCard
              key={`upcoming-${index}`}
              film={film}
              variant="upcoming"
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
