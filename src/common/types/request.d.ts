import { Express } from "express";
import { SessionEntity } from "../../models/session.entity";

declare global {
    namespace Express {
        export interface Request {
            userSession?: SessionEntity;
        }
    }
}