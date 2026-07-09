import path from "path";
import fs from "fs";

const RDS_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateRDSModule(): Record<string, string> {
  for (const file of Object.keys(RDS_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      RDS_CONFIG[file] = content;
    } catch (err) {
      RDS_CONFIG[file] = "";
    }
  }
  return RDS_CONFIG;
}
