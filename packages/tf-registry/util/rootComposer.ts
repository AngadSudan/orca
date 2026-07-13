import type { Resource, ResourceGraph } from "../type";
import { getModuleBinding, type ModuleBinding } from "./moduleBindings";

interface TerraformExpression {
  kind: "terraform-expression";
  value: string;
}

interface TerraformVariable {
  name: string;
  hasDefault: boolean;
}

interface ModuleInstance {
  resource: Resource;
  moduleName: string;
  sourceDir: string;
  variables: TerraformVariable[];
  outputs: Set<string>;
  dependencies: ModuleInstance[];
  parents: ModuleInstance[];
}

type TerraformInput =
  | string
  | string[]
  | number
  | boolean
  | null
  | Record<string, unknown>
  | TerraformExpression
  | TerraformInput[];

function tfExpression(value: string): TerraformExpression {
  return { kind: "terraform-expression", value };
}

function isTfExpression(value: unknown): value is TerraformExpression {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as TerraformExpression).kind === "terraform-expression"
  );
}

function sanitizeModuleName(value: string): string {
  const cleaned = value
    .trim()
    .replace(/[^A-Za-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  const fallback = cleaned || "module";
  return /^[A-Za-z_]/.test(fallback) ? fallback : `_${fallback}`;
}

function uniqueModuleName(baseName: string, seen: Map<string, number>): string {
  const sanitized = sanitizeModuleName(baseName);
  const count = seen.get(sanitized) ?? 0;
  seen.set(sanitized, count + 1);
  return count === 0 ? sanitized : `${sanitized}_${count + 1}`;
}

function extractBlock(content: string, start: number): string {
  const openBrace = content.indexOf("{", start);
  if (openBrace === -1) return "";

  let depth = 0;
  for (let index = openBrace; index < content.length; index += 1) {
    const char = content[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) {
      return content.slice(openBrace + 1, index);
    }
  }

  return content.slice(openBrace + 1);
}

function parseVariables(content: string): TerraformVariable[] {
  const variables: TerraformVariable[] = [];
  const regex = /variable\s+"([^"]+)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const block = extractBlock(content, match.index);
    variables.push({
      name: match[1]!,
      hasDefault: /\bdefault\s*=/.test(block),
    });
  }

  return variables;
}

function parseOutputs(content: string): Set<string> {
  const outputs = new Set<string>();
  const regex = /output\s+"([^"]+)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    outputs.add(match[1]!);
  }

  return outputs;
}

function findTerraformFile(resource: Resource, fileName: string): string {
  const match = Object.entries(resource.terraform ?? {}).find(([key]) =>
    key.endsWith(`/${fileName}`),
  );

  return match?.[1] ?? "";
}

function findSourceDir(resource: Resource): string {
  const mainFile = Object.keys(resource.terraform ?? {}).find((key) =>
    key.endsWith("/main.tf"),
  );
  if (!mainFile) return resource.resource;

  const slashIndex = mainFile.lastIndexOf("/");
  return slashIndex === -1 ? resource.resource : mainFile.slice(0, slashIndex);
}

function collectResources(
  resource: Resource,
  instances: ModuleInstance[],
  byResource: Map<Resource, ModuleInstance>,
  seenNames: Map<string, number>,
  parents: ModuleInstance[] = [],
): ModuleInstance {
  const existing = byResource.get(resource);
  if (existing) return existing;

  const baseName = resource.name || resource.resource;
  const variablesContent = findTerraformFile(resource, "variables.tf");
  const outputsContent = findTerraformFile(resource, "outputs.tf");
  const instance: ModuleInstance = {
    resource,
    moduleName: uniqueModuleName(baseName, seenNames),
    sourceDir: findSourceDir(resource),
    variables: parseVariables(variablesContent),
    outputs: parseOutputs(outputsContent),
    dependencies: [],
    parents,
  };

  byResource.set(resource, instance);

  for (const dependency of resource.dependencies ?? []) {
    instance.dependencies.push(
      collectResources(dependency, instances, byResource, seenNames, parents),
    );
  }

  instances.push(instance);

  for (const child of resource.contains ?? []) {
    collectResources(child, instances, byResource, seenNames, [
      ...parents,
      instance,
    ]);
  }

  return instance;
}

function hasConcreteValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function shouldApplyBinding(currentValue: unknown): boolean {
  if (currentValue === null || currentValue === undefined) return true;
  if (Array.isArray(currentValue)) return currentValue.length === 0;
  return false;
}

function moduleReference(
  dependency: ModuleInstance,
  binding: ModuleBinding,
): TerraformExpression {
  const output = dependency.outputs.has(binding.output) ? binding.output : "id";
  const reference = `module.${dependency.moduleName}.${output}`;

  if (binding.wrap === "list") {
    return tfExpression(`[${reference}]`);
  }

  return tfExpression(reference);
}

