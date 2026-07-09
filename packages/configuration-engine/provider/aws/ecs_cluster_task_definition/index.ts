import path from "path";
import fs from "fs";

const ECS_CLUSTER_TASK_DEFINITION_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateECSClusterTaskDefinitionModule(): Record<string, string> {
  for (const file of Object.keys(ECS_CLUSTER_TASK_DEFINITION_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      ECS_CLUSTER_TASK_DEFINITION_CONFIG[file] = content;
    } catch (err) {
      ECS_CLUSTER_TASK_DEFINITION_CONFIG[file] = "";
    }
  }
  return ECS_CLUSTER_TASK_DEFINITION_CONFIG;
}
