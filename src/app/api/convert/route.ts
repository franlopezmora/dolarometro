import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rateLimit";

const rates = {
  ARS: 1,
  USD_BLUE: 1505,
  USD_OFICIAL: 1475,
  EUR: 1650,
  BRL: 305,
};

function parseParams(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from")?.toUpperCase() ?? "ARS";
  const to = searchParams.get("to")?.toUpperCase() ?? "USD_BLUE";
  const amount = Number(searchParams.get("amount") ?? "0");
  return { from, to, amount };
}

export async function GET(req: NextRequest) {
  const identifier =
    req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.ip ?? "global";
  const rl = await rateLimit(identifier);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { from, to, amount } = parseParams(req);

  const fromRate = rates[from as keyof typeof rates];
  const toRate = rates[to as keyof typeof rates];

  if (!fromRate || !toRate || Number.isNaN(amount)) {
    return NextResponse.json(
      { error: "Parámetros inválidos. Usa from, to, amount." },
      { status: 400 },
    );
  }

  const ars = amount * fromRate;
  const converted = ars / toRate;

  return NextResponse.json({
    from,
    to,
    amount,
    converted,
    base: "ARS",
    usedRates: { fromRate, toRate },
    updatedAt: new Date().toISOString(),
    source: "mock",
  });
}




