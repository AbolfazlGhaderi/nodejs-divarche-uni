import application from "./app";
import http from "http";
import dotenv from "dotenv";
import { appDataSrc } from "./core/app/app.dataSource";
dotenv.config();
const server = http.createServer(application);
const port = process.env.APP_PORT || 4020;

async function bootStrap(): Promise<void> {
  try {
    await appDataSrc.initialize();
    server.listen(port, () => {
      console.log(`server is starting on http://localhost:${port}`);
    });
  } catch (err) {
    // logger
    console.log(err);
    process.exit(1);
  }
}

bootStrap();
