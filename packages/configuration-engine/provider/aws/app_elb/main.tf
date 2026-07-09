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

resource "aws_lb" "this" {
  name                             = coalesce(var.name, var.alb_name)
  internal                         = var.internal
  load_balancer_type               = "application"
  security_groups                  = var.security_group_ids
  subnets                          = var.subnet_ids
  enable_deletion_protection       = var.enable_deletion_protection
  idle_timeout                     = var.idle_timeout
  ip_address_type                  = var.ip_address_type
  enable_http2                     = var.enable_http2
  enable_cross_zone_load_balancing = var.enable_cross_zone_load_balancing
  drop_invalid_header_fields       = var.drop_invalid_header_fields
  preserve_host_header             = var.preserve_host_header

  dynamic "access_logs" {
    for_each = var.access_logs == null ? [] : [var.access_logs]

    content {
      bucket  = access_logs.value.bucket
      prefix  = access_logs.value.prefix
      enabled = access_logs.value.enabled
    }
  }

  tags = var.tags
}