function singularizeResourceName(resource: string): string {
  if (resource.endsWith("_groups")) return resource.slice(0, -1);
  if (resource.endsWith("s")) return resource.slice(0, -1);
  return resource;
}

function inferModuleBinding(
  consumerVariables: Set<string>,
  dependency: ModuleInstance,
): ModuleBinding | null {
  const names = [
    dependency.resource.resource,
    singularizeResourceName(dependency.resource.resource),
  ];
  const outputCandidates: Array<{
    suffix: string;
    output: string;
    wrap?: "list";
  }> = [
    { suffix: "ids", output: "id", wrap: "list" },
    { suffix: "id", output: "id" },
    { suffix: "arns", output: "arn", wrap: "list" },
    { suffix: "arn", output: "arn" },
    { suffix: "names", output: "name", wrap: "list" },
    { suffix: "name", output: "name" },
  ];

  for (const name of names) {
    for (const candidate of outputCandidates) {
      if (!dependency.outputs.has(candidate.output)) continue;

      const input = `${name}_${candidate.suffix}`;
      if (consumerVariables.has(input)) {
        return {
          input,
          output: candidate.output,
          wrap: candidate.wrap,
        };
      }
    }
  }

  return null;
}

function stripProviderPrefix(value: string): string {
  return value.replace(/^aws_/, "");
}

function getOutputAliases(instance: ModuleInstance): Set<string> {
  const aliases = new Set<string>([
    instance.moduleName,
    instance.resource.resource,
    stripProviderPrefix(instance.moduleName),
    stripProviderPrefix(instance.resource.resource),
    singularizeResourceName(stripProviderPrefix(instance.resource.resource)),
  ]);

  for (const output of instance.resource.output ?? []) {
    const outputName = String(output).split(".")[0];
    if (!outputName) continue;
    aliases.add(outputName);
    aliases.add(stripProviderPrefix(outputName));
  }

  for (const alias of Array.from(aliases)) {
    const parts = alias.split("_");
    if (parts.length > 1) {
      aliases.add(parts[parts.length - 1]!);
    }
  }

  return aliases;
}

function findContextReference(
  inputName: string,
  instance: ModuleInstance,
  allInstances: ModuleInstance[],
): TerraformExpression | null {
  const candidates = [
    ...instance.parents.slice().reverse(),
    ...instance.dependencies,
    ...allInstances,
  ].filter((candidate) => candidate !== instance);
  const seen = new Set<ModuleInstance>();

  for (const candidate of candidates) {
    if (seen.has(candidate)) continue;
    seen.add(candidate);

    for (const alias of getOutputAliases(candidate)) {
      if (inputName === alias) {
        return tfExpression(`module.${candidate.moduleName}`);
      }
      if (inputName === `${alias}_id` && candidate.outputs.has("id")) {
        return tfExpression(`module.${candidate.moduleName}.id`);
      }
      if (inputName === `${alias}_ids` && candidate.outputs.has("id")) {
        return tfExpression(`[module.${candidate.moduleName}.id]`);
      }
      if (inputName === `${alias}_arn` && candidate.outputs.has("arn")) {
        return tfExpression(`module.${candidate.moduleName}.arn`);
      }
      if (inputName === `${alias}_arns` && candidate.outputs.has("arn")) {
        return tfExpression(`[module.${candidate.moduleName}.arn]`);
      }
      if (inputName === `${alias}_name` && candidate.outputs.has("name")) {
        return tfExpression(`module.${candidate.moduleName}.name`);
      }
      if (inputName === `${alias}_names` && candidate.outputs.has("name")) {
        return tfExpression(`[module.${candidate.moduleName}.name]`);
      }
    }
  }

  return null;
}

function applySpecialBinding(
  instance: ModuleInstance,
  dependency: ModuleInstance,
  binding: ModuleBinding,
  inputs: Record<string, TerraformInput>,
): boolean {
  if (
    instance.resource.resource === "ecs" &&
    dependency.resource.resource === "security_groups"
  ) {
    const current = inputs["network_configuration"];
    if (
      typeof current === "object" &&
      current !== null &&
      !Array.isArray(current) &&
      !isTfExpression(current)
    ) {
      const currentObject = current as Record<string, unknown>;
      if (shouldApplyBinding(currentObject["security_groups"])) {
        inputs["network_configuration"] = {
          ...currentObject,
          security_groups: moduleReference(dependency, binding),
        };
        return true;
      }
    }
  }

  return false;
}

