# Dolarómetro — Configuración y despliegue

Breve guía para conectar Neon/PlanetScale, Upstash y desplegar en Vercel.

1) Requisitos locales
- Node 18+
- npm

2) Variables de entorno (en Vercel -> Project -> Settings -> Environment Variables)
- `DATABASE_URL` — Neon Postgres connection string (ej: `postgres://...`)
- `PLANETSCALE_URL` — alternativa MySQL (si usás PlanetScale)
- `UPSTASH_REDIS_REST_URL` — Upstash REST URL
- `UPSTASH_REDIS_REST_TOKEN` — Upstash REST token
- `RATE_LIMIT_PER_MINUTE` — (opcional) requests por minuto por IP (default 60)

3) Prisma (Neon)
- Instalar dependencias:
  ```bash
  npm install
  ```
- Generar cliente Prisma:
  ```bash
  npx prisma generate
  ```
- Crear migración local y aplicarla (desarrollo):
  ```bash
  npx prisma migrate dev --name init
  ```
- Seed (ejemplo):
  ```bash
  npm run prisma:seed
  ```

4) Upstash Redis
- Crear instancia en https://upstash.com y copiar `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` a las vars de Vercel.
- El proyecto usa Upstash para caching y rate-limiting (token bucket simple).

5) Vercel
- Conectar repo en Vercel (tu cuenta) y añadir las variables de entorno anteriores.
- El archivo `vercel.json` incluye un cron que llama a `/api/cron/fetch` cada 5 minutos.
- En producción preferible usar `prisma migrate deploy` en el pipeline para migraciones.

6) Scripts útiles
- `npm run dev` — desarrollo local
- `npm run build` — build
- `npm run prisma:generate` — genera cliente Prisma
- `npm run prisma:migrate:dev` — crea/aplica migración local (dev)
- `npm run prisma:migrate:deploy` — aplica migraciones en prod
- `npm run prisma:seed` — seed de ejemplo

7) Probar endpoints
- Cotizaciones: `GET /api/quotes`
- Conversor: `GET /api/convert?from=ARS&to=USD_BLUE&amount=1000`
- Histórico: `GET /api/history/OFICIAL`
- Cron manual: `GET /api/cron/fetch`

Si querés, yo ejecuto la migración y el seed en tu Neon (necesitaré la `DATABASE_URL` o que lo hagas localmente y me confirmes). También puedo añadir soporte más robusto de rate-limiting (token-bucket con refill atómico via LUA) si lo preferís.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
