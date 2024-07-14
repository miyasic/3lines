variable "environment" {
  description = "Environment name"
  type        = string
}

variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "credentials_path" {
  description = "Path to the service account key file"
  type        = string
}