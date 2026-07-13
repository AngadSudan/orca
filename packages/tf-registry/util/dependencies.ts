import type { Resource, ResourceGraph } from "../type";

const globalOutput = new Map<string, string>();

function resolveDependencies(
  boardResource: ResourceGraph,
  provider: string,
): ResourceGraph {
  globalOutput.clear();

  for (const node of Object.values(boardResource)) {
  }

  return boardResource;
}

export default resolveDependencies;
