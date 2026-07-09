variable "region" {
  type = string
}

variable "name" {
  type = string
}

variable "shard_count" {
  type    = number
  default = null
}

variable "retention_period" {
  type    = number
  default = 24
}

variable "stream_mode" {
  type    = string
  default = "ON_DEMAND"
}

variable "tags" {
  type    = map(string)
  default = {}
}
