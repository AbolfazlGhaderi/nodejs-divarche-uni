import {App} from "./app";
import dotenv from "dotenv";
import { appDataSrc } from "./core/app/app.dataSource";
import { logger } from "./core/logging/logger";
import { Container } from "inversify";

dotenv.config();

// const server = http.createServer(App);

const PORT = parseInt(process.env.PORT || "3000");
async function bootStrap() {
  try {
    const container = new Container({ defaultScope: "Singleton" });
    const app = new App(container, PORT);
    await appDataSrc.initialize();
    logger.info("Database connected", { context: "BootStrap" });
    app.start();
  } catch (error) {
    logger.error("Error starting the server", error);
    process.exit(1);
  }
}

bootStrap();
