/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";

export default function EmailConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResend = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      await authService.resendConfirmationEmail(email);
      alert("Confirmation email resent successfully.");
    } catch (error) {
      alert((error as Error).message || "Failed to resend email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Check your inbox</h1>
        <p className="text-muted-foreground">
          We've sent a confirmation link to <strong>{email}</strong>. Please
          confirm your email address to continue.
        </p>

        {email && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn’t receive the email?
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isLoading}
            >
              {isLoading ? "Resending..." : "Resend Email"}
            </Button>
          </div>
        )}

        <Link href="/login">
          <Button variant="link" className="w-full text-sm">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
