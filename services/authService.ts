import { supabase } from "@/utils/supabase/client";

export const authService = {
  async signUp(email: string, password: string, name: string) {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Registration failed.");
    }

    return result;
  },

  async signIn(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Login failed");

    return result.user;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  async resendConfirmationEmail(email: string) {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    if (error) throw new Error(error.message);
  },
};
