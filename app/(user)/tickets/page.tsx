"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, Ticket } from "lucide-react";

const dummyTickets = [
  {
    id: "tix1",
    film_title: "Inception",
    show_time: "2025-05-20T18:30",
    total_price: 50000,
    booking_time: "2025-05-18T10:00",
  },
  {
    id: "tix2",
    film_title: "Avengers: Endgame",
    show_time: "2025-05-10T19:00",
    total_price: 75000,
    booking_time: "2025-05-05T14:22",
  },
  {
    id: "tix3",
    film_title: "The Dark Knight",
    show_time: "2025-05-25T20:15",
    total_price: 60000,
    booking_time: "2025-05-15T09:30",
  },
  {
    id: "tix4",
    film_title: "Interstellar",
    show_time: "2025-04-30T17:45",
    total_price: 55000,
    booking_time: "2025-04-20T11:15",
  },
];

const isUpcoming = (date: string) => new Date(date) > new Date();

export default function MyTicketsPage() {
  const [tab, setTab] = useState("upcoming");

  const upcomingTickets = dummyTickets.filter((t) => isUpcoming(t.show_time));
  const historyTickets = dummyTickets.filter((t) => !isUpcoming(t.show_time));

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const renderCards = (tickets: typeof dummyTickets) => (
    <div className="flex flex-wrap justify-center gap-6">
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] overflow-hidden rounded-lg border-2 border-primary/10 hover:border-primary/30 transition-all"
        >
          <div className="bg-gradient-to-br from-primary/80 to-primary-foreground/90 text-primary-foreground p-3">
            <h3 className="text-lg font-bold line-clamp-1 text-white">
              {ticket.film_title}
            </h3>
          </div>
          <CardContent className="space-y-3 pt-4 ">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-sm">{formatDate(ticket.show_time)}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Booked on: {formatDate(ticket.booking_time)}
            </div>
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Booking ID:</span>
              <span className="text-sm font-mono">{ticket.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price:</span>
              <span className="font-semibold">
                Rp {ticket.total_price.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-5xl px-4 md:px-8 pb-12 space-y-8 my-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Ticket className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">My Tickets</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your upcoming and past movie tickets
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="upcoming" className="flex-1">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-4">
              Upcoming Shows
            </h2>
            {upcomingTickets.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <div className="flex justify-center mb-4">
                  <CalendarDays className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  No upcoming tickets
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your future movie bookings will appear here
                </p>
              </div>
            ) : (
              renderCards(upcomingTickets)
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-4">
              Past Shows
            </h2>
            {historyTickets.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  No ticket history yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your past movie experiences will be recorded here
                </p>
              </div>
            ) : (
              renderCards(historyTickets)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
