"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 bg-muted/50">{children}</main>
    </div>
  );
}
