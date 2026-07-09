variable "region" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "name" {
  type    = string
  default = null
}

variable "target_group_name" {
  type    = string
  default = null
}

variable "port" {
  type    = number
  default = null
}

variable "target_port" {
  type    = number
  default = 80
}

variable "protocol" {
  type    = string
  default = null
}

variable "target_protocol" {
  type    = string
  default = "HTTP"
}

variable "protocol_version" {
  type    = string
  default = "HTTP1"
}

variable "target_type" {
  type    = string
  default = "instance"
}

variable "deregistration_delay" {
  type    = number
  default = 300
}

variable "slow_start" {
  type    = number
  default = 0
}

variable "load_balancing_algorithm_type" {
  type    = string
  default = "round_robin"
}

variable "health_check_enabled" {
  type    = bool
  default = true
}

variable "health_check_path" {
  type    = string
  default = "/"
}

variable "health_check_port" {
  type    = string
  default = "traffic-port"
}

variable "health_check_protocol" {
  type    = string
  default = null
}

variable "health_check_matcher" {
  type    = string
  default = "200"
}

variable "health_check_interval" {
  type    = number
  default = 30
}

variable "health_check_timeout" {
  type    = number
  default = 5
}

variable "health_check_healthy_threshold" {
  type    = number
  default = 3
}

variable "health_check_unhealthy_threshold" {
  type    = number
  default = 3
}

variable "tags" {
  type    = map(string)
  default = {}
}
