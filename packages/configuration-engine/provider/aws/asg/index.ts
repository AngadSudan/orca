import path from "path";
import fs from "fs";

const ASG_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateAsgModule(): Record<string, string> {
  for (const file of Object.keys(ASG_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      ASG_CONFIG[file] = content;
    } catch (err) {
      ASG_CONFIG[file] = "";
    }
  }
  return ASG_CONFIG;
}
