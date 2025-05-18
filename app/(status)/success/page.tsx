"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessAnimation() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
      <h2 className="mt-4 text-2xl font-bold text-green-600">Success!</h2>
      <p className="text-muted-foreground mt-2">
        Your operation was completed successfully.
      </p>
    </div>
  );
}
