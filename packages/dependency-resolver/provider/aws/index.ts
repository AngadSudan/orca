import ec2 from "./compute/ec2.json";
import internet_gateway from "./network/internet_gateway.json";
import private_subnet from "./network/private_subnet.json";
import route_table from "./network/route_table.json";
import route_table_association from "./network/route_table_association.json";
import security_groups from "./network/security_groups.json";
import subnet from "./network/subnet.json";
import dynamo_db from "./storage/dynamo_db.json";

const awsResourceGraph = {
  ec2,
  internet_gateway,
  private_subnet,
  route_table,
  route_table_association,
  security_groups,
  subnet,
};

export default awsResourceGraph;
