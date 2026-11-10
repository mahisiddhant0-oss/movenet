import { Pool } from "pg";

import { env } from "../../config/env.js";

export const postgresPool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

postgresPool.on("error", (error: Error) => {
  console.error("Unexpected PostgreSQL pool error:", error.message);
});

type PostgresHealthRow = {
  databaseName: string;
  postgisVersion: string;
};

export const checkPostgresConnection = async (): Promise<PostgresHealthRow> => {
  const result = await postgresPool.query<PostgresHealthRow>(
    `
      SELECT
        current_database() AS "databaseName",
        postgis_lib_version() AS "postgisVersion"
    `
  );

  const health = result.rows[0];

  if (!health) {
    throw new Error("PostgreSQL health query did not return a result.");
  }

  return health;
};