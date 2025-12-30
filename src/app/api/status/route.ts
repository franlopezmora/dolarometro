import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Dolarómetro",
    environment: process.env.VERCEL_ENV ?? "local",
    version: "0.1.0",
    updatedAt: new Date().toISOString(),
    message: "Mock API en Next.js lista para conectar a fuentes reales.",
  });
}




