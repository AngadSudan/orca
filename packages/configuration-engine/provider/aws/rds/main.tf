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

resource "aws_db_instance" "this" {
  identifier                 = var.identifier
  allocated_storage          = var.allocated_storage
  max_allocated_storage      = var.max_allocated_storage
  storage_type               = var.storage_type
  engine                     = var.engine
  engine_version             = var.engine_version
  instance_class             = var.instance_class
  db_name                    = var.db_name
  username                   = var.username
  password                   = var.password
  port                       = var.port
  publicly_accessible        = var.publicly_accessible
  multi_az                   = var.multi_az
  vpc_security_group_ids     = var.security_group_ids
  db_subnet_group_name       = var.db_subnet_group_name
  backup_retention_period    = var.backup_retention_period
  backup_window              = var.backup_window
  maintenance_window         = var.maintenance_window
  skip_final_snapshot        = var.skip_final_snapshot
  final_snapshot_identifier  = var.final_snapshot_identifier
  deletion_protection        = var.deletion_protection
  storage_encrypted          = var.storage_encrypted
  auto_minor_version_upgrade = var.auto_minor_version_upgrade

  tags = var.tags
}
