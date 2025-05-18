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
    return data;
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
