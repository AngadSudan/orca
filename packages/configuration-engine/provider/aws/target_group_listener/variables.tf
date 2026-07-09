variable "region" {
  type = string
}

variable "load_balancer_arn" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "port" {
  type    = number
  default = 80
}

variable "protocol" {
  type    = string
  default = "HTTP"
}

variable "certificate_arn" {
  type    = string
  default = null
}

variable "ssl_policy" {
  type    = string
  default = null
}

variable "default_action_type" {
  type    = string
  default = "forward"
}

variable "tags" {
  type    = map(string)
  default = {}
}
