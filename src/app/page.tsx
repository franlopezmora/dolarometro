type Quote = {
  name: string;
  tag: string;
  buy: number;
  sell: number;
  variation: number;
  updated: string;
};

const quotes: Quote[] = [
  { name: "Dólar oficial", tag: "OFICIAL", buy: 1425, sell: 1475, variation: 0, updated: "hace 18 h" },
  { name: "Dólar blue", tag: "BLUE", buy: 1485, sell: 1505, variation: 0, updated: "hace 1 día" },
  { name: "Dólar tarjeta", tag: "TARJETA", buy: 1917.5, sell: 1917.5, variation: 0, updated: "hace 18 h" },
  { name: "Dólar MEP", tag: "MEP", buy: 1481.01, sell: 1481.01, variation: -0.8, updated: "hace 20 h" },
  { name: "Dólar CCL", tag: "CCL", buy: 1531.41, sell: 1531.41, variation: -1.02, updated: "hace 20 h" },
  { name: "Dólar cripto", tag: "CRIPTO", buy: 1517.04, sell: 1536.42, variation: 0.14, updated: "hace 18 min" },
  { name: "Dólar mayorista", tag: "MAYORISTA", buy: 1442, sell: 1451, variation: -0.07, updated: "hace 19 h" },
  { name: "Euro", tag: "EUR", buy: 1600, sell: 1650, variation: 0.2, updated: "hace 2 h" },
  { name: "Real", tag: "BRL", buy: 290, sell: 305, variation: 0.1, updated: "hace 2 h" },
];

const features = [
  "Cotizaciones consolidadas (oficial, blue, MEP, CCL, cripto, bancos)",
  "Conversor multimoneda y cálculo de brechas",
  "Históricos con gráficos e ISR para SEO y frescura",
  "API pública preparada para Vercel Edge/Functions",
  "Alertas y transparencias de fuentes en roadmap",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const getBadgeColor = (variation: number) => {
  if (variation > 0) return "text-emerald-700 bg-emerald-50";
  if (variation < 0) return "text-rose-700 bg-rose-50";
  return "text-slate-700 bg-slate-100";
};

export default function Home() {
  const avgSpread =
    quotes.length > 0
      ? quotes.reduce((acc, q) => acc + (q.sell - q.buy), 0) / quotes.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img
              src="/frame.svg"
              alt="Dolarómetro"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-slate-700">Dolarómetro</p>
              <p className="text-xs text-slate-500">Cotizaciones y brechas en vivo</p>
            </div>
          </div>
          <div className="hidden gap-3 sm:flex">
            <a
              href="#api"
              className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            >
              API
            </a>
            <a
              href="#cotizaciones"
              className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Ver cotizaciones
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              En vivo · Listo para Vercel
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Todas las cotizaciones del dólar y más, en un solo lugar.
            </h1>
            <p className="text-lg text-slate-600">
              Dolarómetro consolida fuentes, calcula brechas y te da conversor y API para
              que uses los datos en tus productos. Construido en Next.js 14 y optimizado
              para despliegue en Vercel.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#cotizaciones"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Ver cotizaciones hoy
              </a>
              <a
                href="#api"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              >
                Explorar API
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Promedio spread</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(avgSpread)}
                </p>
                <p className="text-xs text-slate-500">entre compra y venta</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Fuentes</p>
                <p className="text-2xl font-semibold text-slate-900">BCRA, MEP, CCL, cripto</p>
                <p className="text-xs text-slate-500">extensible a bancos</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold text-slate-500">Actualización</p>
                <p className="text-2xl font-semibold text-slate-900">cada 5 min</p>
                <p className="text-xs text-slate-500">via cron en Vercel</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold text-slate-600">Qué incluye el MVP</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {features.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white">
              Listo para conectar con Neon/PlanetScale para históricos y Upstash/Redis
              para caché y rate limiting.
            </div>
          </div>
        </section>

        <section id="cotizaciones" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700">Cotización hoy</p>
              <h2 className="text-2xl font-semibold text-slate-900">Dólar y otras monedas</h2>
              <p className="text-sm text-slate-600">Valores de referencia, compra y venta.</p>
            </div>
            <a
              href="#history"
              className="text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
            >
              Ver histórico (demo)
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <article
                key={quote.tag}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">{quote.tag}</p>
                    <h3 className="text-lg font-semibold text-slate-900">{quote.name}</h3>
                    <p className="text-xs text-slate-500">Actualizado {quote.updated}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${getBadgeColor(
                      quote.variation,
                    )}`}
                  >
                    {quote.variation > 0 ? "+" : ""}
                    {quote.variation}%
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Compra</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(quote.buy)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Venta</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(quote.sell)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="history" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">Histórico</p>
            <h3 className="text-xl font-semibold text-slate-900">
              Gráficos interactivos (placeholder)
            </h3>
            <p className="text-sm text-slate-600">
              Pronto: series históricas para oficial, blue, MEP, CCL, cripto, euro, real,
              con brechas y bandas custom.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">Brecha blue vs oficial</p>
                <p className="text-2xl font-semibold text-slate-900">27.1%</p>
                <p className="text-xs text-slate-500">calculada con datos mock</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">MEP vs CCL</p>
                <p className="text-2xl font-semibold text-slate-900">-3.3%</p>
                <p className="text-xs text-slate-500">diferencia relativa</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-600">
              Aquí irá el gráfico (Recharts/Victory) alimentado por `/api/history/:symbol`.
              Mantendremos ISR/SSR para SEO y caché en Vercel.
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">Conversor</p>
              <h3 className="text-lg font-semibold text-slate-900">
                ARS ⇄ USD ⇄ EUR ⇄ BRL (demo)
              </h3>
              <p className="text-sm text-slate-600">
                El endpoint `/api/convert?from=ARS&to=USD&amount=10000` devolverá el cálculo
                usando la cotización consolidada.
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                Ejemplo: 10.000 ARS ≈ {formatCurrency(10000 / 1505)} USD usando blue venta.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">Roadmap inmediato</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Conectar fuentes reales (APIs/bonos) y cron en Vercel</li>
                <li>• Persistir histórico en Neon/PlanetScale</li>
                <li>• Rate limiting en API pública</li>
                <li>• Alertas por email/webhook</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="api" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">API pública</p>
          <h3 className="text-xl font-semibold text-slate-900">Primeros endpoints</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">GET</p>
              <p className="text-sm font-semibold text-slate-900">/api/quotes</p>
              <p className="text-xs text-slate-600">Cotizaciones consolidadas</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">GET</p>
              <p className="text-sm font-semibold text-slate-900">/api/history/[symbol]</p>
              <p className="text-xs text-slate-600">Series históricas</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">GET</p>
              <p className="text-sm font-semibold text-slate-900">/api/convert</p>
              <p className="text-xs text-slate-600">Conversor con tasas actualizadas</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">GET</p>
              <p className="text-sm font-semibold text-slate-900">/api/status</p>
              <p className="text-xs text-slate-600">Heartbeat y metadata</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Respuestas mockeadas para desarrollo. Conectaríamos cron + caché + DB para
            producción en Vercel.
          </p>
        </section>
      </main>
    </div>
  );
}
