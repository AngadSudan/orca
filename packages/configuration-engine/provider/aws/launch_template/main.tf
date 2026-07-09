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

resource "aws_launch_template" "this" {
  name                   = var.name
  name_prefix            = var.name_prefix
  description            = var.description
  image_id               = var.image_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  user_data              = var.user_data
  vpc_security_group_ids = var.security_group_ids

  dynamic "iam_instance_profile" {
    for_each = var.iam_instance_profile == null ? [] : [var.iam_instance_profile]

    content {
      arn  = iam_instance_profile.value.arn
      name = iam_instance_profile.value.name
    }
  }

  dynamic "block_device_mappings" {
    for_each = var.block_device_mappings

    content {
      device_name = block_device_mappings.value.device_name

      ebs {
        volume_size           = block_device_mappings.value.volume_size
        volume_type           = block_device_mappings.value.volume_type
        delete_on_termination = block_device_mappings.value.delete_on_termination
        encrypted             = block_device_mappings.value.encrypted
      }
    }
  }

  tags = var.tags
}
