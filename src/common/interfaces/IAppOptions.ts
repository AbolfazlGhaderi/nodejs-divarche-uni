import { CorsOptions } from "cors";
import { HelmetOptions } from "helmet";
import { Options } from "express-rate-limit";

export interface IAppOptions {
  cors: CorsOptions;
  helmet: HelmetOptions;
  rate: Partial<Options>;
}
