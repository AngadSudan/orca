import exportTf from "..";
import type { ResourceGraph } from "../type";

const config: ResourceGraph = {
  vpc: {
    name: "aws_vpc",
    resource: "aws_vpc",
    variables: {
      cidr_block: "10.10.10.10/16",
    },
    dependencies: [],
    output: ["aws_vpc.id"],
    terraform: {
      "aws_vpc/main.tf": `resource "aws_vpc" "aws_vpc" {
      cidr_block = "var.cidr_block"
    }`,
      "aws_vpc/outputs.tf": `output "id" {
        value = aws_vpc.aws_vpc.id
      }`,
      "aws_vpc/variables.tf": `variable "cidr_block" {
        type = string
      }`,
    },
    contains: [
      {
        name: "aws_igw",
        resource: "aws_internet_gateway",
        output: ["aws_igw.id"],
        variables: {},
        dependencies: [],
        terraform: {
          "aws_igw/main.tf": `
          resource "aws_internet_gateway" "aws_igw" {
            vpc_id = var.aws_vpc.id
            tags = {
              Name = "my-internet-gateway"
            }
          }
        `,
          "aws_igw/outputs.tf": `output "id" {
              value = aws_internet_gateway.aws_igw.id
            }`,
          "aws_igw/variables.tf": `variable "aws_vpc" {
            type = any
          }`,
        },
        contains: [],
      },
      {
        name: "aws_route_table",
        resource: "aws_vpc_route_table",
        output: ["aws_vpc_route_table.id"],
        variables: { cidr_block: "0.0.0.0/0" },
        dependencies: [],
        terraform: {
          "aws_route_table/main.tf": `
        resource "aws_route_table" "aws_vpc_route_table" {
          vpc_id = var.aws_vpc.id
          route {
            cidr_block = "var.cidr_block"
            gateway_id = var.aws_igw.id
          }
          tags= {
            Name = "vpc-routing-table"
          }
        }
        `,
          "aws_route_table/outputs.tf": `output "id" {
            value = aws_route_table.aws_vpc_route_table.id
          }`,
          "aws_route_table/variables.tf": `variable "aws_vpc" {
            type = any
          }

          variable "cidr_block" {
            type = string
          }`,
        },
        contains: [],
      },
      {
        name: "aws_route_table_association",
        resource: "aws_route_table_association",
        output: [],
        variables: { cidr_block: "0.0.0.0/0" },
        dependencies: [],
        terraform: {
          "aws_route_table_association/main.tf": `
           resource "aws_route_table_association" "connecting_route_table" {
            route_table_id = var.aws_vpc_route_table.id
            subnet_id =  var.aws_public_subnet.id
          }
        `,
          "aws_route_table_association/outputs.tf": "",
          "aws_route_table_association/variables.tf": `variable "aws_vpc_route_table" {
            type = any
          }

          variable "aws_public_subnet" {
            type = any
          }`,
        },
        contains: [],
      },
      {
        name: "aws_public_subnet",
        resource: "aws_subnet",
        output: ["aws_public_subnet.id"],
        variables: {
          cidr_block: "10.10.11.10/24",
        },
        dependencies: [],
        terraform: {
          "aws_public_subnet/main.tf": `
          resource "aws_subnet" "aws_public_subnet" {
            cidr_block = var.cidr_block
            vpc_id = var.aws_vpc.id
            tags = {
              Name = "public_subnet"
            }
          }
        `,
          "aws_public_subnet/outputs.tf": `output "id" {
            value = aws_subnet.aws_public_subnet.id
          }`,
          "aws_public_subnet/variables.tf": `variable "cidr_block" {
                type = string
              }

              variable "aws_vpc" {
                type = any
              }`,
        },
        contains: [
          {
            name: "aws_ec2",
            resource: "ec2",
            output: [],
            variables: { region: "us-east-1", instance_type: "t2.micro" },
            dependencies: [],
            contains: [],
            terraform: {},
          },
        ],
      },
      {
        name: "aws_private_subnet",
        resource: "aws_subnet",
        output: ["aws_private_subnet.id"],
        variables: {
          cidr_block: "10.10.12.10/24",
        },
        dependencies: [],
        terraform: {
          "aws_private_subnet/main.tf": `
          resource "aws_subnet" "aws_private_subnet" {
            cidr_block = var.cidr_block
            vpc_id = var.aws_vpc.id
            tags = {
              Name = "private_subnet"
            }
          }
        `,
          "aws_private_subnet/outputs.tf": `output "id" {
            value = aws_subnet.aws_private_subnet.id
          }`,
          "aws_private_subnet/variables.tf": `variable "cidr_block" {
                  type = string
                }

                variable "aws_vpc" {
                  type = any
                }`,
        },
        contains: [],
      },
    ],
  },
};

exportTf(config, "aws");
