"use client";

import { useEffect, useState } from "react";

const TotalTicket = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalTickets = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/admin/total-tickets"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch total tickets");
        }

        const data = await res.json();

        const totalTickets = data?.data?.[0]?.total_tickets_sold ?? 0;

        console.log(totalTickets);
        setTotal(totalTickets);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalTickets();
  }, []);

  return (
    <div className="rounded-xl bg-card text-foreground p-6 shadow-md border">
      <h2 className="text-sm text-muted-foreground">Total Tickets</h2>

      {loading ? (
        <p className="text-2xl font-bold animate-pulse text-muted">...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-2xl font-bold">{total?.toLocaleString()}</p>
      )}
    </div>
  );
};

export default TotalTicket;
