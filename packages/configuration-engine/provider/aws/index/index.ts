import path from "path";
import fs from "fs";

const INDEX_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateIndexModule(): Record<string, string> {
  for (const file of Object.keys(INDEX_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      INDEX_CONFIG[file] = content;
    } catch (err) {
      INDEX_CONFIG[file] = "";
    }
  }
  return INDEX_CONFIG;
}
