import path from "path";
import fs from "fs";

const SECURITY_GROUPS_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateSecurityGroupsModule(): Record<string, string> {
  for (const file of Object.keys(SECURITY_GROUPS_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      SECURITY_GROUPS_CONFIG[file] = content;
    } catch (err) {
      SECURITY_GROUPS_CONFIG[file] = "";
    }
  }
  return SECURITY_GROUPS_CONFIG;
}
