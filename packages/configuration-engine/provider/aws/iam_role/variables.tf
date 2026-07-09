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

variable "assume_role_policy" {
  type = string
}

variable "description" {
  type    = string
  default = null
}

variable "force_detach_policies" {
  type    = bool
  default = false
}

variable "max_session_duration" {
  type    = number
  default = 3600
}

variable "path" {
  type    = string
  default = "/"
}

variable "permissions_boundary" {
  type    = string
  default = null
}

variable "tags" {
  type    = map(string)
  default = {}
}
