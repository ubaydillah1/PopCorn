"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Film } from "@/types/film";
import Image from "next/image";
import { Film as FilmLocal, Loader2 } from "lucide-react";

type Props = {
  onEdit: (film: Film) => void;
  refresh?: boolean;
  onRefreshed?: () => void;
};

export default function FilmTable({ onEdit, refresh, onRefreshed }: Props) {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFilms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/films");
      const data = await res.json();
      setFilms(data.data || []);
    } catch (err) {
      console.error("Failed to fetch films", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refresh) {
      fetchFilms().then(() => {
        onRefreshed?.();
      });
    } else {
      fetchFilms();
    }
  }, [onRefreshed, refresh]);

  const handleDelete = async (id: number) => {
    await fetch(`/api/admin/films/${id}`, { method: "DELETE" });
    fetchFilms();
  };

  return (
    <div className="rounded-xl border bg-card text-foreground shadow-md min-h-[100px]">
      {isLoading ? (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
        </div>
      ) : films.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 p-10 text-center text-muted-foreground">
          <FilmLocal className="w-12 h-12 opacity-40" />
          <h3 className="text-lg font-semibold">No films found</h3>
          <p className="text-sm text-muted-foreground">
            Start by adding a new film to your collection.
          </p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4">Poster</th>
              <th className="p-4">Title</th>
              <th className="p-4">Age Rating</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Release Date</th>
              <th className="p-4">Genres</th>
              <th className="p-4">Author</th>
              <th className="p-4">Studio</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr key={film.id} className="border-b">
                <td className="p-4">
                  <Image
                    src={film.posterPath}
                    alt={film.title}
                    width={80}
                    height={120}
                    className="h-20 rounded-md object-cover"
                  />
                </td>
                <td className="p-4">{film.title}</td>
                <td className="p-4">{film.ageRating}</td>
                <td className="p-4">{film.duration}</td>
                <td className="p-4">
                  {new Date(film.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">{film.genre.join(", ")}</td>
                <td className="p-4">{film.author}</td>
                <td className="p-4">{film.studio}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(film)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(film.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
