import path from "path";
import fs from "fs";

const ECS_CLUSTER_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateECSClusterModule(): Record<string, string> {
  for (const file of Object.keys(ECS_CLUSTER_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      ECS_CLUSTER_CONFIG[file] = content;
    } catch (err) {
      ECS_CLUSTER_CONFIG[file] = "";
    }
  }
  return ECS_CLUSTER_CONFIG;
}
