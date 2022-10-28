import Redis from "ioredis";

export function initializeRedis() {
  const redis = new Redis({
    host: "0.0.0.0",
    port: 6379,
  });

  return redis;
}
