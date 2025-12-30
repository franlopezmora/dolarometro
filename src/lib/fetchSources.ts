type Quote = {
  name: string;
  tag: string;
  buy: number;
  sell: number;
  variation: number;
  updated: string;
};

function parseNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;
  // remove $ and commas and dots used as thousands separator
  const cleaned = value.replace(/\$/g, "").replace(/\./g, "").replace(/,/g, ".");
  return Number(cleaned);
}

export async function fetchFromDolarsi(): Promise<Quote[]> {
  try {
    const res = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
    const json = await res.json();
    if (!Array.isArray(json)) return [];

    const map = json.map((item: any) => {
      const casa = item.casa ?? item;
      const name = casa.nombre ?? "Desconocido";
      const buy = parseNumber(casa.compra ?? casa.buy ?? 0);
      const sell = parseNumber(casa.venta ?? casa.sell ?? 0);
      return {
        name,
        tag: name.toUpperCase().replace(/\s+/g, "_").replace(/\W/g, ""),
        buy,
        sell,
        variation: 0,
        updated: new Date().toISOString(),
      } as Quote;
    });

    return map;
  } catch (e) {
    return [];
  }
}

export async function fetchFromBluelytics(): Promise<Quote[]> {
  try {
    const res = await fetch("https://api.bluelytics.com.ar/v2/latest");
    const json = await res.json();
    const out: Quote[] = [];
    if (json.oficial) {
      out.push({
        name: "Dólar oficial",
        tag: "OFICIAL",
        buy: Number(json.oficial.value_buy ?? json.oficial.value),
        sell: Number(json.oficial.value_sell ?? json.oficial.value),
        variation: 0,
        updated: new Date().toISOString(),
      });
    }
    if (json.blue) {
      out.push({
        name: "Dólar blue",
        tag: "BLUE",
        buy: Number(json.blue.value_buy ?? json.blue.value),
        sell: Number(json.blue.value_sell ?? json.blue.value),
        variation: 0,
        updated: new Date().toISOString(),
      });
    }
    return out;
  } catch (e) {
    return [];
  }
}

export async function fetchAllQuotes(): Promise<Quote[]> {
  // try multiple sources and merge results (prefer Bluelytics for USD, fallback to Dolarsi)
  const [blue, dolarsi] = await Promise.all([fetchFromBluelytics(), fetchFromDolarsi()]);

  const byTag = new Map<string, Quote>();

  for (const q of dolarsi) {
    byTag.set(q.tag, q);
  }
  for (const q of blue) {
    byTag.set(q.tag, q);
  }

  // ensure some common tags exist
  if (!byTag.has("OFICIAL") && dolarsi.length > 0) {
    const first = dolarsi[0];
    byTag.set("OFICIAL", { ...first, tag: "OFICIAL", name: "Dólar oficial" });
  }

  if (!byTag.has("BLUE") && dolarsi.length > 1) {
    const second = dolarsi[1];
    byTag.set("BLUE", { ...second, tag: "BLUE", name: "Dólar blue" });
  }

  const result = Array.from(byTag.values());
  if (result.length === 0) {
    // fallback mock
    return [
      { name: "Dólar oficial", tag: "OFICIAL", buy: 1475, sell: 1475, variation: 0, updated: new Date().toISOString() },
      { name: "Dólar blue", tag: "BLUE", buy: 1505, sell: 1505, variation: 0, updated: new Date().toISOString() },
    ];
  }

  return result;
}

export type { Quote };


