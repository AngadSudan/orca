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

variable "description" {
  type    = string
  default = null
}

variable "image_id" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "key_name" {
  type    = string
  default = null
}

variable "user_data" {
  type    = string
  default = null
}

variable "security_group_ids" {
  type    = list(string)
  default = []
}

variable "iam_instance_profile" {
  type = object({
    arn  = optional(string)
    name = optional(string)
  })
  default = null
}

variable "block_device_mappings" {
  type = list(object({
    device_name           = string
    volume_size           = optional(number, 8)
    volume_type           = optional(string, "gp3")
    delete_on_termination = optional(bool, true)
    encrypted             = optional(bool, false)
  }))
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
