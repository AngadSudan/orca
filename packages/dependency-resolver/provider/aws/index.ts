import app_elb from "./compute/app_elb.json";
import asg from "./compute/asg.json";
import ec2 from "./compute/ec2.json";
import ecs from "./compute/ecs.json";
import ecs_cluster from "./compute/ecs_cluster.json";
import ecs_cluster_task_definition from "./compute/ecs_cluster_task_definition.json";
import lambda from "./compute/lambda.json";
import launch_template from "./compute/launch_template.json";
import target_group from "./compute/target_group.json";
import target_group_attachment from "./compute/target_group_attachment.json";
import target_group_listener from "./compute/target_group_listener.json";
import iam_role from "./identity/iam_role.json";
import iam_role_policy_attachment from "./identity/iam_role_policy_attachment.json";
import key_pair from "./identity/key_pair.json";
import security_groups from "./network/security_groups.json";
import services from "./services";
import dynamo_db from "./storage/dynamo_db.json";
import rds from "./storage/rds.json";
import s3 from "./storage/s3.json";

const awsResourceGraph = {
  app_elb,
  asg,
  dynamo_db,
  ec2,
  ecs,
  ecs_cluster,
  ecs_cluster_task_definition,
  iam_role,
  iam_role_policy_attachment,
  key_pair,
  lambda,
  launch_template,
  rds,
  s3,
  security_groups,
  target_group,
  target_group_attachment,
  target_group_listener,
  ...services,
};

export default awsResourceGraph;
