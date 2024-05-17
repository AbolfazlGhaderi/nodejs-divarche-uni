import application from "./app";
import http from "http";
import dotenv from "dotenv";
import { appDataSrc } from "./core/app/app.dataSource";
import { logger } from "./core/logging/logger";

dotenv.config();

const server = http.createServer(application);
const port = process.env.APP_PORT || 4020;

async function bootStrap(): Promise<void> {
  try {
    await appDataSrc.initialize();
    logger.info("Database connected", { context: "BootStrap" });
    server.listen(port, () => {
      logger.info(`server is starting on http://localhost:${port}`, { context: "BootStrap" });
    });
  } catch (err) {
    // logger
    logger.error("app crashed", { context: "BootStrap", err });
    process.exit(1);
  }
}

bootStrap();
