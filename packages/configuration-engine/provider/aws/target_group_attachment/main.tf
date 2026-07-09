terraform {
  required_version = ">=1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>6.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_lb_target_group_attachment" "this" {
  target_group_arn  = var.target_group_arn
  target_id         = coalesce(var.target_id, try(var.target_ids[0], null))
  port              = coalesce(var.port, var.target_port)
  availability_zone = var.availability_zone
}
