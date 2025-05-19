"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const rows = ["A", "B", "C", "D"];
const cols = [1, 2, 3, 4, 5];
const allSeats = rows.flatMap((row) => cols.map((col) => `${row}${col}`));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingDialog({ film }: { film: any }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>(film.showtimes?.[0] || "");
  const totalPrice = selectedSeats.length * (film.price || 10);

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <DialogContent>
      <DialogTitle>Book Tickets for {film.title}</DialogTitle>
      <DialogDescription>Choose your showtime and seats.</DialogDescription>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Choose Showtime</h3>
        <div className="flex gap-3 flex-wrap mb-4">
          {film.showtimes?.map((time: string) => (
            <Button
              key={time}
              variant={selectedShowtime === time ? "default" : "outline"}
              onClick={() => setSelectedShowtime(time)}
            >
              {new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </Button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Choose Your Seats</h3>
        <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-4">
          {allSeats.map((seat) => {
            const isSelected = selectedSeats.includes(seat);
            return (
              <Card
                key={seat}
                onClick={() => toggleSeat(seat)}
                className={`flex items-center justify-center h-10 rounded-md cursor-pointer border-2 transition-all ${
                  isSelected ? "border-blue-500 bg-blue-100" : "hover:border-gray-400"
                }`}
              >
                {seat}
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </p>
          <p className="text-muted-foreground mb-4">
            Showtime:{" "}
            {new Date(selectedShowtime).toLocaleString("en-US", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "short",
            })}
          </p>
          <Button disabled={selectedSeats.length === 0}>
            Confirm Booking ($ {totalPrice.toFixed(2)})
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
