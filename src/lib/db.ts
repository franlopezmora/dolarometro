import prisma from "./prisma";

type Point = { symbol: string; date: string; value: number };

export async function saveHistoryPoints(points: Point[]) {
  if (!process.env.DATABASE_URL) return;

  const data = points.map((p) => ({
    symbol: p.symbol,
    date: new Date(p.date),
    value: p.value,
  }));

  try {
    // createMany with skipDuplicates relies on the @@unique([symbol, date]) constraint
    await prisma.history.createMany({ data, skipDuplicates: true });
  } catch (e) {
    // ignore DB errors for now
    console.error("saveHistoryPoints error", e);
  }
}


