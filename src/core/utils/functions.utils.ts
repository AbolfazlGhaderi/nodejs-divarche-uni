import { randomBytes } from "crypto";
import { logger } from "../logging/logger";

export function CheckEnvVariables(variable: string | undefined, section: string) {
  if (!variable || variable === '') {
    logger.error(`Env Variable ${section} Not Found`, { context: "CheckEnvVariables" })
    throw new Error(`Env Variable ${section} Not Found`);
  }

  logger.info(`Env Variable { ${section.toUpperCase()} } Found`, { context: "CheckEnvVariables" })
  return variable;
}

export function GenerateRandomByte(size: number) {
  return randomBytes(size).toString('hex');
}
