import path from "path";
import fs from "fs";

const KEY_PAIR_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateKeyPairModule(): Record<string, string> {
  for (const file of Object.keys(KEY_PAIR_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      KEY_PAIR_CONFIG[file] = content;
    } catch (err) {
      KEY_PAIR_CONFIG[file] = "";
    }
  }
  return KEY_PAIR_CONFIG;
}
