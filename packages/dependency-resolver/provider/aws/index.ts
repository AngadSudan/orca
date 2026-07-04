import ec2 from "./ec2.json";
import internet_gateway from "./internet_gateway.json";
import route_table_association from "./route_table_association.json";
import route_table from "./route_table.json";
import security_groups from "./security_groups.json";
import subnet from "./subnet.json";
import vpc from "./vpc.json";
const awsResourceGraph = {
  ec2,
  internet_gateway,
  route_table,
  route_table_association,
  security_groups,
  subnet,
  vpc,
};

export default awsResourceGraph;
