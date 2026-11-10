import { createClient } from "redis";

import { env } from "../../config/env.js";

export const redisClient = createClient({
  url: env.REDIS_URL
});

redisClient.on("error", (error: Error) => {
  console.error("Redis client error:", error.message);
});

const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export const checkRedisConnection = async (): Promise<string> => {
  await connectRedis();

  return redisClient.ping();
};