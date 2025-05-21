/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  Ticket,
  LoaderCircle,
  Armchair,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";

type TicketType = {
  ticket_id: string;
  film_title: string;
  show_time: string;
  booking_time: string;
  total_price: number;
  seats: string;
};

export default function MyTicketsPage() {
  const [tab, setTab] = useState("future");
  const [loading, setLoading] = useState(true);
  const [futureTickets, setFutureTickets] = useState<TicketType[]>([]);
  const [historyTickets, setHistoryTickets] = useState<TicketType[]>([]);

  console.log(futureTickets);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return;

      setLoading(true);

      const [futureRes, historyRes] = await Promise.all([
        fetch(`/api/user/tickets/future?userId=${user.id}`).then((r) =>
          r.json()
        ),
        fetch(`/api/user/tickets/history?userId=${user.id}`).then((r) =>
          r.json()
        ),
      ]);

      setFutureTickets(futureRes.data || []);
      setHistoryTickets(historyRes.data || []);
      setLoading(false);
    };

    fetchTickets();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatDateOnly = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const renderCards = (tickets: TicketType[]) => (
    <div className="flex flex-wrap justify-center gap-6">
      {tickets.map((ticket) => (
        <Card
          key={ticket.ticket_id}
          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] overflow-hidden rounded-lg border-2 border-primary/10 hover:border-primary/30 transition-all"
        >
          <div className="bg-gradient-to-br from-primary/80 to-primary-foreground/90 text-primary-foreground px-6 py-3">
            <h3 className="text-lg font-bold line-clamp-1 text-white">
              {ticket.film_title}
            </h3>
          </div>
          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-sm">{formatDate(ticket.show_time)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Seats:</span>
              <span className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Armchair className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {ticket.seats || "-"}
                  </span>
                </div>
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Booking ID:</span>
              <span className="text-sm font-mono">{ticket.ticket_id}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEmptyState = (icon: any, title: string, subtitle: string) => (
    <div className="text-center py-12 bg-muted/30 rounded-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <p className="text-muted-foreground font-medium">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );

  const renderLoading = () => (
    <div className="flex justify-center py-16 animate-pulse">
      <LoaderCircle className="h-10 w-10 text-primary animate-spin" />
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
              <TabsTrigger value="future" className="flex-1">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="future" className="space-y-4">
            {loading
              ? renderLoading()
              : futureTickets.length === 0
              ? renderEmptyState(
                  <CalendarDays className="h-12 w-12 text-muted-foreground" />,
                  "No upcoming tickets",
                  "Your future movie bookings will appear here"
                )
              : renderCards(futureTickets)}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {loading ? (
              renderLoading()
            ) : historyTickets.length === 0 ? (
              renderEmptyState(
                <Clock className="h-12 w-12 text-muted-foreground" />,
                "No ticket history yet",
                "Your past movie bookings will appear here"
              )
            ) : (
              <div className="flex flex-wrap justify-center gap-6">
                {historyTickets.map((ticket) => (
                  <Card
                    key={ticket.ticket_id}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-muted/30 border border-border"
                  >
                    <div className="bg-muted px-6 py-2 text-sm text-muted-foreground flex justify-between items-center">
                      <span>Booked on:</span>
                      <span className="font-mono">
                        {formatDateOnly(ticket.booking_time)}
                      </span>
                    </div>
                    <CardContent className="space-y-3 pt-4">
                      <h3 className="text-lg font-bold">{ticket.film_title}</h3>

                      <div className="text-sm text-muted-foreground">
                        Booking ID:{" "}
                        <span className="font-mono">{ticket.ticket_id}</span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Show time: <br />
                        <span className="font-mono">
                          {new Date(ticket.show_time).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Total Paid:{" "}
                        <span className="font-semibold">
                          ${ticket.total_price.toLocaleString("en-US")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
