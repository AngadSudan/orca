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

resource "aws_key_pair" "this" {
  key_name        = var.key_name
  key_name_prefix = var.key_name_prefix
  public_key      = var.public_key

  tags = var.tags
}
