provider "google" {
  project = "lines-31c04"
}

terraform {
  backend "gcs" {
    bucket = "remote-backend-for-terraform"
    prefix = "terraform/state/prod"
  }
}

resource "google_project_service" "firebase" {
  project = "lines-31c04"
  service = "firebase.googleapis.com"
}
