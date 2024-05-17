import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

app.disable("x-powered-by");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

export default app;
