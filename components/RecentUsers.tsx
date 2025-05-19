"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  total_tickets: number;
}

const RecentUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/recent-users");
        if (!res.ok) throw new Error("Failed to fetch recent users");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recent Users
      </h2>
      <div className="rounded-xl border bg-card text-foreground shadow-md">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-muted-foreground">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Total Tickets</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan={3}>
                  <span className="text-muted animate-pulse">Loading...</span>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="p-4 text-red-500" colSpan={3}>
                  {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td className="p-4 text-muted-foreground" colSpan={3}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/40">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.total_tickets}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
