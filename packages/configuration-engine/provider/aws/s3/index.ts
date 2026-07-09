import path from "path";
import fs from "fs";

const S3_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateS3Module(): Record<string, string> {
  for (const file of Object.keys(S3_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      S3_CONFIG[file] = content;
    } catch (err) {
      S3_CONFIG[file] = "";
    }
  }
  return S3_CONFIG;
}
