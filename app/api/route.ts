import pool from "@/utils/db";

export async function GET() {
  const [rows] = await pool.execute("SELECT * FROM `users`");

  return Response.json(rows, {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
