import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function rateLimit(identifier: string) {
  // simple fixed-window counter
  const limit = Number(process.env.RATE_LIMIT_PER_MINUTE ?? 60);
  const windowSeconds = 60;
  if (!redisClient) {
    return { allowed: true, remaining: limit, reset: windowSeconds };
  }

  const key = `rl:${identifier}`;
  try {
    const current = (await redisClient.incr(key)) as number;
    if (current === 1) {
      await redisClient.expire(key, windowSeconds);
    }
    const ttl = (await redisClient.ttl(key)) ?? windowSeconds;
    return { allowed: current <= limit, remaining: Math.max(0, limit - current), reset: ttl };
  } catch (e) {
    // on errors allow traffic
    return { allowed: true, remaining: limit, reset: windowSeconds };
  }
}


