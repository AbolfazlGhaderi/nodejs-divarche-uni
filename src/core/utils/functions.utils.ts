import { randomBytes } from "crypto";
import { logger } from "../logging/logger";
import { extname } from "path";

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


export function GenerateImageName(origialName: string) {
  let name = origialName.split(extname(origialName))[0];
  const time = Date.now();
  return `${name}_${GenerateRandomByte(6)}_${time}${extname(origialName)}`;
}