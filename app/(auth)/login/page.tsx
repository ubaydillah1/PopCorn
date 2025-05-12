import { AuthForm } from "@/components/authForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-zinc-900 to-black">
      <AuthForm type="login" />
    </div>
  );
}
