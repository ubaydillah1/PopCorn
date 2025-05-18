import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import pool from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/success",
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const user = data.user;

    if (!user) {
      return NextResponse.json(
        { error: "Sign-up succeeded, but email is not confirmed yet." },
        { status: 400 }
      );
    }

    await pool.execute(
      "INSERT INTO users (id, email, name, role) VALUES (?, ?, ?, ?)",
      [user.id, user.email, name, "USER"]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Sign-up succeeded, but failed to save user to the database. Reason: " +
          (error as Error).message,
      },
      { status: 500 }
    );
  }
}
