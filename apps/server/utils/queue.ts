import connectMQ from "@orca/queue";
export default connectMQ(
  process.env.MQ_CLIENT || "amqp://admin:secure_password@localhost:5672",
);
