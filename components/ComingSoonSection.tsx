/* eslint-disable @typescript-eslint/no-explicit-any */
import FilmCard from "@/components/FilmCard";
import { AlertCircle } from "lucide-react";

async function fetchUpcoming() {
  try {
    const res = await fetch("http://localhost:3000/api/user/tickets/upcoming");
    if (!res.ok) throw new Error("Failed to fetch upcoming films");
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.error("Error fetching upcoming:", e);
    return null;
  }
}

export default async function ComingSoonSection() {
  const films = await fetchUpcoming();

  return (
    <section className="mb-12 px-4 md:px-12 lg:px-32">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Coming Soon</h2>
      </div>

      {films?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {films.map((film: any, index: number) => (
            <FilmCard
              key={`upcoming-${film.id}`}
              film={{
                ...film,
                poster: film.poster_path,
                genres:
                  typeof film.genres === "string"
                    ? film.genres.split(",").map((g: string) => g.trim())
                    : [],
              }}
              variant="upcoming"
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 p-10 text-gray-500">
          <AlertCircle size={40} />
          <p className="text-center text-lg">No upcoming films scheduled.</p>
        </div>
      )}
    </section>
  );
}
