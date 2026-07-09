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

resource "aws_iam_role_policy_attachment" "this" {
  role       = var.role
  policy_arn = var.policy_arn
}
