export function CheckEnvVariables(variable: string | undefined, section: string) {
    console.log("object");
  if (!variable || variable === '') throw new Error(`Env Variable ${section} Not Found`);
  return variable;
}
