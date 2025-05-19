"use client";

import { useEffect, useState } from "react";

const TotalRevenue = () => {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/admin/total-revenue"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch total revenue");
        }

        const data = await res.json();
        setRevenue(data.total_revenue ?? 0);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="rounded-xl bg-card text-foreground p-6 shadow-md border">
      <h2 className="text-sm text-muted-foreground">Total Revenue</h2>

      {loading ? (
        <p className="text-2xl font-bold animate-pulse text-muted">...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-2xl font-bold">$ {revenue?.toLocaleString()}</p>
      )}
    </div>
  );
};

export default TotalRevenue;
