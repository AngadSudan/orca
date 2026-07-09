variable "region" {
  type = string
}

variable "bucket" {
  type    = string
  default = null
}

variable "bucket_prefix" {
  type    = string
  default = null
}

variable "force_destroy" {
  type    = bool
  default = false
}

variable "object_lock_enabled" {
  type    = bool
  default = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
