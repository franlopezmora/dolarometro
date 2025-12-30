import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../../../lib/rateLimit";

type Point = { t: string; v: number };

const historyMock: Record<string, Point[]> = {
  OFICIAL: [
    { t: "2025-12-20", v: 1410 },
    { t: "2025-12-21", v: 1420 },
    { t: "2025-12-22", v: 1430 },
    { t: "2025-12-23", v: 1440 },
    { t: "2025-12-24", v: 1475 },
  ],
  BLUE: [
    { t: "2025-12-20", v: 1480 },
    { t: "2025-12-21", v: 1490 },
    { t: "2025-12-22", v: 1495 },
    { t: "2025-12-23", v: 1500 },
    { t: "2025-12-24", v: 1505 },
  ],
  MEP: [
    { t: "2025-12-20", v: 1488 },
    { t: "2025-12-21", v: 1492 },
    { t: "2025-12-22", v: 1485 },
    { t: "2025-12-23", v: 1480 },
    { t: "2025-12-24", v: 1481.01 },
  ],
};

export async function GET(
  _req: NextRequest,
  context: { params: { symbol: string } | Promise<{ symbol: string }> },
) {
  const params = await context.params;
  const symbol = params?.symbol?.toUpperCase() ?? "OFICIAL";
  const identifier = _req.headers.get("x-forwarded-for")?.split(",")[0] ?? "global";
  const rl = await rateLimit(identifier);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  const points = historyMock[symbol] ?? historyMock.OFICIAL;

  return NextResponse.json({
    symbol,
    currency: "ARS",
    points,
    source: "mock",
    updatedAt: new Date().toISOString(),
  });
}




