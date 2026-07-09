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

resource "aws_lambda_function" "this" {
  function_name     = var.function_name
  role              = var.role_arn
  handler           = var.handler
  runtime           = var.runtime
  filename          = var.filename
  s3_bucket         = var.s3_bucket
  s3_key            = var.s3_key
  s3_object_version = var.s3_object_version
  image_uri         = var.image_uri
  package_type      = var.package_type
  source_code_hash  = var.source_code_hash
  memory_size       = var.memory_size
  timeout           = var.timeout
  publish           = var.publish

  dynamic "environment" {
    for_each = length(var.environment_variables) == 0 ? [] : [var.environment_variables]

    content {
      variables = environment.value
    }
  }

  tags = var.tags
}
