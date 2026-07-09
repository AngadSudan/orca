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

resource "aws_ecs_cluster" "this" {
  name = var.name

  dynamic "setting" {
    for_each = var.settings

    content {
      name  = setting.value.name
      value = setting.value.value
    }
  }

  tags = var.tags
}
