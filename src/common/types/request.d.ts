import { Express } from "express";
import { UserEntity } from "../../models/user.entity";

declare global {
    namespace Express {
        export interface Request {
            user?: UserEntity;
        }
    }
}