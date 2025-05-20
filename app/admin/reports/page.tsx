/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart2 } from "lucide-react";

type Report = {
  film_title: string;
  tickets_sold: number;
  total_income: number;
};

export default function AdminReportsPage() {
  const [report, setReport] = useState<Report[]>([]);
  const [month, setMonth] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/monthly-report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ month }),
        }
      );

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to fetch report");

      setReport(json.data || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setReport([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOldTickets = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/cancel-old-tickets",
        {
          method: "POST",
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to cancel");

      alert("Old tickets successfully cancelled.");
    } catch (err: any) {
      alert("❌ Failed: " + err.message);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Monthly Report</h1>
        <Button variant="destructive" onClick={handleCancelOldTickets}>
          Cancel Old Tickets
        </Button>
      </div>

      <div className="flex flex-col gap-4 max-w-[200px]">
        <div className="flex items-center gap-2">
          <Label htmlFor="month">Month:</Label>
          <Input
            id="month"
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          />
        </div>
        <Button onClick={handleGenerate}>Generate Report</Button>
      </div>

      <div className="rounded-xl border bg-card text-foreground shadow-md mt-4 min-h-[100px]">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">
            Loading...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500">{error}</div>
        ) : report.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-10 text-center text-muted-foreground">
            <BarChart2 className="w-12 h-12 opacity-40" />
            <h3 className="text-lg font-semibold">No report available</h3>
            <p className="text-sm text-muted-foreground">
              Try generating a report for another month.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr className="text-left">
                <th className="p-4">Film</th>
                <th className="p-4">Tickets Sold</th>
                <th className="p-4">Total Income</th>
              </tr>
            </thead>
            <tbody>
              {report.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="p-4">{r.film_title}</td>
                  <td className="p-4">{r.tickets_sold}</td>
                  <td className="p-4">
                    Rp {r.total_income?.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
