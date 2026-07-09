variable "region" {
  type = string
}

variable "function_name" {
  type = string
}

variable "role_arn" {
  type = string
}

variable "handler" {
  type    = string
  default = null
}

variable "runtime" {
  type    = string
  default = null
}

variable "filename" {
  type    = string
  default = null
}

variable "s3_bucket" {
  type    = string
  default = null
}

variable "s3_key" {
  type    = string
  default = null
}

variable "s3_object_version" {
  type    = string
  default = null
}

variable "image_uri" {
  type    = string
  default = null
}

variable "package_type" {
  type    = string
  default = "Zip"
}

variable "source_code_hash" {
  type    = string
  default = null
}

variable "memory_size" {
  type    = number
  default = 128
}

variable "timeout" {
  type    = number
  default = 3
}

variable "publish" {
  type    = bool
  default = false
}

variable "environment_variables" {
  type    = map(string)
  default = {}
}

variable "tags" {
  type    = map(string)
  default = {}
}
