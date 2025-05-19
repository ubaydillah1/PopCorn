"use client";

import { useEffect, useState } from "react";

const MostBookedFilm = () => {
  const [film, setFilm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostBookedFilm = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/admin/most-booked/film"
        );

        if (!res.ok) throw new Error("Failed to fetch most booked film");

        const data = await res.json();
        setFilm(data.most_booked_film ?? "No bookings yet");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMostBookedFilm();
  }, []);

  return (
    <div className="rounded-xl bg-card text-foreground p-6 shadow-md border">
      <h2 className="text-sm text-muted-foreground">Most Booked Film</h2>
      {loading ? (
        <p className="text-xl font-semibold animate-pulse text-muted">...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-xl font-semibold">{film}</p>
      )}
    </div>
  );
};

export default MostBookedFilm;
