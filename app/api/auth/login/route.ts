/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import pool from "@/utils/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message || "Invalid credentials" },
      { status: 401 }
    );
  }

  const userId = data.user.id;

  const [rows]: any = await pool.execute(
    "SELECT role FROM users WHERE id = ?",
    [userId]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "User not found in DB" },
      { status: 404 }
    );
  }

  const role = rows[0].role;

  return NextResponse.json({
    user: {
      id: userId,
      email: data.user.email,
      role,
    },
  });
}
