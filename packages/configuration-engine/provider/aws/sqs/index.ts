import path from "path";
import fs from "fs";

const SQS_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateSQSModule(): Record<string, string> {
  for (const file of Object.keys(SQS_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      SQS_CONFIG[file] = content;
    } catch (err) {
      SQS_CONFIG[file] = "";
    }
  }
  return SQS_CONFIG;
}
