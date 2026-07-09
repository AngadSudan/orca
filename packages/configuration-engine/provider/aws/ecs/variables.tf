variable "region" {
  type = string
}

variable "name" {
  type = string
}

variable "cluster" {
  type = string
}

variable "task_definition" {
  type = string
}

variable "desired_count" {
  type    = number
  default = 1
}

variable "launch_type" {
  type    = string
  default = "FARGATE"
}

variable "network_configuration" {
  type = object({
    subnets          = list(string)
    security_groups  = optional(list(string), [])
    assign_public_ip = optional(bool, false)
  })
  default = null
}

variable "load_balancers" {
  type = list(object({
    target_group_arn = string
    container_name   = string
    container_port   = number
  }))
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
