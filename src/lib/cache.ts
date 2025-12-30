import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redisClient) return null;
  try {
    const raw = await redisClient.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setCache(key: string, value: unknown, ttlSeconds = 300) {
  if (!redisClient) return;
  try {
    await redisClient.set(key, JSON.stringify(value), { ex: ttlSeconds });
  } catch {
    // ignore cache errors
  }
}


