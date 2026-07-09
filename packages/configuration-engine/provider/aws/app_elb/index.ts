import path from "path";
import fs from "fs";

const APP_ELB_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateAppElbModule(): Record<string, string> {
  for (const file of Object.keys(APP_ELB_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      APP_ELB_CONFIG[file] = content;
    } catch (err) {
      APP_ELB_CONFIG[file] = "";
    }
  }
  return APP_ELB_CONFIG;
}
