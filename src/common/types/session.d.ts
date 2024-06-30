import { Express } from "express";


declare global {
  namespace Express {
    export interface Request {
      session: Session;
      sessionID?: string;
    }
    interface SessionData {
      user: string;
    }
  }
}
