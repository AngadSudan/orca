import path from "path";
import fs from "fs";

const IAM_ROLE_POLICY_ATTACHMENT_CONFIG: Record<string, string> = {
  "main.tf": "",
  "outputs.tf": "",
  "variables.tf": "",
  "default.json": "",
};

export function generateIAMRolePolicyAttachmentModule(): Record<string, string> {
  for (const file of Object.keys(IAM_ROLE_POLICY_ATTACHMENT_CONFIG)) {
    const filePath = path.join(__dirname, file);
    try {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      IAM_ROLE_POLICY_ATTACHMENT_CONFIG[file] = content;
    } catch (err) {
      IAM_ROLE_POLICY_ATTACHMENT_CONFIG[file] = "";
    }
  }
  return IAM_ROLE_POLICY_ATTACHMENT_CONFIG;
}
