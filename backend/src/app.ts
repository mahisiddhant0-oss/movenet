import express, {
  type ErrorRequestHandler,
  type Request,
  type Response
} from "express";

import { env } from "./config/env.js";
import { checkPostgresConnection } from "./integrations/postgres/client.js";
import { checkRedisConnection } from "./integrations/redis/client.js";

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  app.get(
    "/api/v1/health",
    (_request: Request, response: Response): void => {
      response.status(200).json({
        success: true,
        data: {
          service: "movenet-api",
          status: "ok",
          environment: env.NODE_ENV,
          timestamp: new Date().toISOString()
        }
      });
    }
  );

  app.get(
    "/api/v1/health/dependencies",
    async (_request: Request, response: Response): Promise<void> => {
      const [postgresResult, redisResult] = await Promise.allSettled([
        checkPostgresConnection(),
        checkRedisConnection()
      ]);

      const postgres =
        postgresResult.status === "fulfilled"
          ? {
              status: "ok",
              databaseName: postgresResult.value.databaseName,
              postgisVersion: postgresResult.value.postgisVersion
            }
          : {
              status: "unavailable"
            };

      const redis =
        redisResult.status === "fulfilled"
          ? {
              status: "ok",
              response: redisResult.value
            }
          : {
              status: "unavailable"
            };

      const isHealthy =
        postgresResult.status === "fulfilled" &&
        redisResult.status === "fulfilled";

      response.status(isHealthy ? 200 : 503).json({
        success: isHealthy,
        data: {
          postgres,
          redis,
          timestamp: new Date().toISOString()
        }
      });
    }
  );

  app.use((request: Request, response: Response): void => {
    response.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `Route ${request.method} ${request.originalUrl} was not found.`
      }
    });
  });

  const errorHandler: ErrorRequestHandler = (
    error,
    request,
    response,
    _next
  ) => {
    console.error({
      event: "unhandled_error",
      method: request.method,
      path: request.originalUrl,
      error: error instanceof Error ? error.message : "Unknown error"
    });

    const message =
      env.NODE_ENV === "production"
        ? "An unexpected error occurred."
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

    response.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message
      }
    });
  };

  app.use(errorHandler);

  return app;
};