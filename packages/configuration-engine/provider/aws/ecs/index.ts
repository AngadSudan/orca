import path from "path";
import fs from "fs";

const ECS_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateECSModule(): Record<string, string> {
  for (const file of Object.keys(ECS_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      ECS_CONFIG[file] = content;
    } catch (err) {
      ECS_CONFIG[file] = "";
    }
  }
  return ECS_CONFIG;
}
