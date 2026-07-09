variable "region" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "ami" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "security_group_ids" {
  type = list(string)
}

variable "associate_public_ip_address" {
  type    = bool
  default = false
}

variable "key_name" {
  type    = string
  default = null
}

variable "iam_instance_profile" {
  type    = string
  default = null
}

variable "user_data" {
  type    = string
  default = null
}

variable "root_volume_size" {
  type    = number
  default = null
}

variable "disk_size" {
  type    = number
  default = 8
}

variable "root_volume_type" {
  type    = string
  default = "gp3"
}

variable "root_delete_on_termination" {
  type    = bool
  default = true
}

variable "root_encrypted" {
  type    = bool
  default = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
