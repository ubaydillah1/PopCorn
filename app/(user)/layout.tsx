"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { supabase } from "@/utils/supabase/client";
import UserNav from "@/components/UserNav";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getAndSetUserInfo = async (userId: string) => {
      try {
        const res = await fetch(`/api/user?id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const result = await res.json();
        setUserName(result.name || "User");
        setUserRole(result.role || null);

        if (result.role === "ADMIN") {
          router.push("/admin/dashboard");
        }
      } catch (err) {
        console.error("Fetch user info error:", err);
      }
    };

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      setIsLoggedIn(!!user);
      if (user) getAndSetUserInfo(user.id);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setIsLoggedIn(!!user);
      if (user) getAndSetUserInfo(user.id);
      else {
        setUserName(null);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4 md:px-12 lg:px-32">
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
              {isLoggedIn && (
                <Link
                  href="/tickets"
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/tickets" && "text-primary"
                  )}
                >
                  My Tickets
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <UserNav
              isLoggedIn={isLoggedIn}
              userName={userName}
              userRole={userRole}
              onLogout={() => {
                setIsLoggedIn(false);
                setUserName(null);
                setUserRole(null);
              }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; 2025 PopCorn. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
