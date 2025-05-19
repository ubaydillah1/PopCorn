export type Film = {
  id: number;
  title: string;
  ageRating: string;
  duration: string;
  releaseDate: string;
  genre: string[];
  synopsis: string;
  author: string;
  studio: string;
  posterPath: string;
};

export type Metadata = {
  authors: { id: number; name: string }[];
  studios: { id: number; name: string }[];
  genres: { id: number; name: string }[];
};
