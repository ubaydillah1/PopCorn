/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmailConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Check your inbox</h1>
        <p className="text-muted-foreground">
          we've sent a confirmation link to your email. Please confirm your
          email address to continue.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn’t receive the email?
          </p>
          <Button variant="outline" className="w-full">
            Resend Email
          </Button>
        </div>
        <Link href="/">
          <Button variant="link" className="w-full text-sm">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
