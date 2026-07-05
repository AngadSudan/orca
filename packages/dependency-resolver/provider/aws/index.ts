import app_elb from "./compute/app_elb.json";
import ec2 from "./compute/ec2.json";
import lambda from "./compute/lambda.json";
import launch_template from "./compute/launch_template.json";
import iam_role from "./identity/iam_role.json";
import internet_gateway from "./network/internet_gateway.json";
import private_subnet from "./network/private_subnet.json";
import route_table from "./network/route_table.json";
import route_table_association from "./network/route_table_association.json";
import security_groups from "./network/security_groups.json";
import subnet from "./network/subnet.json";
import kinesis from "./services/kinesis.json";
import sqs from "./services/sqs.json";
import dynamo_db from "./storage/dynamo_db.json";
import rds from "./storage/rds.json";
import s3 from "./storage/s3.json";

const awsResourceGraph = {
  app_elb,
  dynamo_db,
  ec2,
  iam_role,
  internet_gateway,
  kinesis,
  lambda,
  launch_template,
  private_subnet,
  rds,
  route_table,
  route_table_association,
  s3,
  security_groups,
  sqs,
  subnet,
};

export default awsResourceGraph;
