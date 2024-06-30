declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;

    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;

    SESSION_NAME:string;
    SESSION_SECRET:string;
  }
}
