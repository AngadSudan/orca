variable "region" {
  type = string
}

variable "name" {
  type = string
}

variable "settings" {
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
