variable "region" {
  type = string
}

variable "name" {
  type    = string
  default = null
}

variable "alb_name" {
  type    = string
  default = null
}

variable "internal" {
  type    = bool
  default = false
}

variable "security_group_ids" {
  type = list(string)
}

variable "subnet_ids" {
  type = list(string)
}

variable "enable_deletion_protection" {
  type    = bool
  default = false
}

variable "idle_timeout" {
  type    = number
  default = 60
}

variable "ip_address_type" {
  type    = string
  default = "ipv4"
}

variable "enable_http2" {
  type    = bool
  default = true
}

variable "enable_cross_zone_load_balancing" {
  type    = bool
  default = true
}

variable "drop_invalid_header_fields" {
  type    = bool
  default = false
}

variable "preserve_host_header" {
  type    = bool
  default = false
}

variable "access_logs" {
  type = object({
    bucket  = string
    prefix  = optional(string)
    enabled = optional(bool, true)
  })
  default = null
}

variable "tags" {
  type    = map(string)
  default = {}
}
