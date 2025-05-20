"use client";

import { useEffect, useState } from "react";
import { UserX } from "lucide-react";

type User = {
  user_id: string;
  user_name: string;
  total_tickets: number;
  total_spent: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/users");
        const json = await res.json();
        setUsers(json.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          User Booking Summary
        </h1>
      </div>

      <div className="rounded-xl border bg-card text-foreground shadow-md min-h-[100px]">
        {isLoading ? (
          <div className="p-10 text-center text-muted-foreground">
            Loading...
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-10 text-center text-muted-foreground">
            <UserX className="w-12 h-12 opacity-40" />
            <h3 className="text-lg font-semibold">No user data found</h3>
            <p className="text-sm text-muted-foreground">
              Once users book tickets, they’ll show up here.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr className="text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Total Tickets</th>
                <th className="p-4">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="border-b">
                  <td className="p-4">{user.user_name}</td>
                  <td className="p-4">{user.total_tickets}</td>
                  <td className="p-4">
                    $ {(user.total_spent ?? 0).toLocaleString()}
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
