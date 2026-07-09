import path from "path";
import fs from "fs";

const EC2_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateEC2Module(): Record<string, string> {
  for (const file of Object.keys(EC2_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      EC2_CONFIG[file] = content;
    } catch (err) {
      EC2_CONFIG[file] = "";
    }
  }
  return EC2_CONFIG;
}
