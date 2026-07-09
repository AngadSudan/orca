import path from "path";
import fs from "fs";

const LAUNCH_TEMPLATE_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateLaunchTemplateModule(): Record<string, string> {
  for (const file of Object.keys(LAUNCH_TEMPLATE_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      LAUNCH_TEMPLATE_CONFIG[file] = content;
    } catch (err) {
      LAUNCH_TEMPLATE_CONFIG[file] = "";
    }
  }
  return LAUNCH_TEMPLATE_CONFIG;
}
