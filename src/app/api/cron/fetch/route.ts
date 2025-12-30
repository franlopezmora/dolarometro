import { NextResponse } from "next/server";
import { fetchAllQuotes } from "../../../../lib/fetchSources";
import { setCache } from "../../../../lib/cache";
import { saveHistoryPoints } from "../../../../lib/db";
\
export async function GET() {
  const quotes = await fetchAllQuotes();
  const payload = {
    base: "ARS",
    updatedAt: new Date().toISOString(),
    refreshHintMinutes: 5,
    quotes,
    source: "cron",
  };
  // update cache
  await setCache("quotes", payload, 300);
\
  // save history points (date = today)
  const today = new Date().toISOString().slice(0, 10);
  const points = quotes.map((q) => ({
    symbol: q.tag,
    date: today,
    value: q.sell ?? q.buy,
  }));
  await saveHistoryPoints(points);
\
  return NextResponse.json({ ok: true, saved: points.length });
}
\

