"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Simulasi data dari procedure monthlyReport
const dummyReport = [
  {
    film_title: "Inception",
    tickets_sold: 12,
    total_income: 600000,
  },
  {
    film_title: "Avengers",
    tickets_sold: 8,
    total_income: 400000,
  },
];

export default function AdminReportsPage() {
  const [report, setReport] = useState(dummyReport);
  const [month, setMonth] = useState(5);

  const handleGenerate = () => {
    // dummy: no real filtering
    setReport(dummyReport);
  };

  const handleCancelOldTickets = () => {
    // Simulasi pemanggilan procedure cancelOldTickets
    alert("Procedure cancelOldTickets dijalankan.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Monthly Report</h1>
        <Button variant="destructive" onClick={handleCancelOldTickets}>
          Cancel Old Tickets
        </Button>
      </div>

      <div className="flex flex-col gap-4 max-w-[150px]">
        <div className="flex gap-4">
          <Label>Bulan</Label>
          <Input
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          />
        </div>
        <Button onClick={handleGenerate}>Generate Report</Button>
      </div>

      <div className="rounded-xl border bg-card text-foreground shadow-md mt-4">
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
                <td className="p-4">Rp {r.total_income.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
