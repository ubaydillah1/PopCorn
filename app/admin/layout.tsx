"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Films", href: "/admin/films" },
  { name: "Schedules", href: "/admin/schedules" },
  { name: "Users", href: "/admin/users" },
  { name: "Reports", href: "/admin/reports" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch(`/api/user?id=${user.id}`);
        const result = await res.json();

        if (result.role !== "ADMIN") {
          router.replace("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user role:", error);
        router.replace("/");
      }
    };

    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await authService.signOut();
    router.replace("/");
  };

  if (isLoading) return <div className="p-10">Checking access...</div>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-background p-4 hidden md:block">
        <div className="mb-6 text-2xl font-bold">🎬 Admin Panel</div>
        <nav className="space-y-2">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Button
          variant="destructive"
          className="w-full my-2 hover:bg-red-900"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </aside>

      <main className="flex-1 p-6 md:p-10 bg-muted/50">{children}</main>
    </div>
  );
}
