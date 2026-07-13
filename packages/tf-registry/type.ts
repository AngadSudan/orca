export interface Resource {
  name: string;
  resource: string;
  variables: Record<string, string | string[] | null | number | Object>;
  output: string | string[];
  dependencies: Resource[];
  contains: Resource[];
  terraform: Record<string, string>;
}
export type ResourceGraph = Record<string, Resource>;
