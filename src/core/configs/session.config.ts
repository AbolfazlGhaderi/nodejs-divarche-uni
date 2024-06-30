import { config } from "dotenv";
config();
import Session from "express-session";

// Variables
const SESSION_MAX_AGE = 1000 * 60 * 60 ; // should be two day => 100 * 60 * 60 * 48
const IN_PRODUCTION = process.env.NODE_ENV === "production";
const SECRET = process.env.SESSION_SECRET ?? "{#mVl)QSfG4q])mZzS?dz|VYC|Zw[V";

//


const SessionConfig = Session({
  name: process.env.SESSION_NAME,
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
    secure: IN_PRODUCTION,
    path: "/",
    sameSite: true,
  },
});

export {SessionConfig}
