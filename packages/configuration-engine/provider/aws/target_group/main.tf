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

resource "aws_lb_target_group" "this" {
  name                          = coalesce(var.name, var.target_group_name)
  port                          = coalesce(var.port, var.target_port)
  protocol                      = coalesce(var.protocol, var.target_protocol)
  protocol_version              = var.protocol_version
  vpc_id                        = var.vpc_id
  target_type                   = var.target_type
  deregistration_delay          = var.deregistration_delay
  slow_start                    = var.slow_start
  load_balancing_algorithm_type = var.load_balancing_algorithm_type

  health_check {
    enabled             = var.health_check_enabled
    path                = var.health_check_path
    port                = var.health_check_port
    protocol            = coalesce(var.health_check_protocol, var.protocol, var.target_protocol)
    matcher             = var.health_check_matcher
    interval            = var.health_check_interval
    timeout             = var.health_check_timeout
    healthy_threshold   = var.health_check_healthy_threshold
    unhealthy_threshold = var.health_check_unhealthy_threshold
  }

  tags = var.tags
}
