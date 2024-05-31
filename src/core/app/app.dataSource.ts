import { config } from "dotenv";
config();
import { DataSource } from "typeorm";
import { join } from "path";

const mainDir = process.env.NODE_ENV === "production" ? "dist" : "src";

export const appDataSrc = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
  entities: [join(process.cwd(), mainDir, "models", "**/*.model{.ts,.js}")],
  //   migrations: [join(process.cwd(), mainDir, "models", "migrations", "**/**{.ts,.js}")],
  synchronize: true,
  logging: false,
});
