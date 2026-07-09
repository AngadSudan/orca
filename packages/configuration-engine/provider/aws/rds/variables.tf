variable "region" {
  type = string
}

variable "identifier" {
  type = string
}

variable "allocated_storage" {
  type = number
}

variable "max_allocated_storage" {
  type    = number
  default = null
}

variable "storage_type" {
  type    = string
  default = "gp3"
}

variable "engine" {
  type = string
}

variable "engine_version" {
  type    = string
  default = null
}

variable "instance_class" {
  type = string
}

variable "db_name" {
  type    = string
  default = null
}

variable "username" {
  type = string
}

variable "password" {
  type      = string
  sensitive = true
}

variable "port" {
  type    = number
  default = null
}

variable "publicly_accessible" {
  type    = bool
  default = false
}

variable "multi_az" {
  type    = bool
  default = false
}

variable "security_group_ids" {
  type    = list(string)
  default = []
}

variable "db_subnet_group_name" {
  type    = string
  default = null
}

variable "backup_retention_period" {
  type    = number
  default = 0
}

variable "backup_window" {
  type    = string
  default = null
}

variable "maintenance_window" {
  type    = string
  default = null
}

variable "skip_final_snapshot" {
  type    = bool
  default = true
}

variable "final_snapshot_identifier" {
  type    = string
  default = null
}

variable "deletion_protection" {
  type    = bool
  default = false
}

variable "storage_encrypted" {
  type    = bool
  default = false
}

variable "auto_minor_version_upgrade" {
  type    = bool
  default = true
}

variable "tags" {
  type    = map(string)
  default = {}
}
