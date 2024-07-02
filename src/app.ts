// import cors from "cors";
// import express, { Application } from "express";
// import morgan from "morgan";

// const app: Application = express();

// app.disable("x-powered-by");

// // template engine
// app.set('view engine', 'ejs');
// app.set("views", "views");

// // middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "*" }));
// app.use(morgan("dev"));

// export default app;

import cors from "cors";
import path from "path";
import "reflect-metadata";
import morgan from "morgan";
import { Server } from "http";
import express from 'express';
import flash from 'connect-flash'
import Session from 'express-session'
import { Container } from "inversify";
import cookieParser from "cookie-parser";
import { Application, json, urlencoded } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
// import { Logger, errorHandler, lastHandler, notFoundHandler } from "./core";

import { bindings } from "./iOC/container";
import { logger } from "./core/logging/logger";

//should import the controller to create metadata
import "./modules/ad/ad.controller";
import "./modules/auth/auth.controller"
import "./modules/user/user.controller";
import bodyParser from "body-parser";

// Variables
const view = path.join(__dirname, "../src/views");

//

export class App {
  private readonly _container: Container;
  private readonly _port: number;

  constructor(container: Container, port: number) {
    this._container = container;
    this._port = port;
    this.modules();
  }

  public start(): Server {
    const server = new InversifyExpressServer(this._container, null);

    return server
      .setConfig((app) => this.middlewares(app))
      .build()
      .listen(this._port, () => {
        logger.info(`server is starting on http://localhost:${this._port}`);
      });
  }

  private async modules(): Promise<void> {
    return await this._container.loadAsync(bindings);
  }

  private middlewares(app: Application): void {
    app.set("view engine", "ejs");
    app.set("views", view);
    app.disable("x-powered-by");
    app.use(json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser())
    app.use(Session({ secret:'sdssdcscsdcscsdcsdcscsocweowc5wc4we5de',cookie: { maxAge: 2000 }}));
    app.use(flash())
    app.use(morgan("dev"));
    app.use(cors());
    app.use("/assets", express.static(path.join(__dirname,'../assets')))
  }
}
