export type BindingWrap = "scalar" | "list";

export interface ModuleBinding {
  input: string;
  output: string;
  wrap?: BindingWrap;
  dependsOnly?: boolean;
}

type ProviderBindings = Record<string, Record<string, ModuleBinding>>;

const awsBindings: ProviderBindings = {
  app_elb: {
    security_groups: { input: "security_group_ids", output: "id", wrap: "list" },
  },
  asg: {
    launch_template: { input: "launch_template_id", output: "id" },
    target_group: { input: "target_group_arns", output: "arn", wrap: "list" },
  },
  ec2: {
    security_groups: { input: "security_group_ids", output: "id", wrap: "list" },
    key_pair: { input: "key_name", output: "key_name" },
  },
  ecs: {
    ecs_cluster: { input: "cluster", output: "id" },
    ecs_cluster_task_definition: { input: "task_definition", output: "arn" },
    iam_role_policy_attachment: {
      input: "",
      output: "id",
      dependsOnly: true,
    },
  },
  iam_role: {
    security_groups: { input: "", output: "id", dependsOnly: true },
  },
  iam_role_policy_attachment: {
    iam_role: { input: "role", output: "name" },
  },
  lambda: {
    iam_role: { input: "role_arn", output: "arn" },
    security_groups: { input: "", output: "id", dependsOnly: true },
  },
  launch_template: {
    security_groups: { input: "security_group_ids", output: "id", wrap: "list" },
    key_pair: { input: "key_name", output: "key_name" },
  },
  rds: {
    security_groups: { input: "security_group_ids", output: "id", wrap: "list" },
  },
  target_group_attachment: {
    target_group: { input: "target_group_arn", output: "arn" },
    ec2: { input: "target_id", output: "id" },
  },
  target_group_listener: {
    app_elb: { input: "load_balancer_arn", output: "arn" },
    target_group: { input: "target_group_arn", output: "arn" },
  },
};

const bindingsByProvider: Record<string, ProviderBindings> = {
  aws: awsBindings,
};

export function getModuleBinding(
  provider: string,
  consumerResource: string,
  dependencyResource: string,
): ModuleBinding | null {
  return (
    bindingsByProvider[provider]?.[consumerResource]?.[dependencyResource] ??
    null
  );
}
