const samplePoster =
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop";

export const films = [
  {
    id: 1,
    title: "Avengers: Endgame",
    poster: samplePoster,
    rating: "SU",
    duration: "3h 2m",
    releaseDate: "2023-05-15",
    genres: ["Action", "Adventure", "Sci-Fi"],
    author: { id: 1, name: "Christopher Markus" },
    studio: { id: 1, name: "Marvel Studios" },
    synopsis:
      "The remaining Avengers must assemble once more in a final stand to undo the catastrophic events caused by Thanos and restore balance to the universe.",
    price: 10, // in dollars
    showtimes: [
      "2025-05-20T13:00:00",
      "2025-05-20T17:00:00",
      "2025-05-20T20:30:00",
    ],
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster: samplePoster,
    rating: 4.9,
    duration: "2h 22m",
    releaseDate: "2023-06-10",
    genres: ["Drama"],
    author: { id: 2, name: "Frank Darabont" },
    studio: { id: 2, name: "Castle Rock" },
    synopsis:
      "A man wrongly imprisoned for murder finds hope, friendship, and a new purpose in the walls of Shawshank prison over the span of decades.",
    price: 10, // in dollars
    showtimes: [
      "2025-05-20T13:00:00",
      "2025-05-20T17:00:00",
      "2025-05-20T20:30:00",
    ],
  },
  {
    id: 3,
    title: "Inception",
    poster: samplePoster,
    rating: 4.7,
    duration: "2h 28m",
    releaseDate: "2023-07-05",
    genres: ["Action", "Sci-Fi", "Thriller"],
    author: { id: 3, name: "Christopher Nolan" },
    studio: { id: 3, name: "Warner Bros." },
    synopsis:
      "A skilled thief is offered a chance to have his criminal record erased if he can successfully plant an idea into a target’s subconscious.",
    price: 10, // in dollars
    showtimes: [
      "2025-05-20T13:00:00",
      "2025-05-20T17:00:00",
      "2025-05-20T20:30:00",
    ],
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster: samplePoster,
    rating: 4.9,
    duration: "2h 32m",
    releaseDate: "2023-08-20",
    genres: ["Action", "Crime", "Drama"],
    author: { id: 4, name: "Jonathan Nolan" },
    studio: { id: 3, name: "Warner Bros." },
    synopsis:
      "Batman faces his greatest psychological and physical test yet as he confronts the chaotic and calculating criminal mastermind known as the Joker.",
    price: 10, // in dollars
    showtimes: [
      "2025-05-20T13:00:00",
      "2025-05-20T17:00:00",
      "2025-05-20T20:30:00",
    ],
  },
  {
    id: 5,
    title: "Pulp Fiction",
    poster: samplePoster,
    rating: 4.8,
    duration: "2h 34m",
    releaseDate: "2023-09-12",
    genres: ["Crime", "Drama"],
    author: { id: 5, name: "Quentin Tarantino" },
    studio: { id: 4, name: "Miramax Films" },
    synopsis:
      "A series of interwoven stories involving hitmen, gangsters, and ordinary people unfolds in a wildly nonlinear fashion full of dark humor and unexpected twists.",
    price: 10, // in dollars
    showtimes: [
      "2025-05-20T13:00:00",
      "2025-05-20T17:00:00",
      "2025-05-20T20:30:00",
    ],
  },
  {
    id: 6,
    title: "Forrest Gump",
    poster: samplePoster,
    rating: 4.7,
    duration: "2h 22m",
    releaseDate: "2023-10-05",
    genres: ["Drama", "Romance"],
    author: { id: 6, name: "Eric Roth" },
    studio: { id: 5, name: "Paramount Pictures" },
    synopsis:
      "Forrest Gump, a man with a kind heart and a low IQ, unwittingly influences major historical events while simply trying to find his way in life and win back his childhood love.",
    price: 10, // in dollars
    showtimes: [
      "2025-05-20T13:00:00",
      "2025-05-20T17:00:00",
      "2025-05-20T20:30:00",
    ],
  },
];
