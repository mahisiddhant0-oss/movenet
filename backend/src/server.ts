import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`MoveNet API is running at http://localhost:${env.PORT}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  console.error("Unable to start MoveNet API:", error.message);
  process.exit(1);
});

const shutdown = (signal: string): void => {
  console.log(`${signal} received. Shutting down MoveNet API...`);

  server.close((error?: Error) => {
    if (error) {
      console.error("MoveNet API shutdown failed:", error.message);
      process.exit(1);
    }

    process.exit(0);
  });
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));