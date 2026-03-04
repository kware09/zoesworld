import { Redis } from '@upstash/redis';

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getValue(key: string): Promise<unknown> {
  try {
    const redis = getRedis();
    if (!redis) return null;
    return await redis.get(key);
  } catch {
    return null;
  }
}

export async function setValue(key: string, value: unknown): Promise<void> {
  try {
    const redis = getRedis();
    if (!redis) return;
    if (value === null || value === undefined) {
      await redis.del(key);
    } else {
      await redis.set(key, JSON.stringify(value));
    }
  } catch {
    // Silently fail — client falls back to localStorage
  }
}
