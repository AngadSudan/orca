import path from "path";
import fs from "fs";

const DYNAMO_DB_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateDynamoDbModule(): Record<string, string> {
  for (const file of Object.keys(DYNAMO_DB_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      DYNAMO_DB_CONFIG[file] = content;
    } catch (err) {
      DYNAMO_DB_CONFIG[file] = "";
    }
  }
  return DYNAMO_DB_CONFIG;
}
