import providerMapping, { type Providers, type Resources } from "./provider";

export function getDependencyMappings(
  provider: Providers,
  resource: Resources,
) {
  return providerMapping[provider][resource];
}

export function getCreationOrder(provider: Providers, resource: Resources) {
  const graph: Partial<Record<Resources, Resources[]>> = {};
  const visited = new Set<Resources>([resource]);
  const queue = [resource];

  while (queue.length) {
    const curr = queue.shift()!;
    const { requires } = getDependencyMappings(provider, curr);

    graph[curr] = requires as Resources[];

    for (const dep of requires as Resources[]) {
      if (!visited.has(dep)) {
        visited.add(dep);
        queue.push(dep);
      }
    }
  }

  const indegree: Partial<Record<Resources, number>> = {};
  console.log(graph);
}
