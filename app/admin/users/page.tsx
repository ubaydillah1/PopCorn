"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Simulasi view v_user_booking_summary
const dummyUsers = [
  {
    id: "user1",
    name: "John Doe",
    total_tickets: 8,
    total_spent: 160000,
  },
  {
    id: "user2",
    name: "Jane Smith",
    total_tickets: 5,
    total_spent: 100000,
  },
];

type User = {
  id: string;
  name: string;
  total_tickets: number;
  total_spent: number;
};

export default function AdminUsersPage() {
  const [users] = useState<User[]>(dummyUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDetail = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          User Booking Summary
        </h1>
      </div>

      <div className="rounded-xl border bg-card text-foreground shadow-md">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr className="text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Total Tickets</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.total_tickets}</td>
                <td className="p-4">Rp {user.total_spent.toLocaleString()}</td>
                <td className="p-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDetail(user)}
                  >
                    View Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input disabled value={selectedUser.name} />
              </div>
              <div>
                <Label>Total Tickets</Label>
                <Input disabled value={selectedUser.total_tickets} />
              </div>
              <div>
                <Label>Total Spent</Label>
                <Input
                  disabled
                  value={`Rp ${selectedUser.total_spent.toLocaleString()}`}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
