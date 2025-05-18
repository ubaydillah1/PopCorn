import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorAnimation({ error }: { error?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <XCircle className="h-16 w-16 text-red-500 animate-pulse" />
      <h2 className="mt-4 text-2xl font-bold text-red-600">
        Something went wrong
      </h2>
      <p className="text-muted-foreground mt-2">
        We&apos;re unable to complete your request. Please try again later.
      </p>

      {error ? (
        <p className="text-muted-foreground mt-4 max-w-md break-words">
          {error}
        </p>
      ) : (
        <Link href="/">
          <Button className="my-4 bg-red-600 hover:bg-red-700">
            Back to Home
          </Button>
        </Link>
      )}
    </div>
  );
}
