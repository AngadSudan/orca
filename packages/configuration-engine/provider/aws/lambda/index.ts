import path from "path";
import fs from "fs";

const LAMBDA_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateLambdaModule(): Record<string, string> {
  for (const file of Object.keys(LAMBDA_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      LAMBDA_CONFIG[file] = content;
    } catch (err) {
      LAMBDA_CONFIG[file] = "";
    }
  }
  return LAMBDA_CONFIG;
}
