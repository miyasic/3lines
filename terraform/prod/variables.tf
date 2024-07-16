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

variable "backend_bucket" {
  description = "GCS bucket for remote backend"
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

variable "github_client_id" {
  description = "GitHub OAuth クライアントID"
  type        = string
}

variable "github_client_secret" {
  description = "GitHub OAuth クライアントシークレット"
  type        = string
  sensitive   = true
}