"use client";

import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/services/authService";

interface UserNavProps {
  isLoggedIn: boolean;
  userName: string | null;
  userRole: string | null;
  onLogout: () => void;
}

export default function UserNav({
  isLoggedIn,
  userName,
  userRole,
  onLogout,
}: UserNavProps) {
  const handleLogout = async () => {
    await authService.signOut();
    onLogout();
  };

  if (!isLoggedIn) {
    return (
      <div className="flex gap-4">
        <Button asChild variant="default" size="sm">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link href="/register">Get Free Ticket</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {userRole === "ADMIN" && (
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/dashboard">Admin Dashboard</Link>
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-3 py-1 text-sm"
          >
            <UserCircle2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              {userName ?? "Loading..."}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-red-500 text-white border-none p-0 shadow-md"
        >
          <DropdownMenuItem
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
