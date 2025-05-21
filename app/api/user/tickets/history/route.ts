    /* eslint-disable @typescript-eslint/no-explicit-any */
    import { NextRequest, NextResponse } from "next/server";
    import pool from "@/utils/db";

    export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    try {
        const [rows]: any = await pool.query(
        "SELECT * FROM v_user_tickets_history WHERE user_id = ?",
        [userId]
        );
        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
        { error: error.message || "Internal server error" },
        { status: 500 }
        );
    }
    }
