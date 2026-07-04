import providerMapping, { type Providers, type Resources } from "./provider";

export function getDependencyMappings(
  provider: Providers,
  resource: Resources,
) {
  return providerMapping[provider][resource];
}

export function getCreationOrder(
  provider: Providers,
  resource: Resources,
): Resources[] {
  // Build graph: resource -> dependencies
  const graph: Partial<Record<Resources, Resources[]>> = {};
  const discovered = new Set<Resources>([resource]);
  const queue: Resources[] = [resource];

  while (queue.length) {
    const curr = queue.shift()!;
    const { requires } = getDependencyMappings(provider, curr);

    graph[curr] = requires as Resources[];

    for (const dep of requires as Resources[]) {
      if (!discovered.has(dep)) {
        discovered.add(dep);
        queue.push(dep);
      }
    }
  }
  console.log(graph);
  const visited = new Set<Resources>();
  const visiting = new Set<Resources>();
  const resourceOrder: Resources[] = [];

  function dfs(node: Resources) {
    if (visited.has(node)) return;

    if (visiting.has(node)) {
      throw new Error(`Circular dependency detected involving "${node}"`);
    }

    visiting.add(node);

    for (const dep of graph[node] ?? []) {
      dfs(dep);
    }

    visiting.delete(node);
    visited.add(node);
    resourceOrder.push(node);
  }

  dfs(resource);

  return resourceOrder;
}
