variable "region" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "target_id" {
  type    = string
  default = null
}

variable "target_ids" {
  type    = list(string)
  default = []
}

variable "port" {
  type    = number
  default = null
}

variable "target_port" {
  type    = number
  default = 80
}

variable "availability_zone" {
  type    = string
  default = null
}
