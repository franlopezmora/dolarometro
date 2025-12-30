import { NextRequest, NextResponse } from "next/server";
import { fetchAllQuotes } from "../../../lib/fetchSources";
import { getCache, setCache } from "../../../lib/cache";
import { rateLimit } from "../../../lib/rateLimit";

export async function GET() {
  // rate-limit by IP/header
  // Note: in Next.js Edge the IP may be in x-forwarded-for
  const fakeReq = { headers: new Headers() } as NextRequest;
  // attempt to derive identifier from headers if available (server runtime passes nothing)
  const identifier = "global";
  const rl = await rateLimit(identifier);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // try cache first (5 minutes)
  const cached = await getCache<any>("quotes");
  if (cached) {
    return NextResponse.json({ ...cached, source: "cache" });
  }

  const quotes = await fetchAllQuotes();
  const payload = {
    base: "ARS",
    updatedAt: new Date().toISOString(),
    refreshHintMinutes: 5,
    quotes,
    source: "live",
  };
  // cache for 5 minutes
  await setCache("quotes", payload, 300);
  return NextResponse.json(payload);
}




