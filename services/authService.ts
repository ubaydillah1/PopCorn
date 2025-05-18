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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Login failed");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: data.user.id }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Failed to get user role");

    return {
      id: data.user.id,
      email: data.user.email,
      role: result.role,
    };
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
