variable "region" {
  type = string
}

variable "key_name" {
  type    = string
  default = null
}

variable "key_name_prefix" {
  type    = string
  default = null
}

variable "public_key" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}
