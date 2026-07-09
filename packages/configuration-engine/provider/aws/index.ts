import { generateAppElbModule } from "./app_elb/index";
import { generateAsgModule } from "./asg/index";
import { generateDynamoDbModule } from "./dynamo_db/index";
import { generateEC2Module } from "./ec2/index";
import { generateECSModule } from "./ecs/index";
import { generateECSClusterModule } from "./ecs_cluster/index";
import { generateECSClusterTaskDefinitionModule } from "./ecs_cluster_task_definition/index";
import { generateIAMRoleModule } from "./iam_role/index";
import { generateIAMRolePolicyAttachmentModule } from "./iam_role_policy_attachment/index";
import { generateIndexModule } from "./index/index";
import { generateKeyPairModule } from "./key_pair/index";
import { generateKinesisModule } from "./kinesis/index";
import { generateLambdaModule } from "./lambda/index";
import { generateLaunchTemplateModule } from "./launch_template/index";
import { generateRDSModule } from "./rds/index";
import { generateS3Module } from "./s3/index";
import { generateSecurityGroupsModule } from "./security_groups/index";
import { generateSQSModule } from "./sqs/index";
import { generateTargetGroupModule } from "./target_group/index";
import { generateTargetGroupAttachmentModule } from "./target_group_attachment/index";
import { generateTargetGroupListenerModule } from "./target_group_listener/index";

export const resources = {
  app_elb: generateAppElbModule,
  asg: generateAsgModule,
  dynamo_db: generateDynamoDbModule,
  ec2: generateEC2Module,
  ecs: generateECSModule,
  ecs_cluster: generateECSClusterModule,
  ecs_cluster_task_definition: generateECSClusterTaskDefinitionModule,
  iam_role: generateIAMRoleModule,
  iam_role_policy_attachment: generateIAMRolePolicyAttachmentModule,
  index: generateIndexModule,
  key_pair: generateKeyPairModule,
  kinesis: generateKinesisModule,
  lambda: generateLambdaModule,
  launch_template: generateLaunchTemplateModule,
  rds: generateRDSModule,
  s3: generateS3Module,
  security_groups: generateSecurityGroupsModule,
  sqs: generateSQSModule,
  target_group: generateTargetGroupModule,
  target_group_attachment: generateTargetGroupAttachmentModule,
  target_group_listener: generateTargetGroupListenerModule,
} as const;

export type AwsResourceType = keyof typeof resources;
