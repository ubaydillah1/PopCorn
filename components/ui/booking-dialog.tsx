/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const rows = ["A", "B", "C", "D", "E"];
const cols = [1, 2, 3, 4, 5];
const allSeats = rows.flatMap((row) => cols.map((col) => `${row}${col}`));

const seatLabelToId: Record<string, number> = Object.fromEntries(
  rows.flatMap((row, rIdx) =>
    cols.map((col) => [`${row}${col}`, rIdx * 5 + col])
  )
);

type Showtime = {
  schedule_id: number;
  time: string;
  room_name: string;
};

type FilmProps = {
  film_id: number;
  title: string;
  poster_path: string;
  age_rating: string;
  duration: string;
  release_date: string;
  synopsis: string;
  author_name: string;
  studio_name: string;
  genres: string;
  showtimes: Showtime[];
  price?: number;
};

export default function BookingDialog({ film }: { film: FilmProps }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    film.showtimes?.[0]?.schedule_id ?? null
  );
  const [usedSeats, setUsedSeats] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const totalPrice = selectedSeats.length * (film.price || 10);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) setUserId(user.id);
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedScheduleId) return;

    fetch(`/api/user/used-seats?scheduleId=${selectedScheduleId}`)
      .then((res) => res.json())
      .then((data) => {
        setUsedSeats(data.map((d: any) => d.seat_id));
      });
  }, [selectedScheduleId]);

  const toggleSeat = (seat: string) => {
    const seatId = seatLabelToId[seat];
    if (usedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    if (!userId || !selectedScheduleId || selectedSeats.length === 0) return;

    const seatIds = selectedSeats.map((s) => seatLabelToId[s]);

    const res = await fetch("/api/user/book-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        scheduleId: selectedScheduleId,
        seatIds,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Booking successful!");
      setSelectedSeats([]);

      const updated = await fetch(
        `/api/user/used-seats?scheduleId=${selectedScheduleId}`
      ).then((r) => r.json());
      setUsedSeats(updated.map((u: any) => u.seat_id));
      router.push("/tickets");
    } else {
      alert(result.message || "Booking failed");
    }
  };

  return (
    <DialogContent className="max-h-[80vh] overflow-y-auto">
      <DialogTitle>Book Tickets for {film.title}</DialogTitle>
      <DialogDescription>Choose your showtime and seats.</DialogDescription>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Choose Showtime</h3>
        <div className="grid grid-cols-1 gap-1 mb-4 max-h-32 pr-2">
          {film.showtimes
            ?.filter((s) => new Date(s.time) >= new Date())
            .map((s) => (
              <div key={s.schedule_id}>
                <Button
                  variant={
                    selectedScheduleId === s.schedule_id ? "default" : "outline"
                  }
                  onClick={() => {
                    setSelectedScheduleId(s.schedule_id);
                    setSelectedSeats([]);
                  }}
                  className="w-full"
                >
                  {new Date(s.time).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  ({s.room_name})
                </Button>
              </div>
            ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Choose Your Seats</h3>
        <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-4">
          {allSeats.map((seat) => {
            const seatId = seatLabelToId[seat];
            const isUsed = usedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seat);

            return (
              <Card
                key={seat}
                onClick={() => toggleSeat(seat)}
                className={`flex items-center justify-center h-10 rounded-md cursor-pointer border-2 transition-all 
                  ${
                    isUsed
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : isSelected
                      ? "border-blue-500 bg-blue-100"
                      : "hover:border-gray-400"
                  }`}
              >
                {seat}
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            Selected Seats:{" "}
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </p>
          <p className="text-muted-foreground mb-4">
            Total: & {totalPrice.toLocaleString("en-US")}
          </p>
          <Button
            onClick={handleBooking}
            disabled={!userId || selectedSeats.length === 0}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