function buildInputs(
  instance: ModuleInstance,
  provider: string,
  allInstances: ModuleInstance[],
): {
  inputs: Record<string, TerraformInput>;
  dependsOn: TerraformExpression[];
  missingRequiredInputs: string[];
} {
  const declaredVariables = new Set(instance.variables.map((item) => item.name));
  const inputs: Record<string, TerraformInput> = {};
  const dependsOn: TerraformExpression[] = [];
  const variables = instance.resource.variables ?? {};

  for (const variable of instance.variables) {
    const value = variables[variable.name];
    if (hasConcreteValue(value)) {
      inputs[variable.name] = value as TerraformInput;
    }
  }

  for (const dependency of instance.dependencies) {
    const binding =
      getModuleBinding(
        provider,
        instance.resource.resource,
        dependency.resource.resource,
      ) ?? inferModuleBinding(declaredVariables, dependency);

    if (!binding || binding.dependsOnly) {
      dependsOn.push(tfExpression(`module.${dependency.moduleName}`));
      continue;
    }

    if (!declaredVariables.has(binding.input)) {
      dependsOn.push(tfExpression(`module.${dependency.moduleName}`));
      continue;
    }

    if (applySpecialBinding(instance, dependency, binding, inputs)) {
      continue;
    }

    if (shouldApplyBinding(inputs[binding.input])) {
      inputs[binding.input] = moduleReference(dependency, binding);
      continue;
    }

    dependsOn.push(tfExpression(`module.${dependency.moduleName}`));
  }

  for (const variable of instance.variables) {
    if (!shouldApplyBinding(inputs[variable.name])) continue;

    const reference = findContextReference(
      variable.name,
      instance,
      allInstances,
    );
    if (reference) {
      inputs[variable.name] = reference;
    }
  }

  const missingRequiredInputs = instance.variables
    .filter((variable) => !variable.hasDefault)
    .filter((variable) => !hasConcreteValue(inputs[variable.name]))
    .map((variable) => variable.name);

  return { inputs, dependsOn, missingRequiredInputs };
}

function quoteString(value: string): string {
  return JSON.stringify(value);
}

function renderObject(value: Record<string, unknown>, indent: number): string {
  const spaces = " ".repeat(indent);
  const childSpaces = " ".repeat(indent + 2);
  const entries = Object.entries(value).filter(([, item]) =>
    hasConcreteValue(item),
  );

  if (entries.length === 0) return "{}";

  const rendered = entries.map(
    ([key, item]) => `${childSpaces}${key} = ${renderValue(item, indent + 2)}`,
  );

  return `{\n${rendered.join("\n")}\n${spaces}}`;
}

function renderArray(value: unknown[], indent: number): string {
  if (value.length === 0) return "[]";

  const renderedItems = value.map((item) => renderValue(item, indent + 2));
  if (renderedItems.every((item) => !item.includes("\n"))) {
    return `[${renderedItems.join(", ")}]`;
  }

  const spaces = " ".repeat(indent);
  const childSpaces = " ".repeat(indent + 2);
  return `[\n${renderedItems
    .map((item) => `${childSpaces}${item}`)
    .join(",\n")}\n${spaces}]`;
}

function renderValue(value: unknown, indent: number): string {
  if (isTfExpression(value)) return value.value;
  if (typeof value === "string") return quoteString(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) return renderArray(value, indent);
  if (typeof value === "object" && value !== null) {
    return renderObject(value as Record<string, unknown>, indent);
  }
  return "null";
}

function renderModuleBlock(
  instance: ModuleInstance,
  provider: string,
  allInstances: ModuleInstance[],
): string {
  const { inputs, dependsOn, missingRequiredInputs } = buildInputs(
    instance,
    provider,
    allInstances,
  );
  const lines = [`module "${instance.moduleName}" {`, `  source = "./${instance.sourceDir}"`];

  if (missingRequiredInputs.length > 0) {
    lines.push(
      "",
      `  # Missing required inputs: ${missingRequiredInputs.join(", ")}`,
    );
  }

  for (const [key, value] of Object.entries(inputs)) {
    lines.push(`  ${key} = ${renderValue(value, 2)}`);
  }

  if (dependsOn.length > 0) {
    lines.push(
      `  depends_on = ${renderArray(dependsOn, 2)}`,
    );
  }

  lines.push("}");
  return lines.join("\n");
}

export function composeRootMainTf(
  boardResource: ResourceGraph,
  provider: string,
): string {
  const instances: ModuleInstance[] = [];
  const byResource = new Map<Resource, ModuleInstance>();
  const seenNames = new Map<string, number>();

  for (const resource of Object.values(boardResource)) {
    collectResources(resource, instances, byResource, seenNames);
  }

  return `${instances
    .map((instance) => renderModuleBlock(instance, provider, instances))
    .join("\n\n")}\n`;
}
