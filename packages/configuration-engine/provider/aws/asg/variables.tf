variable "region" {
  type = string
}

variable "name" {
  type    = string
  default = null
}

variable "name_prefix" {
  type    = string
  default = null
}

variable "min_size" {
  type = number
}

variable "max_size" {
  type = number
}

variable "desired_capacity" {
  type    = number
  default = null
}

variable "subnet_ids" {
  type = list(string)
}

variable "target_group_arns" {
  type    = list(string)
  default = []
}

variable "health_check_type" {
  type    = string
  default = "EC2"
}

variable "health_check_grace_period" {
  type    = number
  default = 300
}

variable "default_cooldown" {
  type    = number
  default = 300
}

variable "force_delete" {
  type    = bool
  default = false
}

variable "termination_policies" {
  type    = list(string)
  default = []
}

variable "launch_template_id" {
  type    = string
  default = null
}

variable "launch_template_name" {
  type    = string
  default = null
}

variable "launch_template_version" {
  type    = string
  default = "$Latest"
}

variable "tags" {
  type    = map(string)
  default = {}
}
