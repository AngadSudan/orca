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

variable "delay_seconds" {
  type    = number
  default = 0
}

variable "max_message_size" {
  type    = number
  default = 262144
}

variable "message_retention_seconds" {
  type    = number
  default = 345600
}

variable "receive_wait_time_seconds" {
  type    = number
  default = 0
}

variable "visibility_timeout_seconds" {
  type    = number
  default = 30
}

variable "fifo_queue" {
  type    = bool
  default = false
}

variable "content_based_deduplication" {
  type    = bool
  default = false
}

variable "kms_master_key_id" {
  type    = string
  default = null
}

variable "kms_data_key_reuse_period_seconds" {
  type    = number
  default = 300
}

variable "tags" {
  type    = map(string)
  default = {}
}
