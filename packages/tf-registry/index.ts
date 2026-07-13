import fs from "fs";
import path from "path";
import getConfigurationMappings from "@orca/configuratio-engine";
import { getCreationOrder } from "@orca/resolver";
import type { Resource, ResourceGraph } from "./type";

const written = new Set<string>();
const outRoot = path.resolve(process.cwd(), `generated_tf/`);

function completeDependencies(boardResource: Resource) {
  let creationOrder = null;
  const updatedResources: Resource[] = [];

  // resolve and fill dependenciess
  try {
    creationOrder = getCreationOrder("aws", boardResource.resource as any);

    for (const resource of creationOrder) {
      if (resource === boardResource.resource) continue;
      // create an object array and replace it with boardResource.dependencies
      updatedResources.push({
        name: "",
        resource: resource as any,
        variables: {},
        output: [],
        dependencies: [],
        contains: [],
        terraform: {},
      });
    }
  } catch (error) {
    console.log("Error in resolving dependency for ", boardResource.resource);
  }

  boardResource.dependencies = updatedResources;

  // resolve and complete variables for input
  try {
    const mapping = getConfigurationMappings(
      "aws",
      boardResource.resource as any,
    )();
    if (mapping["default.json"] === undefined) {
      throw new Error("undefined configuration mapping");
    }
    const defaultVar = JSON.parse(mapping["default.json"]);
    const userVariables = boardResource.variables;
    for (const key of Object.keys(defaultVar)) {
      if (userVariables[key] != null) {
        continue;
      }

      userVariables[key] = defaultVar[key];
    }
    boardResource.variables = userVariables;

    // get terraform
    const tf = boardResource.terraform;
    try {
      const files = ["main.tf", "variables.tf", "outputs.tf"];

      for (const file of files) {
        if (tf && mapping[file]) {
          tf[`${boardResource.resource}/${file}`] = mapping[file];
        }
      }
    } catch (error) {
      console.log("Error: Couldnot get terraform");
    }
  } catch (error) {
    console.log("Error in configuring variables for ", boardResource.resource);
  }

  for (const resource of boardResource.contains) {
    completeDependencies(resource);
  }
  for (const resource of boardResource.dependencies) {
    completeDependencies(resource);
  }
}

function createModule(res: Resource) {
  if (!res) return;
  console.log("creating resource : ", res.name || res.resource);
  // prefer creating terraform for dependencies first
  if (res.dependencies && res.dependencies.length) {
    for (const dep of res.dependencies) {
      createModule(dep);
    }
  }
  if (res.contains && res.contains.length) {
    for (const dep of res.contains) {
      createModule(dep);
    }
  }

  const tf = res.terraform || {};
  for (const key of Object.keys(tf)) {
    try {
      // key may be like "resourceName/main.tf" or just a filename
      const relative = key;
      const filePath = path.join(outRoot, relative);
      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });
      const content =
        typeof tf[key] === "string"
          ? tf[key]
          : JSON.stringify(tf[key], null, 2);
      fs.writeFileSync(filePath, content, "utf8");
    } catch (err: any) {
      console.log(
        "Error writing terraform file for",
        res.name,
        key,
        err && err.message,
      );
    }
  }

  written.add(res.name);
}

function populateCoreFile(res: Resource) {
  const content = ``;
  const relative = "main.tf";
  const filePath = path.join(outRoot, relative);
  fs.writeFileSync(filePath, content, "utf8");
}

function exportTf(boardResource: ResourceGraph, provider: string = "aws") {
  // populate dependencies
  for (const resource of Object.keys(boardResource)) {
    completeDependencies(boardResource[resource]!);
  }
  // generate file
  for (const name of Object.keys(boardResource)) {
    const res = boardResource[name]!;
    createModule(res);
  }

  // create main.tf for actual code execution
  for (const name of Object.keys(boardResource)) {
    const res = boardResource[name]!;
    populateCoreFile(res);
  }
}

export default exportTf;
