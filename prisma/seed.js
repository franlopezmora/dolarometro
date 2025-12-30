const { PrismaClient } = require("@prisma/client");

if (process.env.RUN_SEED !== "1") {
  console.log("Seed disabled. Set RUN_SEED=1 to run the seed.");
  process.exit(0);
}

async function main() {
  const prisma = new PrismaClient();
  const today = new Date();
  const dates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    today,
  ];

  const symbols = ["OFICIAL", "BLUE", "MEP"];

  const data = [];
  for (const s of symbols) {
    for (const d of dates) {
      data.push({
        symbol: s,
        date: d,
        value: Math.round((1300 + Math.random() * 300) * 100) / 100,
      });
    }
  }

  console.log("Seeding history:", data.length, "rows");
  await prisma.history.createMany({ data, skipDuplicates: true });
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


