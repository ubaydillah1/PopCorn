"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Hero } from "@/components/ui/hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const dummyFilms = [
  {
    id: "1",
    title: "Avengers: Endgame",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
    rating: "13+",
    duration: "3h 2m",
    releaseDate: "2023-05-15",
    synopsis:
      "After the devastating events of Infinity War, the universe is in ruins. The Avengers assemble once more in order to reverse Thanos' actions and restore balance.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    author: { id: 1, name: "Anthony Russo" },
    studio: { id: 1, name: "Marvel Studios" },
    price: 10,
    schedules: [
      {
        id: "s1",
        room: "Studio 1",
        showTime: "2025-05-20T13:00:00",
      },
      {
        id: "s2",
        room: "Studio 2",
        showTime: "2025-05-20T13:00:00",
      },
      {
        id: "s3",
        room: "Studio 1",
        showTime: "2025-05-20T17:00:00",
      },
    ],
  },
];

const rows = ["A", "B", "C", "D"];
const cols = [1, 2, 3, 4, 5];
const allSeats = rows.flatMap((row) => cols.map((col) => `${row}${col}`));

export default function BookingPage() {
  const { id } = useParams();
  const film = dummyFilms.find((f) => f.id === id);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");

  if (!film) return <div className="p-10 text-center">Film not found.</div>;

  const selectedSchedule = film.schedules.find(
    (s) => s.id === selectedScheduleId
  );

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.length * film.price;

  return (
    <div className="pb-20">
      <Hero
        title={film.title}
        backdropPath={film.poster}
        posterPath={film.poster}
        rating={film.rating}
        duration={film.duration}
        releaseDate={film.releaseDate}
        genres={film.genres}
        author={film.author}
        studio={film.studio}
        synopsis={film.synopsis}
        showBookButton={false}
      />

      <div className="px-4 md:px-12 lg:px-32 py-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Choose Showtime
        </h2>

        <div className="flex gap-3 flex-wrap mb-6 justify-center">
          {film.schedules.map((schedule) => (
            <Button
              key={schedule.id}
              variant={
                selectedScheduleId === schedule.id ? "default" : "outline"
              }
              onClick={() => {
                setSelectedScheduleId(schedule.id);
                setSelectedSeats([]); // reset seats on showtime change
              }}
            >
              {new Date(schedule.showTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              ({schedule.room})
            </Button>
          ))}
        </div>

        {selectedSchedule && (
          <>
            <h3 className="text-lg font-semibold mb-3 text-center">
              Choose Your Seats
            </h3>
            <div className="grid grid-cols-5 gap-4 max-w-md mx-auto mb-6">
              {allSeats.map((seat) => {
                const isSelected = selectedSeats.includes(seat);
                return (
                  <Card
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    className={`flex items-center justify-center h-12 rounded-md cursor-pointer border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-100"
                        : "hover:border-gray-400"
                    }`}
                  >
                    {seat}
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {selectedSchedule && (
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              Selected Seats:{" "}
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </p>
            <p className="text-muted-foreground mb-2">
              Showtime:{" "}
              {new Date(selectedSchedule.showTime).toLocaleString("en-US", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              })}
            </p>
            <p className="text-muted-foreground mb-4">
              Studio: {selectedSchedule.room}
            </p>
            <Button disabled={selectedSeats.length === 0}>
              Confirm Booking (${totalPrice})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
