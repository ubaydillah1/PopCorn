"use client";

import Link from "next/link";
import UserNav from "@/components/UserNav";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // opsional, atau pakai ternary biasa

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-12 lg:px-32">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">PopCorn</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/"
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" && "text-primary"
                )}
              >
                Home
              </Link>
              <Link
                href="/tickets"
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/tickets" && "text-primary"
                )}
              >
                My Tickets
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground w-full">
            &copy; 2025 PopCorn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
