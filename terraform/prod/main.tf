provider "google" {
  credentials = file("terraformServiceKey.json")
  project = "lines-31c04"
  user_project_override = true
}

terraform {
  backend "gcs" {
    bucket = "remote-backend-for-terraform"
    prefix = "terraform/state/prod"
  }
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "5.37.0"
    }
  }
}

resource "google_project_service" "firebase" {
  project = "lines-31c04"
  service = "firebase.googleapis.com"
}


# Configures the provider to use the resource block's specified project for quota checks.
provider "google-beta" {
  user_project_override = true
}

# Configures the provider to not use the resource block's specified project for quota checks.
# This provider should only be used during project creation and initializing services.
provider "google-beta" {
  alias = "no_user_project_override"
  user_project_override = false
}

# Creates a new Google Cloud project.
resource "google_project" "default" {
  provider   = google-beta.no_user_project_override

  name       = "3Lines"
  project_id = "lines-31c04"
  # Required for any service that requires the Blaze pricing plan
  # (like Firebase Authentication with GCIP)
  billing_account = "019C4D-F3C2A9-54C90E"

  # Required for the project to display in any list of Firebase projects.
  labels = {
    "firebase" = "enabled"
  }
}

# Enables required APIs.
resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project  = google_project.default.project_id
  for_each = toset([
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    # Enabling the ServiceUsage API allows the new project to be quota checked from now on.
    "serviceusage.googleapis.com",
  ])
  service = each.key

  # Don't disable the service if the resource block is removed by accident.
  disable_on_destroy = false
}


# Enables Firebase services for the new project created above.
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id

  # Waits for the required APIs to be enabled.
  depends_on = [
    google_project_service.default
  ]
}

resource "google_project_service" "identitytoolkit" {
  provider = google
  project  = google_project.default.project_id
  service  = "identitytoolkit.googleapis.com"
}


resource "google_identity_platform_config" "default" {
  project = google_project.default.project_id
  autodelete_anonymous_users = true
  sign_in {
    anonymous {
        enabled = true
        }
    }
}


resource "google_firestore_database" "database" {
  project  = google_project.default.project_id
  name        = "(default)"
  location_id = "asia-northeast1"
  type        = "FIRESTORE_NATIVE"
}

resource "google_storage_bucket" "default" {
  provider                    = google-beta
  name                        = "lines-31c04"
  location                    = "US"
  uniform_bucket_level_access = true
  project  = google_project.default.project_id
}


resource "google_firebase_storage_bucket" "default" {
  provider  = google-beta
  project  = google_project.default.project_id
  bucket_id = google_storage_bucket.default.id
}

# Firebaseプロジェクトにウェブアプリを追加する
resource "google_firebase_web_app" "basic" {
  provider = google-beta
  project  = google_project.default.project_id
  display_name = "Front"
}

# Firebaseウェブアプリの設定を取得する
data "google_firebase_web_app_config" "basic" {
  provider = google-beta
  project  = google_project.default.project_id
  web_app_id = google_firebase_web_app.basic.app_id
}