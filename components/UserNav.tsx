"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { authService } from "@/services/authService";
import { UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function UserNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // 👈 new

  useEffect(() => {
    const getAndSetUserInfo = async (userId: string) => {
      try {
        const res = await fetch(`/api/user?id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const result = await res.json();
        setUserName(result.name || "User");
        setUserRole(result.role || null); // 👈 get role
      } catch (err) {
        console.error("Fetch user info error:", err);
        setUserName("User");
        setUserRole(null);
      }
    };

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      setIsLoggedIn(!!user);

      if (user) {
        getAndSetUserInfo(user.id);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setIsLoggedIn(!!user);

      if (user) {
        getAndSetUserInfo(user.id);
      } else {
        setUserName(null);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await authService.signOut();
    setIsLoggedIn(false);
    setUserName(null);
    setUserRole(null);
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
              {userName ? userName : "Loading..."}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-red-500 text-white border-none p-0 shadow-md"
        >
          <DropdownMenuItem
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white focus:bg-red-600 focus:text-white px-4 py-2 cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
