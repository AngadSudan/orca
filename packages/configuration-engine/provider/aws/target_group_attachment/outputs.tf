output "id" {
  value = aws_lb_target_group_attachment.this.id
}

output "target_group_attachment_id" {
  value = aws_lb_target_group_attachment.this.id
}

output "target_group_attachment_ids" {
  value = [aws_lb_target_group_attachment.this.id]
}
