import fs from "fs";
import path from "path";
import os from "os";
import { generateEC2Module } from "./provider/aws/ec2/index";

async function writeConfigFiles(value: unknown, targetPath: string) {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    await fs.promises.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.promises.writeFile(targetPath, `${value}${os.EOL}`);
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  await fs.promises.mkdir(targetPath, { recursive: true });

  for (const [name, child] of Object.entries(
    value as Record<string, unknown>,
  )) {
    await writeConfigFiles(child, path.join(targetPath, name));
  }
}

async function main(
  resource: string,
  env: Record<string, string | string[] | boolean>,
) {
  const conf = generateEC2Module();
  const dir = path.join("src", "module");
  await writeConfigFiles(conf, dir);

  let indexData = `module "ec2" {
        source="./module/${resource}"

        __env__
    }
  `;

  // replace the env with the following data
  let jsonEnv = "";
  for (const key of Object.keys(env)) {
    console.log(key);
    jsonEnv = `${jsonEnv}\n${key}=${env[key]}`;
  }

  indexData = indexData.replace("__env__", jsonEnv);
  await fs.promises.mkdir(path.join("src"), { recursive: true });
  await fs.promises.writeFile(path.join("src", "index.tf"), indexData);
}

main("ec2", {
  ami: "t2.small",
  instance_type: "random",
  disk_size: "random",
  subnet_id: "random",
  security_group_ids: ["random"],
  associate_public_ip_address: true,
});
