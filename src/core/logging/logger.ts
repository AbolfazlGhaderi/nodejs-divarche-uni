import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.simple(),
    // winston.format.errors({ stack: true }),
    winston.format.printf((info) => {
      if (info.stack) {
        return `${info.timestamp} ${info.level.toUpperCase()} | ${info.context} : ${info.message} \n ${info.stack}`;
      }
      return `${info.timestamp}  ${info.level.toUpperCase()} | ${info.context} : ${info.message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => {
          if (info.stack) {
            return `${info.timestamp} ${info.level} | ${info.context} : ${info.message} \n ${info.stack}`;
          }
          return `${info.timestamp}  ${info.level} | ${info.context} : ${info.message}`;
        }),
      ),
    }),
    new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
  ],
});
