import path from "path";
import fs from "fs";

const KINESIS_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateKinesisModule(): Record<string, string> {
  for (const file of Object.keys(KINESIS_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      KINESIS_CONFIG[file] = content;
    } catch (err) {
      KINESIS_CONFIG[file] = "";
    }
  }
  return KINESIS_CONFIG;
}
