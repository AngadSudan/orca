import path from "path";
import fs from "fs";

const TARGET_GROUP_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateTargetGroupModule(): Record<string, string> {
  for (const file of Object.keys(TARGET_GROUP_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      TARGET_GROUP_CONFIG[file] = content;
    } catch (err) {
      TARGET_GROUP_CONFIG[file] = "";
    }
  }
  return TARGET_GROUP_CONFIG;
}
