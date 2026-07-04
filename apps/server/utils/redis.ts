import RedisClient from "@orca/redis";

const redisClient = new RedisClient(
  process.env.REDIS_URI || "redis://myuser:mypassword@localhost:6379",
  process.env.REDIS_PASSWORD || "mypassword",
);

export default redisClient;
