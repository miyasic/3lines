provider "google" {
  project = "lines-31c04-dev"
}

terraform {
  backend "gcs" {
    bucket = "remote-backend-for-terraform-dev"
    prefix = "terraform/state/dev"
  }
}

resource "google_project_service" "firebase" {
  project = "lines-31c04-dev"
  service = "firebase.googleapis.com"
}
