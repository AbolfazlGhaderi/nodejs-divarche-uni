declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;

    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;

    COOKIE_SECRET: string;

    JWT_SECRET: string;

    S3_ENDPOINT: string;
    S3_BUCKET: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_KEY: string;
    S3_LOCATION_ENDPOINT: string;
  }
}
