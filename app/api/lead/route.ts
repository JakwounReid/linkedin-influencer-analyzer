import { NextResponse } from "next/server";
import { Pool } from "pg"; // npm i pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: Request) {
  try {
    const { email, tag = "early-access", utms = {}, path = "", referrer = "" } = await req.json();
    const e = String(email || "").trim().toLowerCase();
    if (!e || !e.includes("@")) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      await client.query(
        `insert into public.leads
          (email, tag, utm_source, utm_medium, utm_campaign, utm_content, utm_term, path, referrer)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         on conflict (email, tag) do nothing`,
        [
          e,
          tag,
          utms.utm_source || null,
          utms.utm_medium || null,
          utms.utm_campaign || null,
          utms.utm_content || null,
          utms.utm_term || null,
          path,
          referrer,
        ]
      );
    } finally {
      client.release();
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "unknown_error" }, { status: 500 });
  }
}
