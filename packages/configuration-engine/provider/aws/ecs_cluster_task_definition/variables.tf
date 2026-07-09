variable "region" {
  type = string
}

variable "family" {
  type = string
}

variable "container_definitions" {
  type = string
}

variable "cpu" {
  type    = string
  default = null
}

variable "memory" {
  type    = string
  default = null
}

variable "network_mode" {
  type    = string
  default = "awsvpc"
}

variable "requires_compatibilities" {
  type    = list(string)
  default = ["FARGATE"]
}

variable "execution_role_arn" {
  type    = string
  default = null
}

variable "task_role_arn" {
  type    = string
  default = null
}

variable "runtime_platform" {
  type = object({
    operating_system_family = optional(string, "LINUX")
    cpu_architecture        = optional(string, "X86_64")
  })
  default = null
}

variable "tags" {
  type    = map(string)
  default = {}
}
